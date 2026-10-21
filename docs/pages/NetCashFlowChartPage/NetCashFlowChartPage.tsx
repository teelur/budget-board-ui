import { useState } from "react";
import {
  BodyText,
  Checkbox,
  HeadingText,
  NetCashFlowChart,
  NumberInput,
} from "../../../src";
import type {
  NetCashFlowChartData,
  NetCashFlowChartSeriesLabels,
} from "../../../src";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import pageStyles from "../Page.module.css";
import styles from "./NetCashFlowChartPage.module.css";

const sampleData: NetCashFlowChartData[] = [
  { month: "August 2026", income: 4200, spending: -3350, net: 850 },
  { month: "September 2026", income: 4600, spending: -3890, net: 710 },
  { month: "October 2026", income: 4350, spending: -4720, net: -370 },
];

const seriesLabels: NetCashFlowChartSeriesLabels = {
  income: "Income",
  spending: "Spending",
  net: "Net",
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(value);

export function NetCashFlowChartPage() {
  const [height, setHeight] = useState(400);
  const [isLoading, setIsLoading] = useState(false);
  const playgroundCode = `<NetCashFlowChart
  ariaLabel="Net cash flow by month"
  data={sampleData}
  formatValue={formatCurrency}
  height={${height}}
  isLoading={${isLoading}}
  seriesLabels={seriesLabels}
/>`;

  return (
    <section className={pageStyles.componentSection} id="net-cash-flow-chart">
      <div className={pageStyles.sectionHeading}>
        <div>
          <BodyText
            className={pageStyles.eyebrow}
            component="p"
            ff="var(--bb-font-data)"
            fz="0.68rem"
            tone="muted"
          >
            Data visualization
          </BodyText>
          <HeadingText level={2} tone="heading" lh={1.5}>
            NetCashFlowChart
          </HeadingText>
        </div>
        <code>
          import {"{ NetCashFlowChart }"} from '@teelur/budget-board-ui';
        </code>
      </div>
      <BodyText
        className={pageStyles.sectionCopy}
        component="p"
        m="1em 0"
        tone="muted"
      >
        A responsive, theme-aware composite chart for monthly income, signed
        spending, and net cash flow. Income and spending use BBUI semantic
        colors, and the net line stays neutral. Callers provide prepared values,
        localized labels, an amount formatter, and loading and empty-state
        content.
      </BodyText>

      <ComponentDemoSection
        code={`<NetCashFlowChart
  ariaLabel="Net cash flow by month"
  data={sampleData}
  formatValue={formatCurrency}
  seriesLabels={seriesLabels}
/>`}
        description="Income is positive, spending retains its signed transaction total, and net is the sum of those series. The chart uses semantic success and error colors for income and spending and adapts its axis, grid, tooltip, and surfaces to the active BBUI theme."
        id="net-cash-flow-chart-basic"
        title="Basic usage"
      >
        <div className={styles.chartPreview}>
          <NetCashFlowChart
            ariaLabel="Net cash flow by month"
            data={sampleData}
            formatValue={formatCurrency}
            seriesLabels={seriesLabels}
          />
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        code={`<NetCashFlowChart
  ariaLabel="Net cash flow by month"
  data={[]}
  emptyMessage="Select a month to see cash flow."
  formatValue={formatCurrency}
  isLoading={false}
  seriesLabels={seriesLabels}
/>`}
        description="Loading and empty states let the chart fit into asynchronous data views and month-selection flows."
        id="net-cash-flow-chart-states"
        title="Loading and empty states"
      >
        <div className={styles.stateGrid}>
          <div className={styles.chartPreview}>
            <NetCashFlowChart
              ariaLabel="Loading net cash flow"
              data={sampleData}
              formatValue={formatCurrency}
              isLoading
              seriesLabels={seriesLabels}
            />
          </div>
          <div className={styles.chartPreview}>
            <NetCashFlowChart
              ariaLabel="Net cash flow by month"
              data={[]}
              emptyMessage="Select a month to see cash flow."
              formatValue={formatCurrency}
              seriesLabels={seriesLabels}
            />
          </div>
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        code={playgroundCode}
        description="Adjust the chart height and toggle the loading state while keeping the data, series labels, and formatter unchanged."
        id="net-cash-flow-chart-playground"
        title="Playground"
      >
        <div className={styles.playground}>
          <div className={styles.playgroundControls}>
            <NumberInput
              label="Chart height"
              max={560}
              min={280}
              onChange={(value) =>
                setHeight(typeof value === "number" ? value : 400)
              }
              step={40}
              value={height}
            />
            <Checkbox
              checked={isLoading}
              label="Show loading state"
              onChange={(event) => setIsLoading(event.currentTarget.checked)}
            />
          </div>
          <div className={styles.chartPreview}>
            <NetCashFlowChart
              ariaLabel="Net cash flow by month"
              data={sampleData}
              formatValue={formatCurrency}
              height={height}
              isLoading={isLoading}
              seriesLabels={seriesLabels}
            />
          </div>
        </div>
      </ComponentDemoSection>

      <section
        aria-labelledby="net-cash-flow-chart-api-heading"
        className={pageStyles.componentReferenceSection}
        id="net-cash-flow-chart-api"
      >
        <HeadingText
          id="net-cash-flow-chart-api-heading"
          level={3}
          tone="heading"
          lh={1.5}
        >
          API reference
        </HeadingText>
        <div className={pageStyles.referenceGrid}>
          <div>
            <HeadingText level={4} tone="heading" lh={1.5}>
              Props
            </HeadingText>
            <table>
              <thead>
                <tr>
                  <th scope="col">Prop</th>
                  <th scope="col">Type</th>
                  <th scope="col">Default</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>ariaLabel</code>
                  </td>
                  <td>
                    <code>string</code>
                  </td>
                  <td>Required</td>
                  <td>Accessible name for the chart group.</td>
                </tr>
                <tr>
                  <td>
                    <code>data</code>
                  </td>
                  <td>
                    <code>NetCashFlowChartData[]</code>
                  </td>
                  <td>Required</td>
                  <td>
                    Month labels and finite income, spending, and net values.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>seriesLabels</code>
                  </td>
                  <td>
                    <code>NetCashFlowChartSeriesLabels</code>
                  </td>
                  <td>Required</td>
                  <td>Localized legend and tooltip labels for each series.</td>
                </tr>
                <tr>
                  <td>
                    <code>formatValue</code>
                  </td>
                  <td>
                    <code>(value: number) =&gt; string</code>
                  </td>
                  <td>Required</td>
                  <td>Formats axis and tooltip amounts.</td>
                </tr>
                <tr>
                  <td>
                    <code>height</code>
                  </td>
                  <td>
                    <code>number</code>
                  </td>
                  <td>
                    <code>400</code>
                  </td>
                  <td>Positive chart plot height in pixels.</td>
                </tr>
                <tr>
                  <td>
                    <code>isLoading</code>
                  </td>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>
                    <code>false</code>
                  </td>
                  <td>Replaces the chart with a themed skeleton.</td>
                </tr>
                <tr>
                  <td>
                    <code>emptyMessage</code>
                  </td>
                  <td>
                    <code>ReactNode</code>
                  </td>
                  <td>
                    <code>"No cash flow data available."</code>
                  </td>
                  <td>Content shown when the data array is empty.</td>
                </tr>
                <tr>
                  <td>
                    <code>className</code>, <code>style</code>, and standard
                    <code> div</code> attributes
                  </td>
                  <td>HTML div attributes</td>
                  <td>—</td>
                  <td>Forwarded to the chart root element.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <HeadingText level={4} tone="heading" lh={1.5}>
              Data types
            </HeadingText>
            <BodyText component="p" tone="muted">
              <code>NetCashFlowChartData</code> contains{" "}
              <code>month: string</code>, <code>income: number</code>,{" "}
              <code>spending: number</code>, and <code>net: number</code>.
              Income and spending values should retain their transaction signs;
              net is plotted as the sum of the two. Each numeric value must be
              finite. <code>NetCashFlowChartSeriesLabels</code> contains
              localized <code>income</code>, <code>spending</code>, and{" "}
              <code>net</code> strings.
            </BodyText>
          </div>
        </div>
      </section>
    </section>
  );
}
