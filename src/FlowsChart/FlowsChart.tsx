import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useElementSize } from "@mantine/hooks";
import { ResponsiveContainer, Sankey, Tooltip } from "recharts";
import type {
  SankeyElementType,
  SankeyLinkProps,
  SankeyNodeProps,
  SankeyProps,
} from "recharts";
import { BodyText } from "../BodyText/BodyText";
import { Progress } from "../Progress/Progress";
import { Skeleton } from "../Skeleton/Skeleton";
import { budgetBoardTypography } from "../theme";
import { ensureBBUIMantineProvider, useBBUITheme } from "../shared/themeStyles";
import classes from "./FlowsChart.module.css";

export type FlowType = "income" | "expense" | "surplus" | "deficit";

export interface FlowsChartNode {
  name: string;
  color?: string;
  flowType?: FlowType;
  parentName?: string;
  transactionCount?: number;
}

export interface FlowsChartLink {
  source: number;
  target: number;
  value: number;
  transactionCount?: number;
  flowType?: FlowType;
}

export interface FlowsChartData {
  nodes: FlowsChartNode[];
  links: FlowsChartLink[];
  totalIncome: number;
  totalSpending: number;
}

export interface FlowsChartLabels {
  cashAvailable: string;
  amount: string;
  from: string;
  to: string;
  percentOfIncome: string;
  percentOfSpending: string;
  percentOfBranch: string;
  transactions: string;
  income: string;
  expense: string;
  surplus: string;
  deficit: string;
}

export interface FlowsChartProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  ariaLabel: string;
  data: FlowsChartData;
  emptyMessage?: ReactNode;
  formatValue: (value: number) => string;
  height?: number;
  isLoading?: boolean;
  labels: FlowsChartLabels;
  minScrollWidth?: number;
}

interface FlowsChartTooltipProps {
  active?: boolean;
  payload?: readonly unknown[];
  chartData: FlowsChartData;
  formatValue: (value: number) => string;
  labels: FlowsChartLabels;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function validateData(data: FlowsChartData) {
  if (
    !Number.isFinite(data.totalIncome) ||
    data.totalIncome < 0 ||
    !Number.isFinite(data.totalSpending) ||
    data.totalSpending < 0
  ) {
    throw new RangeError(
      "Flows chart totals must be finite, non-negative numbers.",
    );
  }

  data.nodes.forEach((node, index) => {
    if (typeof node.name !== "string" || node.name.trim().length === 0) {
      throw new RangeError(
        `Flows chart node at index ${index} must have a name.`,
      );
    }

    if (node.color !== undefined && node.color.trim().length === 0) {
      throw new RangeError(
        `Flows chart node at index ${index} must have a non-empty color.`,
      );
    }

    if (
      node.transactionCount !== undefined &&
      (!Number.isSafeInteger(node.transactionCount) ||
        node.transactionCount < 0)
    ) {
      throw new RangeError(
        `Flows chart node at index ${index} must have a non-negative integer transaction count.`,
      );
    }
  });

  data.links.forEach((link, index) => {
    if (
      !Number.isSafeInteger(link.source) ||
      link.source < 0 ||
      link.source >= data.nodes.length ||
      !Number.isSafeInteger(link.target) ||
      link.target < 0 ||
      link.target >= data.nodes.length ||
      link.source === link.target
    ) {
      throw new RangeError(
        `Flows chart link at index ${index} must connect two different nodes.`,
      );
    }

    if (!Number.isFinite(link.value) || link.value <= 0) {
      throw new RangeError(
        `Flows chart link at index ${index} must have a positive finite value.`,
      );
    }

    if (
      link.transactionCount !== undefined &&
      (!Number.isSafeInteger(link.transactionCount) ||
        link.transactionCount < 0)
    ) {
      throw new RangeError(
        `Flows chart link at index ${index} must have a non-negative integer transaction count.`,
      );
    }
  });
}

function getCategoryColor(name: string, colorScheme: "light" | "dark") {
  let hash = 2166136261;
  const normalizedName = name.trim().toLowerCase();

  for (let index = 0; index < normalizedName.length; index += 1) {
    hash = Math.imul(hash ^ normalizedName.charCodeAt(index), 16777619);
  }

  const hue = (hash >>> 0) % 360;
  const lightness = colorScheme === "light" ? 26 : 74;
  return `hsl(${hue} 72% ${lightness}%)`;
}

function getNodeColors(
  nodes: FlowsChartNode[],
  colorScheme: "light" | "dark",
  cashAvailableName: string,
) {
  return nodes.map((node) => {
    if (node.color) {
      return node.color;
    }

    if (node.name === cashAvailableName) {
      return "var(--bbui-flows-chart-neutral)";
    }

    return getCategoryColor(node.name, colorScheme);
  });
}

function formatPercent(value: number, total: number) {
  return total > 0 ? `${((value / total) * 100).toFixed(1)}%` : "0.0%";
}

function estimateTextWidth(text: string, fontSize: number) {
  return Array.from(text).reduce((width, character) => {
    const codePoint = character.codePointAt(0) ?? 0;
    const characterWidth =
      codePoint >= 0x2e80
        ? fontSize
        : /\s/u.test(character)
          ? fontSize * 0.35
          : /[ilI1.,:;'|]/u.test(character)
            ? fontSize * 0.35
            : /[MW@%&#]/u.test(character)
              ? fontSize * 0.9
              : fontSize * 0.65;

    return width + characterWidth;
  }, 0);
}

function getSourceLabelMargin(
  chartContainer: HTMLDivElement,
  data: FlowsChartData,
) {
  const incomingNodeIndexes = new Set(data.links.map((link) => link.target));
  let widestSourceLabel = 0;

  chartContainer
    .querySelectorAll<SVGGElement>("[data-node-index]")
    .forEach((nodeGroup) => {
      const nodeIndex = Number(nodeGroup.getAttribute("data-node-index"));
      if (
        !Number.isSafeInteger(nodeIndex) ||
        incomingNodeIndexes.has(nodeIndex)
      ) {
        return;
      }

      nodeGroup
        .querySelectorAll<SVGTextElement>(
          `text.${classes.nodeName}, text.${classes.nodeValue}`,
        )
        .forEach((label) => {
          const measuredWidth =
            typeof label.getComputedTextLength === "function"
              ? label.getComputedTextLength()
              : 0;
          const isValueLabel = label.classList.contains(
            classes.nodeValue ?? "",
          );
          const fallbackWidth = estimateTextWidth(
            label.textContent ?? "",
            isValueLabel ? 12 : 13,
          );
          widestSourceLabel = Math.max(
            widestSourceLabel,
            Number.isFinite(measuredWidth) && measuredWidth > 0
              ? measuredWidth
              : fallbackWidth,
          );
        });
    });

  return Math.max(8, Math.ceil(widestSourceLabel + 16));
}

function getFlowLabel(
  flowType: FlowType | undefined,
  labels: FlowsChartLabels,
) {
  switch (flowType) {
    case "income":
      return labels.income;
    case "expense":
      return labels.expense;
    case "surplus":
      return labels.surplus;
    case "deficit":
      return labels.deficit;
    default:
      return null;
  }
}

function getNodeName(node: unknown, nodes: FlowsChartNode[]) {
  if (isRecord(node) && typeof node.name === "string") {
    return node.name;
  }

  if (typeof node === "number") {
    return nodes[node]?.name ?? "";
  }

  return typeof node === "string" ? node : "";
}

function FlowsChartTooltip({
  active,
  payload,
  chartData,
  formatValue,
  labels,
}: FlowsChartTooltipProps): ReactNode {
  if (!active || !payload?.length) {
    return null;
  }

  const item = payload[0];
  if (!isRecord(item)) {
    return null;
  }

  const itemPayload = isRecord(item.payload) ? item.payload : null;
  const rawPayload =
    itemPayload && isRecord(itemPayload.payload)
      ? itemPayload.payload
      : itemPayload;
  if (!rawPayload) {
    return null;
  }

  const value =
    typeof item.value === "number"
      ? item.value
      : typeof rawPayload.value === "number"
        ? rawPayload.value
        : null;
  if (value === null || !Number.isFinite(value)) {
    return null;
  }

  const source = rawPayload.source;
  const target = rawPayload.target;
  const isLink = source !== undefined && target !== undefined;
  const sourceName = getNodeName(source, chartData.nodes);
  const targetName = getNodeName(target, chartData.nodes);
  const name = typeof item.name === "string" ? item.name : "";
  const index =
    typeof itemPayload?.index === "number"
      ? itemPayload.index
      : typeof rawPayload.index === "number"
        ? rawPayload.index
        : -1;
  const matchingLink = isLink
    ? (chartData.links[index] ??
      chartData.links.find((link) => {
        const linkSource = chartData.nodes[link.source]?.name;
        const linkTarget = chartData.nodes[link.target]?.name;
        return (
          linkSource === sourceName &&
          linkTarget === targetName &&
          link.value === value
        );
      }))
    : undefined;
  const node = !isLink
    ? (chartData.nodes[index] ??
      chartData.nodes.find((entry) => entry.name === name))
    : undefined;
  const metadata = isLink ? matchingLink : node;
  const flowType = metadata?.flowType;
  const parentName = node?.parentName;
  const parentIndex = parentName
    ? chartData.nodes.findIndex((entry) => entry.name === parentName)
    : -1;
  const parentValue =
    parentIndex >= 0
      ? Math.max(
          chartData.links
            .filter((link) => link.source === parentIndex)
            .reduce((total, link) => total + link.value, 0),
          chartData.links
            .filter((link) => link.target === parentIndex)
            .reduce((total, link) => total + link.value, 0),
        )
      : 0;
  const flowLabel = getFlowLabel(flowType, labels);
  const percentageMetrics = [
    ...(flowType === "income"
      ? [
          {
            label: labels.percentOfIncome,
            value: formatPercent(value, chartData.totalIncome),
          },
        ]
      : []),
    ...(flowType === "expense"
      ? [
          {
            label: labels.percentOfSpending,
            value: formatPercent(value, chartData.totalSpending),
          },
        ]
      : []),
    ...(parentValue > 0
      ? [
          {
            label: labels.percentOfBranch,
            value: formatPercent(value, parentValue),
          },
        ]
      : []),
  ];
  const hasTransactionCount =
    metadata?.transactionCount !== undefined && metadata.transactionCount > 0;

  return (
    <div className={classes.tooltip} data-flow-type={flowType} role="tooltip">
      <div className={classes.tooltipHeader}>
        {flowLabel && (
          <BodyText
            className={classes.flowType}
            component="span"
            fz="0.6875rem"
            lh={1.15}
            tone="secondary"
          >
            {flowLabel}
          </BodyText>
        )}
        <div className={classes.tooltipRoute}>
          {isLink ? (
            <>
              <span className={classes.visuallyHidden}>{labels.from}: </span>
              <BodyText
                className={classes.routeValue}
                component="span"
                fw={600}
                tone="primary"
              >
                {sourceName}
              </BodyText>
              <span aria-hidden="true" className={classes.routeArrow}>
                →
              </span>
              <span className={classes.visuallyHidden}>{labels.to}: </span>
              <BodyText
                className={classes.routeValue}
                component="span"
                fw={600}
                tone="primary"
              >
                {targetName}
              </BodyText>
            </>
          ) : (
            <BodyText
              className={classes.routeValue}
              component="span"
              fw={600}
              tone="primary"
            >
              {name}
            </BodyText>
          )}
        </div>
      </div>
      <div className={classes.tooltipAmount}>
        <BodyText className={classes.metricLabel} size="xs" tone="secondary">
          {labels.amount}
        </BodyText>
        <BodyText className={classes.amount} fw={700} tone="primary">
          {formatValue(value)}
        </BodyText>
      </div>
      {(percentageMetrics.length > 0 || hasTransactionCount) && (
        <div className={classes.tooltipMetrics}>
          {percentageMetrics.map((metric) => (
            <div className={classes.metric} key={metric.label}>
              <BodyText
                className={classes.metricLabel}
                size="xs"
                tone="secondary"
              >
                {metric.label}
              </BodyText>
              <BodyText className={classes.metricValue} fw={700} tone="primary">
                {metric.value}
              </BodyText>
              <Progress
                ariaLabel={metric.label}
                size="xs"
                value={Number.parseFloat(metric.value)}
              />
            </div>
          ))}
          {hasTransactionCount && (
            <div className={classes.metric}>
              <BodyText
                className={classes.metricLabel}
                size="xs"
                tone="secondary"
              >
                {labels.transactions}
              </BodyText>
              <BodyText className={classes.metricValue} fw={700} tone="primary">
                {metadata.transactionCount}
              </BodyText>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function FlowsChart({
  ariaLabel,
  className,
  data,
  emptyMessage = "No flow data available.",
  formatValue,
  height = 750,
  isLoading = false,
  labels,
  minScrollWidth = 750,
  style,
  ...rootProps
}: FlowsChartProps) {
  const { colorScheme, colors, hasMantineContext } = useBBUITheme();
  const { ref: chartSizeRef, width: chartWidth } =
    useElementSize<HTMLDivElement>();
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [hoveredNodeIndex, setHoveredNodeIndex] = useState<number | null>(null);
  const [sourceLabelMargin, setSourceLabelMargin] = useState(8);
  const chartData = useMemo(() => {
    validateData(data);
    return data;
  }, [data]);
  const nodeColors = useMemo(
    () => getNodeColors(chartData.nodes, colorScheme, labels.cashAvailable),
    [chartData.nodes, colorScheme, labels.cashAvailable],
  );
  const hasSubcategoryGroups = chartData.nodes.some(
    (node) => node.parentName !== undefined,
  );
  const isNarrow = chartWidth > 0 && chartWidth < minScrollWidth;
  const scrollChartWidth = Math.max(minScrollWidth, chartWidth);
  const setChartContainerRef = useCallback(
    (element: HTMLDivElement | null) => {
      chartContainerRef.current = element;
      chartSizeRef(element);
    },
    [chartSizeRef],
  );

  useLayoutEffect(() => {
    const chartContainer = chartContainerRef.current;
    if (!chartContainer || isLoading || chartData.links.length === 0) {
      return;
    }

    const updateSourceLabelMargin = () => {
      const nextMargin = getSourceLabelMargin(chartContainer, chartData);
      setSourceLabelMargin((currentMargin) =>
        currentMargin === nextMargin ? currentMargin : nextMargin,
      );
    };

    updateSourceLabelMargin();

    const chartObserver = new MutationObserver(updateSourceLabelMargin);
    chartObserver.observe(chartContainer, {
      characterData: true,
      childList: true,
      subtree: true,
    });

    const fontSet = document.fonts;
    fontSet?.addEventListener("loadingdone", updateSourceLabelMargin);

    return () => {
      chartObserver.disconnect();
      fontSet?.removeEventListener("loadingdone", updateSourceLabelMargin);
    };
  }, [chartData, chartSizeRef, chartWidth, formatValue, height, isLoading]);

  if (!Number.isFinite(height) || height <= 0) {
    throw new RangeError("Flows chart height must be a positive number.");
  }
  if (!Number.isFinite(minScrollWidth) || minScrollWidth <= 0) {
    throw new RangeError(
      "Flows chart minimum scroll width must be a positive number.",
    );
  }

  const chartStyle = {
    ...style,
    "--bbui-flows-chart-axis": `var(--bb-color-text-primary, ${colors.textPrimary})`,
    "--bbui-flows-chart-border": `var(--bb-color-border-subtle, ${colors.borderSubtle})`,
    "--bbui-flows-chart-focus": `var(--bb-color-focus-ring, ${colors.focusRing})`,
    "--bbui-flows-chart-font-body": `var(--bb-font-body, ${budgetBoardTypography.body})`,
    "--bbui-flows-chart-neutral": `var(--bb-color-muted, ${colors.muted})`,
    "--bbui-flows-chart-ribbon": `var(--bb-color-border-strong, ${colors.borderStrong})`,
    "--bbui-flows-chart-tooltip-border": `var(--bb-color-border-subtle, ${colors.borderSubtle})`,
    "--bbui-flows-chart-tooltip-negative": `var(--bb-color-error, ${colors.error})`,
    "--bbui-flows-chart-tooltip-muted": `var(--bb-color-text-secondary, ${colors.textSecondary})`,
    "--bbui-flows-chart-tooltip-positive": `var(--bb-color-success, ${colors.success})`,
    "--bbui-flows-chart-tooltip-surface": `var(--bb-color-surface-overlay, ${colors.surfaceOverlay})`,
  } as CSSProperties;

  const highlightedLinkIndexes = useMemo(() => {
    if (hoveredNodeIndex === null) {
      return null;
    }

    const cashNodeIndex = chartData.nodes.findIndex(
      (node) => node.name === labels.cashAvailable,
    );
    if (cashNodeIndex === -1 || hoveredNodeIndex === cashNodeIndex) {
      return null;
    }

    const adjacentLinks = new Map<
      number,
      { linkIndex: number; nodeIndex: number }[]
    >();
    chartData.links.forEach((link, linkIndex) => {
      adjacentLinks.set(link.source, [
        ...(adjacentLinks.get(link.source) ?? []),
        { linkIndex, nodeIndex: link.target },
      ]);
      adjacentLinks.set(link.target, [
        ...(adjacentLinks.get(link.target) ?? []),
        { linkIndex, nodeIndex: link.source },
      ]);
    });

    const queue = [hoveredNodeIndex];
    const previous = new Map<
      number,
      { nodeIndex: number; linkIndex: number }
    >();
    const visited = new Set([hoveredNodeIndex]);

    while (queue.length > 0) {
      const currentNodeIndex = queue.shift();
      if (
        currentNodeIndex === undefined ||
        currentNodeIndex === cashNodeIndex
      ) {
        break;
      }

      adjacentLinks
        .get(currentNodeIndex)
        ?.forEach(({ linkIndex, nodeIndex }) => {
          if (!visited.has(nodeIndex)) {
            visited.add(nodeIndex);
            previous.set(nodeIndex, { nodeIndex: currentNodeIndex, linkIndex });
            queue.push(nodeIndex);
          }
        });
    }

    const result = new Set<number>();
    let currentNodeIndex = cashNodeIndex;
    while (previous.has(currentNodeIndex)) {
      const step = previous.get(currentNodeIndex);
      if (!step) {
        break;
      }

      result.add(step.linkIndex);
      currentNodeIndex = step.nodeIndex;
    }
    return result;
  }, [chartData, hoveredNodeIndex, labels.cashAvailable]);

  const handleMouseEnter = useCallback<
    NonNullable<SankeyProps["onMouseEnter"]>
  >((item, type: SankeyElementType) => {
    setHoveredNodeIndex(type === "node" ? item.index : null);
  }, []);
  const handleMouseLeave = useCallback(() => {
    setHoveredNodeIndex(null);
  }, []);

  const renderNode = useCallback(
    (nodeProps: SankeyNodeProps) => {
      const node = chartData.nodes[nodeProps.index];
      const nodeColor = nodeColors[nodeProps.index];
      if (!node || nodeColor === undefined) {
        return null;
      }

      const labelX = nodeProps.x - 8;
      const labelY = nodeProps.y + nodeProps.height / 2;
      const formattedValue =
        typeof nodeProps.payload.value === "number"
          ? formatValue(nodeProps.payload.value)
          : "";

      return (
        <g
          className={classes.node ?? ""}
          data-node-index={nodeProps.index}
          data-flow-type={node.flowType}
        >
          <rect
            className={classes.nodeRect ?? ""}
            fill={nodeColor}
            fillOpacity={0.16}
            height={nodeProps.height}
            rx={3}
            stroke={nodeColor}
            strokeOpacity={1}
            strokeWidth={nodeProps.index === hoveredNodeIndex ? 2 : 1.25}
            width={nodeProps.width}
            x={nodeProps.x}
            y={nodeProps.y}
          />
          {nodeProps.height >= 32 ? (
            <>
              <text
                className={classes.nodeName ?? ""}
                dominantBaseline="central"
                fill={nodeColor}
                fontFamily="var(--bbui-flows-chart-font-body)"
                textAnchor="end"
                x={labelX}
                y={labelY - 8}
              >
                {node.name}
              </text>
              <text
                className={classes.nodeValue ?? ""}
                dominantBaseline="central"
                fontFamily="var(--bbui-flows-chart-font-body)"
                fontWeight={400}
                textAnchor="end"
                x={labelX}
                y={labelY + 8}
              >
                {formattedValue}
              </text>
            </>
          ) : (
            <text
              className={classes.nodeName ?? ""}
              dominantBaseline="central"
              fill={nodeColor}
              fontFamily="var(--bbui-flows-chart-font-body)"
              textAnchor="end"
              x={labelX}
              y={labelY}
            >
              {node.name}{" "}
              <tspan className={classes.nodeValue ?? ""} fontWeight={400}>
                {formattedValue}
              </tspan>
            </text>
          )}
        </g>
      );
    },
    [chartData.nodes, formatValue, hoveredNodeIndex, nodeColors],
  );

  const renderLink = useCallback(
    (linkProps: SankeyLinkProps) => {
      const hasHighlightedRoute = highlightedLinkIndexes !== null;
      const isHighlighted =
        !hasHighlightedRoute || highlightedLinkIndexes.has(linkProps.index);
      const isDimmed = hasHighlightedRoute && !isHighlighted;
      const fill = "var(--bbui-flows-chart-ribbon)";

      return (
        <path
          className={[classes.link, isDimmed ? classes.linkDimmed : undefined]
            .filter(Boolean)
            .join(" ")}
          d={`
            M${linkProps.sourceX},${linkProps.sourceY + linkProps.linkWidth / 2}
            C${linkProps.sourceControlX},${linkProps.sourceY + linkProps.linkWidth / 2}
              ${linkProps.targetControlX},${linkProps.targetY + linkProps.linkWidth / 2}
              ${linkProps.targetX},${linkProps.targetY + linkProps.linkWidth / 2}
            L${linkProps.targetX},${linkProps.targetY - linkProps.linkWidth / 2}
            C${linkProps.targetControlX},${linkProps.targetY - linkProps.linkWidth / 2}
              ${linkProps.sourceControlX},${linkProps.sourceY - linkProps.linkWidth / 2}
              ${linkProps.sourceX},${linkProps.sourceY - linkProps.linkWidth / 2}
            Z
          `}
          data-link-index={linkProps.index}
          fill={fill}
          fillOpacity={
            hasHighlightedRoute && isHighlighted
              ? 0.68
              : hasHighlightedRoute
                ? 0.16
                : 0.22
          }
          stroke={fill}
          strokeLinejoin="round"
          strokeOpacity={isDimmed ? 0.1 : hasHighlightedRoute ? 0.7 : 0.2}
          strokeWidth={hasHighlightedRoute && isHighlighted ? 1.5 : 0.5}
        />
      );
    },
    [chartData.links, highlightedLinkIndexes, nodeColors],
  );

  const renderSankey = (width: number | `${number}%`, sankeyHeight: number) => (
    <ResponsiveContainer height={sankeyHeight} width={width}>
      <Sankey
        accessibilityLayer
        align="left"
        className={classes.chart ?? ""}
        data={chartData}
        link={renderLink}
        margin={{ top: 12, right: 8, bottom: 32, left: sourceLabelMargin }}
        node={renderNode}
        nodePadding={14}
        nodeWidth={12}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sort={!hasSubcategoryGroups}
      >
        <Tooltip
          animationDuration={0}
          content={({ active, payload }) => (
            <FlowsChartTooltip
              active={active}
              chartData={chartData}
              formatValue={formatValue}
              labels={labels}
              payload={payload}
            />
          )}
          isAnimationActive={false}
        />
      </Sankey>
    </ResponsiveContainer>
  );

  const content = (
    <div
      {...rootProps}
      aria-busy={isLoading}
      aria-label={ariaLabel}
      className={[classes.root, className].filter(Boolean).join(" ")}
      role="group"
      style={chartStyle}
    >
      {isLoading ? (
        <div aria-label={ariaLabel} role="status">
          <Skeleton aria-hidden="true" height={height} />
        </div>
      ) : chartData.links.length === 0 ? (
        <BodyText className={classes.emptyMessage} component="p" tone="muted">
          {emptyMessage}
        </BodyText>
      ) : (
        <div
          className={classes.chartViewport}
          ref={setChartContainerRef}
          style={{ height }}
        >
          {isNarrow ? (
            <div
              aria-label={`${ariaLabel}. Scroll horizontally to view the full diagram.`}
              className={classes.chartScrollViewport}
              role="region"
              tabIndex={0}
            >
              <div
                className={classes.chartScrollContent}
                style={{ height, width: scrollChartWidth }}
              >
                {renderSankey(scrollChartWidth, height)}
              </div>
            </div>
          ) : (
            renderSankey("100%", height)
          )}
        </div>
      )}
    </div>
  );

  return ensureBBUIMantineProvider(content, hasMantineContext, colorScheme);
}
