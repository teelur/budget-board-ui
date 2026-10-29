import { useState } from "react";
import {
  BodyText,
  Checkbox,
  HeadingText,
  NumberInput,
  ValueChart,
} from "../../../src";
import type { ValueChartData, ValueChartSeries } from "../../../src";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import pageStyles from "../Page.module.css";
import styles from "./ValueChartPage.module.css";

const sampleData: ValueChartData[] = [
  {
    date: "August 2026",
    cash: 14200,
    investments: 68500,
    liabilities: -19200,
  },
  {
    date: "September 2026",
    cash: 14800,
    investments: 71200,
    liabilities: -20500,
  },
  {
    date: "October 2026",
    cash: 15600,
    investments: 73900,
    liabilities: -21400,
  },
];

const series: ValueChartSeries[] = [
  { key: "cash", label: "Cash" },
  { key: "investments", label: "Investments" },
  { key: "liabilities", label: "Liabilities" },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(value);

export function ValueChartPage() {
  const [height, setHeight] = useState(400);
  const [isLoading, setIsLoading] = useState(false);
  const playgroundCode = `<ValueChart
  ariaLabel="Values over time"
  data={sampleData}
  formatValue={formatCurrency}
  height={${height}}
  isLoading={${isLoading}}
  series={series}
/>`;

  return (
    <section className={pageStyles.componentSection} id="value-chart">
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
            ValueChart
          </HeadingText>
        </div>
        <code>import {"{ ValueChart }"} from '@teelur/budget-board-ui';</code>
      </div>
      <BodyText
        className={pageStyles.sectionCopy}
        component="p"
        m="1em 0"
        tone="muted"
      >
        A responsive, theme-aware stacked bar chart for dated values across
        multiple series. Series use the BBUI data palette by default, and signed
        values stack on either side of zero. The tooltip includes each series
        and their combined total; hover or keyboard-focus a legend item to
        emphasize its bars.
      </BodyText>

      <ComponentDemoSection
        code={`<ValueChart
  ariaLabel="Values over time"
  data={sampleData}
  formatValue={formatCurrency}
  series={series}
/>`}
        description="Each datum contains a date label and numeric values keyed by series. The chart adapts its axes, grid, tooltip, legend, and surfaces to the active BBUI theme."
        id="value-chart-basic"
        title="Basic usage"
      >
        <div className={styles.chartPreview}>
          <ValueChart
            ariaLabel="Values over time"
            data={sampleData}
            formatValue={formatCurrency}
            series={series}
          />
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        code={`<ValueChart
  ariaLabel="Values over time"
  data={[]}
  emptyMessage="Select values to see the chart."
  formatValue={formatCurrency}
  isLoading={false}
  series={series}
/>`}
        description="Loading and empty states fit asynchronous account, asset, and liability views."
        id="value-chart-states"
        title="Loading and empty states"
      >
        <div className={styles.stateGrid}>
          <div className={styles.chartPreview}>
            <ValueChart
              ariaLabel="Loading values"
              data={sampleData}
              formatValue={formatCurrency}
              isLoading
              series={series}
            />
          </div>
          <div className={styles.chartPreview}>
            <ValueChart
              ariaLabel="Values over time"
              data={[]}
              emptyMessage="Select values to see the chart."
              formatValue={formatCurrency}
              series={series}
            />
          </div>
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        code={playgroundCode}
        description="Adjust chart height and toggle the loading state while keeping the sample data, series, and formatter unchanged."
        id="value-chart-playground"
        title="API playground"
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
            <ValueChart
              ariaLabel="Values over time"
              data={sampleData}
              formatValue={formatCurrency}
              height={height}
              isLoading={isLoading}
              series={series}
            />
          </div>
        </div>
      </ComponentDemoSection>

      <section
        aria-labelledby="value-chart-api-heading"
        className={pageStyles.componentReferenceSection}
        id="value-chart-api"
      >
        <HeadingText
          id="value-chart-api-heading"
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
                    <code>ValueChartData[]</code>
                  </td>
                  <td>Required</td>
                  <td>
                    Date labels and finite numeric values keyed by series.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>series</code>
                  </td>
                  <td>
                    <code>ValueChartSeries[]</code>
                  </td>
                  <td>Required</td>
                  <td>
                    Unique series keys and labels; an optional color overrides
                    the palette.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>formatValue</code>
                  </td>
                  <td>
                    <code>(value: number) =&gt; string</code>
                  </td>
                  <td>Required</td>
                  <td>Formats axis, series, and total amounts.</td>
                </tr>
                <tr>
                  <td>
                    <code>totalLabel</code>
                  </td>
                  <td>
                    <code>string</code>
                  </td>
                  <td>
                    <code>"Total"</code>
                  </td>
                  <td>Label for the sum of tooltip series values.</td>
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
                    <code>"No value data available."</code>
                  </td>
                  <td>Content shown when data or series are empty.</td>
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
              <code>ValueChartData</code> contains a non-empty{" "}
              <code>date: string</code> and finite numeric values keyed by each
              series key. Missing series values are treated as absent bars.{" "}
              <code>ValueChartSeries</code> contains a unique{" "}
              <code>key: string</code>, a non-empty <code>label: string</code>,
              and an optional CSS <code>color</code>; otherwise the chart uses
              the BBUI data palette.
            </BodyText>
          </div>
        </div>
      </section>
    </section>
  );
}
