import { useState } from "react";
import {
  BodyText,
  Checkbox,
  HeadingText,
  NumberInput,
  SpendingChart,
} from "../../../src";
import type {
  SpendingChartData,
  SpendingChartSeries,
} from "../../../src";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import pageStyles from "../Page.module.css";
import styles from "./SpendingChartPage.module.css";

const sampleData: SpendingChartData[] = [
  { day: 1, march: 0, april: 0, may: 0 },
  { day: 5, march: 180, april: 145, may: 210 },
  { day: 10, march: 340, april: 390, may: 460 },
  { day: 15, march: 650, april: 590, may: 720 },
  { day: 20, march: 820, april: 940, may: 1010 },
  { day: 25, march: 1180, april: 1270, may: 1390 },
  { day: 30, march: 1450, april: 1530, may: 1710 },
];

const series: SpendingChartSeries[] = [
  { key: "march", label: "March 2026" },
  { key: "april", label: "April 2026" },
  { key: "may", label: "May 2026" },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(value);

export function SpendingChartPage() {
  const [height, setHeight] = useState(400);
  const [includeGrid, setIncludeGrid] = useState(true);
  const [includeYAxis, setIncludeYAxis] = useState(true);
  const playgroundCode = `<SpendingChart
  ariaLabel="Cumulative spending by day"
  data={sampleData}
  formatValue={formatCurrency}
  height={${height}}
  includeGrid={${includeGrid}}
  includeYAxis={${includeYAxis}}
  series={series}
/>`;

  return (
    <section className={pageStyles.componentSection} id="spending-chart">
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
            SpendingChart
          </HeadingText>
        </div>
        <code>
          import {"{ SpendingChart }"} from '@teelur/budget-board-ui';
        </code>
      </div>
      <BodyText
        className={pageStyles.sectionCopy}
        component="p"
        m="1em 0"
        tone="muted"
      >
        A responsive, theme-aware comparison of cumulative spending by day
        across selected months. Callers provide chart-ready points, localized
        series labels, and a value formatter; BBUI supplies the shared graph
        palette and semantic axis, grid, focus, cursor, and tooltip styling.
        Point markers show each supplied daily value, and hovering or
        keyboard-focusing a legend item emphasizes its area.
      </BodyText>

      <ComponentDemoSection
        code={`<SpendingChart
  ariaLabel="Cumulative spending by day"
  data={sampleData}
  formatValue={formatCurrency}
  includeGrid
  series={series}
/>`}
        description="Each data point contains a day and values keyed by the series. Series keys map those values to localized labels; optional series colors override BBUI's theme-aware data palette."
        id="spending-chart-basic"
        title="Basic usage"
      >
        <div className={styles.chartPreview}>
          <SpendingChart
            ariaLabel="Cumulative spending by day"
            data={sampleData}
            formatValue={formatCurrency}
            includeGrid
            series={series}
          />
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        code={`<SpendingChart
  ariaLabel="Cumulative spending by day"
  data={[]}
  emptyMessage="Select months to see spending."
  formatValue={formatCurrency}
  isLoading={false}
  series={series}
/>`}
        description="Loading and empty states fit into asynchronous data views and month-selection flows."
        id="spending-chart-states"
        title="Loading and empty states"
      >
        <div className={styles.stateGrid}>
          <div className={styles.chartPreview}>
            <SpendingChart
              ariaLabel="Loading cumulative spending"
              data={sampleData}
              formatValue={formatCurrency}
              isLoading
              series={series}
            />
          </div>
          <div className={styles.chartPreview}>
            <SpendingChart
              ariaLabel="Cumulative spending by day"
              data={[]}
              emptyMessage="Select months to see spending."
              formatValue={formatCurrency}
              series={series}
            />
          </div>
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        code={playgroundCode}
        description="Adjust the chart height, grid, and y-axis while keeping the same cumulative data and series."
        id="spending-chart-playground"
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
              checked={includeGrid}
              label="Show grid"
              onChange={(event) =>
                setIncludeGrid(event.currentTarget.checked)
              }
            />
            <Checkbox
              checked={includeYAxis}
              label="Show y-axis"
              onChange={(event) =>
                setIncludeYAxis(event.currentTarget.checked)
              }
            />
          </div>
          <div className={styles.chartPreview}>
            <SpendingChart
              ariaLabel="Cumulative spending by day"
              data={sampleData}
              formatValue={formatCurrency}
              height={height}
              includeGrid={includeGrid}
              includeYAxis={includeYAxis}
              series={series}
            />
          </div>
        </div>
      </ComponentDemoSection>

      <section
        aria-labelledby="spending-chart-api-heading"
        className={pageStyles.componentReferenceSection}
        id="spending-chart-api"
      >
        <HeadingText
          id="spending-chart-api-heading"
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
                    <code>SpendingChartData[]</code>
                  </td>
                  <td>Required</td>
                  <td>Day values and finite data for the configured series.</td>
                </tr>
                <tr>
                  <td>
                    <code>series</code>
                  </td>
                  <td>
                    <code>SpendingChartSeries[]</code>
                  </td>
                  <td>Required</td>
                  <td>Series keys, localized labels, and optional colors.</td>
                </tr>
                <tr>
                  <td>
                    <code>formatValue</code>
                  </td>
                  <td>
                    <code>(value: number) =&gt; string</code>
                  </td>
                  <td>Required</td>
                  <td>Formats y-axis and tooltip values.</td>
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
                    <code>includeGrid</code>
                  </td>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>
                    <code>false</code>
                  </td>
                  <td>Shows the chart grid.</td>
                </tr>
                <tr>
                  <td>
                    <code>includeYAxis</code>
                  </td>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>
                    <code>true</code>
                  </td>
                  <td>Shows the formatted value axis.</td>
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
                    <code>"No spending data available."</code>
                  </td>
                  <td>Content shown when data or series is empty.</td>
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
              <code>SpendingChartData</code> contains a numeric{" "}
              <code>day</code> and numeric values keyed by series key. A series
              value may be omitted for a day, such as when months have different
              lengths; provided values must be finite.{" "}
              <code>SpendingChartSeries</code> contains a unique{" "}
              <code>key</code>, a localized <code>label</code>, and an optional
              color override. Series without a color use the shared BBUI data
              palette for the active theme.
            </BodyText>
          </div>
        </div>
      </section>
    </section>
  );
}
