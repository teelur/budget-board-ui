import { useState } from "react";
import {
  BodyText,
  Checkbox,
  HeadingText,
  MonthlySpendingChart,
  NumberInput,
} from "../../../src";
import type { MonthlySpendingChartData } from "../../../src";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import pageStyles from "../Page.module.css";
import styles from "./MonthlySpendingChartPage.module.css";

const sampleData: MonthlySpendingChartData[] = [
  { month: "January 2026", total: 1800 },
  { month: "February 2026", total: 2200 },
  { month: "March 2026", total: 1950 },
  { month: "April 2026", total: 2600 },
  { month: "May 2026", total: 2100 },
];

const average = 2130;

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(value);

export function MonthlySpendingChartPage() {
  const [height, setHeight] = useState(400);
  const [includeGrid, setIncludeGrid] = useState(true);
  const [includeYAxis, setIncludeYAxis] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const playgroundCode = `<MonthlySpendingChart
  ariaLabel="Monthly spending"
  average={${average}}
  averageLabel="Average spending"
  data={sampleData}
  formatValue={formatCurrency}
  height={${height}}
  includeGrid={${includeGrid}}
  includeYAxis={${includeYAxis}}
  isLoading={${isLoading}}
/>`;

  return (
    <section
      className={pageStyles.componentSection}
      id="monthly-spending-chart"
    >
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
            MonthlySpendingChart
          </HeadingText>
        </div>
        <code>
          import {"{ MonthlySpendingChart }"} from '@teelur/budget-board-ui';
        </code>
      </div>
      <BodyText
        className={pageStyles.sectionCopy}
        component="p"
        m="1em 0"
        tone="muted"
      >
        A responsive, theme-aware monthly bar chart with an average summary and
        reference line. Callers provide signed monthly totals, the calculated
        average, localized labels, and a value formatter; BBUI supplies the
        shared chart palette, axes, optional grid, and loading and empty states.
        Bars animate with BBUI's chart timing while their value labels stay
        visible through the transition.
        Existing chart content stays visible during refreshes, with a skeleton
        shown while an initial data load has no chart data yet.
      </BodyText>

      <ComponentDemoSection
        code={`<MonthlySpendingChart
  ariaLabel="Monthly spending"
  average={${average}}
  averageLabel="Average spending"
  data={sampleData}
  formatValue={formatCurrency}
  includeGrid
/>`}
        description="Each data point contains a localized month label and a signed total. The caller calculates the average for the desired months and supplies its summary label."
        id="monthly-spending-chart-basic"
        title="Basic usage"
      >
        <div className={styles.chartPreview}>
          <MonthlySpendingChart
            ariaLabel="Monthly spending"
            average={average}
            averageLabel="Average spending"
            data={sampleData}
            formatValue={formatCurrency}
            includeGrid
          />
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        code={`<MonthlySpendingChart
  ariaLabel="Monthly spending"
  average={${average}}
  averageLabel="Average spending"
  data={[]}
  emptyMessage="Select months to see spending."
  formatValue={formatCurrency}
  isLoading={false}
/>`}
        description="An empty data array shows the loading skeleton; existing chart data and labels stay visible during a refresh."
        id="monthly-spending-chart-states"
        title="Loading and empty states"
      >
        <div className={styles.stateGrid}>
          <div className={styles.chartPreview}>
            <MonthlySpendingChart
              ariaLabel="Loading monthly spending"
              average={average}
              averageLabel="Average spending"
              data={[]}
              formatValue={formatCurrency}
              isLoading
            />
          </div>
          <div className={styles.chartPreview}>
            <MonthlySpendingChart
              ariaLabel="Monthly spending"
              average={average}
              averageLabel="Average spending"
              data={[]}
              emptyMessage="Select months to see spending."
              formatValue={formatCurrency}
            />
          </div>
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        code={playgroundCode}
        description="Adjust the chart height, axes, grid, and loading state while keeping the same monthly data and average."
        id="monthly-spending-chart-playground"
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
            <Checkbox
              checked={isLoading}
              label="Simulate data refresh"
              onChange={(event) => setIsLoading(event.currentTarget.checked)}
            />
          </div>
          <div className={styles.chartPreview}>
            <MonthlySpendingChart
              ariaLabel="Monthly spending"
              average={average}
              averageLabel="Average spending"
              data={sampleData}
              formatValue={formatCurrency}
              height={height}
              includeGrid={includeGrid}
              includeYAxis={includeYAxis}
              isLoading={isLoading}
            />
          </div>
        </div>
      </ComponentDemoSection>

      <section
        aria-labelledby="monthly-spending-chart-api-heading"
        className={pageStyles.componentReferenceSection}
        id="monthly-spending-chart-api"
      >
        <HeadingText
          id="monthly-spending-chart-api-heading"
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
                    <code>MonthlySpendingChartData[]</code>
                  </td>
                  <td>Required</td>
                  <td>Month labels and finite, signed monthly totals.</td>
                </tr>
                <tr>
                  <td>
                    <code>average</code>
                  </td>
                  <td>
                    <code>number</code>
                  </td>
                  <td>Required</td>
                  <td>Finite average shown in the summary and reference line.</td>
                </tr>
                <tr>
                  <td>
                    <code>averageLabel</code>
                  </td>
                  <td>
                    <code>ReactNode</code>
                  </td>
                  <td>Required</td>
                  <td>Localized label shown beside the average amount.</td>
                </tr>
                <tr>
                  <td>
                    <code>formatValue</code>
                  </td>
                  <td>
                    <code>(value: number) =&gt; string</code>
                  </td>
                  <td>Required</td>
                  <td>Formats the average, axis, and bar-label values.</td>
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
                  <td>
                    Shows a themed skeleton without data; retains existing
                    chart content during refreshes.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>emptyMessage</code>
                  </td>
                  <td>
                    <code>ReactNode</code>
                  </td>
                  <td>
                    <code>"No monthly spending data available."</code>
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
              <code>MonthlySpendingChartData</code> contains a localized{" "}
              <code>month: string</code> label and a finite{" "}
              <code>total: number</code>. Totals and the supplied average may be
              signed, so the chart can also represent income or other signed
              monthly values. The caller calculates the average for its chosen
              date range.
            </BodyText>
          </div>
        </div>
      </section>
    </section>
  );
}
