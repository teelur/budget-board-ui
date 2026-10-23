import { BodyText, FlowsChart, HeadingText } from "../../../src";
import type { FlowsChartData, FlowsChartLabels } from "../../../src";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import pageStyles from "../Page.module.css";
import styles from "./FlowsChartPage.module.css";

const sampleData: FlowsChartData = {
  nodes: [
    { name: "Salary", flowType: "income", transactionCount: 1 },
    { name: "Freelance", flowType: "income", transactionCount: 1 },
    { name: "Income", flowType: "income", transactionCount: 2 },
    { name: "Cash available" },
    { name: "Living", flowType: "expense", transactionCount: 2 },
    {
      name: "Housing",
      parentName: "Living",
      flowType: "expense",
      transactionCount: 1,
    },
    {
      name: "Food",
      parentName: "Living",
      flowType: "expense",
      transactionCount: 1,
    },
    {
      name: "Travel",
      flowType: "expense",
      transactionCount: 2,
    },
    {
      name: "Transit",
      parentName: "Travel",
      flowType: "expense",
      transactionCount: 1,
    },
    {
      name: "Fuel",
      parentName: "Transportation",
      flowType: "expense",
      transactionCount: 1,
    },
    { name: "Health", flowType: "expense", transactionCount: 2 },
    {
      name: "Medical",
      parentName: "Health",
      flowType: "expense",
      transactionCount: 1,
    },
    {
      name: "Personal",
      parentName: "Health",
      flowType: "expense",
      transactionCount: 1,
    },
    { name: "Surplus", flowType: "surplus" },
  ],
  links: [
    {
      source: 0,
      target: 2,
      value: 4200,
      transactionCount: 1,
      flowType: "income",
    },
    {
      source: 1,
      target: 2,
      value: 600,
      transactionCount: 1,
      flowType: "income",
    },
    {
      source: 2,
      target: 3,
      value: 4800,
      transactionCount: 2,
      flowType: "income",
    },
    {
      source: 3,
      target: 4,
      value: 2000,
      transactionCount: 2,
      flowType: "expense",
    },
    {
      source: 4,
      target: 5,
      value: 1500,
      transactionCount: 1,
      flowType: "expense",
    },
    {
      source: 4,
      target: 6,
      value: 500,
      transactionCount: 1,
      flowType: "expense",
    },
    {
      source: 3,
      target: 7,
      value: 700,
      transactionCount: 2,
      flowType: "expense",
    },
    {
      source: 7,
      target: 8,
      value: 400,
      transactionCount: 1,
      flowType: "expense",
    },
    {
      source: 7,
      target: 9,
      value: 300,
      transactionCount: 1,
      flowType: "expense",
    },
    {
      source: 3,
      target: 10,
      value: 400,
      transactionCount: 2,
      flowType: "expense",
    },
    {
      source: 10,
      target: 11,
      value: 250,
      transactionCount: 1,
      flowType: "expense",
    },
    {
      source: 10,
      target: 12,
      value: 150,
      transactionCount: 1,
      flowType: "expense",
    },
    { source: 3, target: 13, value: 1700, flowType: "surplus" },
  ],
  totalIncome: 4800,
  totalSpending: 3100,
};

const labels: FlowsChartLabels = {
  cashAvailable: "Cash available",
  amount: "Amount",
  from: "From",
  to: "To",
  percentOfIncome: "Percent of income",
  percentOfSpending: "Percent of spending",
  percentOfBranch: "Percent of branch",
  transactions: "Transactions",
  income: "Income",
  expense: "Expense",
  surplus: "Surplus",
  deficit: "Deficit",
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(value);

export function FlowsChartPage() {
  return (
    <section className={pageStyles.componentSection} id="flows-chart">
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
            FlowsChart
          </HeadingText>
        </div>
        <code>import {"{ FlowsChart }"} from '@teelur/budget-board-ui';</code>
      </div>
      <BodyText
        className={pageStyles.sectionCopy}
        component="p"
        m="1em 0"
        tone="muted"
      >
        A responsive, theme-aware Sankey chart for income, spending, and
        available cash. Distinct, consistent category colors identify nodes and
        labels, while quiet neutral ribbons keep the flow legible. The tooltip
        pairs an inline route with its amount and groups percentage bars and
        transaction counts in a compact, flow-type-accented popup. Outcome nodes
        stay at their natural depth so direct links do not cross deeper category
        branches. Nodes with a <code>parentName</code> keep their supplied order
        so subcategories remain grouped; charts without parented nodes retain
        automatic ribbon-crossing reduction. Hover a node to highlight its
        route to available cash.
      </BodyText>

      <ComponentDemoSection
        code={`<FlowsChart
  ariaLabel="Transaction flows"
  data={sampleData}
  formatValue={formatCurrency}
  labels={labels}
/>`}
        description="Pass prepared nodes and links, localized labels, and an amount formatter. The chart assigns stable colors to category nodes and labels, keeps ribbons neutral, and keeps direct outcome links clear of deeper category branches. Compact tooltips retain amounts, percentages, transaction counts, and progress bars."
        id="flows-chart-basic"
        title="Basic usage"
      >
        <div className={styles.chartPreview}>
          <FlowsChart
            ariaLabel="Transaction flows"
            data={sampleData}
            formatValue={formatCurrency}
            labels={labels}
          />
        </div>
      </ComponentDemoSection>

      <section
        aria-labelledby="flows-chart-api-heading"
        className={pageStyles.componentReferenceSection}
        id="flows-chart-api"
      >
        <HeadingText
          id="flows-chart-api-heading"
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
                    <code>FlowsChartData</code>
                  </td>
                  <td>Required</td>
                  <td>
                    Flow nodes, indexed links, and income and spending totals.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>labels</code>
                  </td>
                  <td>
                    <code>FlowsChartLabels</code>
                  </td>
                  <td>Required</td>
                  <td>Localized labels for the chart and tooltip.</td>
                </tr>
                <tr>
                  <td>
                    <code>formatValue</code>
                  </td>
                  <td>
                    <code>(value: number) =&gt; string</code>
                  </td>
                  <td>Required</td>
                  <td>Formats node and tooltip amounts.</td>
                </tr>
                <tr>
                  <td>
                    <code>height</code>
                  </td>
                  <td>
                    <code>number</code>
                  </td>
                  <td>
                    <code>750</code>
                  </td>
                  <td>Positive chart height in pixels.</td>
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
                    <code>"No flow data available."</code>
                  </td>
                  <td>Content shown when there are no links.</td>
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
              <code>FlowsChartData</code> contains <code>nodes</code>,{" "}
              <code>links</code>, <code>totalIncome</code>, and{" "}
              <code>totalSpending</code>. Each link connects two different node
              indexes with a positive finite value. Node and link transaction
              counts are optional non-negative integers. Nodes may include{" "}
              <code>parentName</code>; when present, their supplied order is
              preserved to keep related subcategories together.{" "}
              <code>FlowsChartLabels</code> contains localized text for the
              amount, route, income, expense, surplus, deficit, and percentage
              metrics.
            </BodyText>
          </div>
        </div>
      </section>
    </section>
  );
}
