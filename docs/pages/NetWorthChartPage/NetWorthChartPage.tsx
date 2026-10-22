import { useState } from "react";
import {
  BodyText,
  Checkbox,
  HeadingText,
  NetWorthChart,
  NumberInput,
} from "../../../src";
import type {
  NetWorthChartData,
  NetWorthChartSeriesLabels,
} from "../../../src";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import pageStyles from "../Page.module.css";
import styles from "./NetWorthChartPage.module.css";

const sampleData: NetWorthChartData[] = [
  { date: "August 2026", assets: 72500, liabilities: -18200, net: 54300 },
  { date: "September 2026", assets: 73900, liabilities: -19000, net: 54900 },
  { date: "October 2026", assets: 75400, liabilities: -20400, net: 55000 },
];

const seriesLabels: NetWorthChartSeriesLabels = {
  assets: "Assets",
  liabilities: "Liabilities",
  net: "Net",
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(value);

export function NetWorthChartPage() {
  const [height, setHeight] = useState(400);
  const [isLoading, setIsLoading] = useState(false);
  const playgroundCode = `<NetWorthChart
  ariaLabel="Net worth over time"
  data={sampleData}
  formatValue={formatCurrency}
  height={${height}}
  isLoading={${isLoading}}
  seriesLabels={seriesLabels}
/>`;

  return (
    <section className={pageStyles.componentSection} id="net-worth-chart">
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
            NetWorthChart
          </HeadingText>
        </div>
        <code>
          import {"{ NetWorthChart }"} from '@teelur/budget-board-ui';
        </code>
      </div>
      <BodyText
        className={pageStyles.sectionCopy}
        component="p"
        m="1em 0"
        tone="muted"
      >
        A responsive, theme-aware composite chart for assets, signed
        liabilities, and net worth over time. The asset and liability bars use
        BBUI semantic colors, while the net-worth line stays neutral. Callers
        provide prepared values, localized labels, an amount formatter, and
        loading and empty-state content. Hover or keyboard-focus a legend item
        to emphasize its matching bars or line.
      </BodyText>

      <ComponentDemoSection
        code={`<NetWorthChart
  ariaLabel="Net worth over time"
  data={sampleData}
  formatValue={formatCurrency}
  seriesLabels={seriesLabels}
/>`}
        description="Assets and liabilities retain their signs so the chart stacks positive and negative values separately; net is their sum. The chart adapts its axes, grid, tooltip, and surfaces to the active BBUI theme."
        id="net-worth-chart-basic"
        title="Basic usage"
      >
        <div className={styles.chartPreview}>
          <NetWorthChart
            ariaLabel="Net worth over time"
            data={sampleData}
            formatValue={formatCurrency}
            seriesLabels={seriesLabels}
          />
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        code={`<NetWorthChart
  ariaLabel="Net worth over time"
  data={[]}
  emptyMessage="Select an account to see net worth."
  formatValue={formatCurrency}
  isLoading={false}
  seriesLabels={seriesLabels}
/>`}
        description="Loading and empty states let the chart fit into asynchronous account and balance views."
        id="net-worth-chart-states"
        title="Loading and empty states"
      >
        <div className={styles.stateGrid}>
          <div className={styles.chartPreview}>
            <NetWorthChart
              ariaLabel="Loading net worth"
              data={sampleData}
              formatValue={formatCurrency}
              isLoading
              seriesLabels={seriesLabels}
            />
          </div>
          <div className={styles.chartPreview}>
            <NetWorthChart
              ariaLabel="Net worth over time"
              data={[]}
              emptyMessage="Select an account to see net worth."
              formatValue={formatCurrency}
              seriesLabels={seriesLabels}
            />
          </div>
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        code={playgroundCode}
        description="Adjust the chart height and toggle the loading state while keeping the data, series labels, and formatter unchanged."
        id="net-worth-chart-playground"
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
            <NetWorthChart
              ariaLabel="Net worth over time"
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
        aria-labelledby="net-worth-chart-api-heading"
        className={pageStyles.componentReferenceSection}
        id="net-worth-chart-api"
      >
        <HeadingText
          id="net-worth-chart-api-heading"
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
                    <code>NetWorthChartData[]</code>
                  </td>
                  <td>Required</td>
                  <td>
                    Date labels and finite asset, liability, and net values.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>seriesLabels</code>
                  </td>
                  <td>
                    <code>NetWorthChartSeriesLabels</code>
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
                    <code>"No net worth data available."</code>
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
              <code>NetWorthChartData</code> contains <code>date: string</code>,{" "}
              <code>assets: number</code>, <code>liabilities: number</code>, and{" "}
              <code>net: number</code>. Assets and liabilities retain their
              signs, and net is their sum. Each date label must be non-empty and
              each numeric value must be finite.{" "}
              <code>NetWorthChartSeriesLabels</code> contains localized{" "}
              <code>assets</code>, <code>liabilities</code>, and{" "}
              <code>net</code> strings.
            </BodyText>
          </div>
        </div>
      </section>
    </section>
  );
}
