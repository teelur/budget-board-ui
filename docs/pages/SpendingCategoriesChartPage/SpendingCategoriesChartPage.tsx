import { useState } from "react";
import {
  BodyText,
  Checkbox,
  HeadingText,
  SpendingCategoriesChart,
} from "../../../src";
import type { SpendingCategoryChartData } from "../../../src";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import pageStyles from "../Page.module.css";
import styles from "./SpendingCategoriesChartPage.module.css";

const sampleCategories: SpendingCategoryChartData[] = [
  {
    name: "Home",
    value: 1520,
    subcategories: [
      { name: "Rent", value: 1350 },
      { name: "Utilities", value: 170 },
    ],
  },
  {
    name: "Food",
    value: 660,
    subcategories: [
      { name: "Groceries", value: 480 },
      { name: "Dining", value: 180 },
    ],
  },
  {
    name: "Transport",
    value: 320,
    subcategories: [
      { name: "Transit", value: 200 },
      { name: "Fuel", value: 120 },
    ],
  },
  {
    name: "Health",
    value: 180,
    subcategories: [
      { name: "Pharmacy", value: 100 },
      { name: "Care", value: 80 },
    ],
  },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  }).format(value);

export function SpendingCategoriesChartPage() {
  const [showSubcategories, setShowSubcategories] = useState(true);
  const playgroundCode = `<SpendingCategoriesChart
  ariaLabel="Spending by category"
  data={sampleCategories}
  formatValue={formatCurrency}
  showSubcategories={${showSubcategories}}
/>`;

  return (
    <section className={pageStyles.componentSection} id="spending-categories-chart">
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
            SpendingCategoriesChart
          </HeadingText>
        </div>
        <code>
          import {"{ SpendingCategoriesChart }"} from
          '@teelur/budget-board-ui';
        </code>
      </div>
      <BodyText component="p" className={pageStyles.sectionCopy} tone="muted" m="1em 0">
        A responsive, theme-aware spending donut with nested category rings,
        a centered total, hover and keyboard details, and persistent labels
        beside each slice with a single angled leader and a short horizontal
        tail on wide layouts. Colored slices use translucent fills and
        full-strength outlines, with the same treatment on compact-layout
        legend swatches. The rings animate on initial render and when the data
        changes, unless the user prefers reduced motion. The component only
        renders the supplied data; callers own transaction aggregation,
        currency formatting, translations, and the subcategory control.
      </BodyText>

      <ComponentDemoSection
        code={`<SpendingCategoriesChart
  ariaLabel="Spending by category"
  data={sampleCategories}
  formatValue={formatCurrency}
/>`}
        description="Subcategory values should add up to their parent category. Category and subcategory slices use a 40%-opaque fill with a full-strength colored outline. Parent categories use the shared 10-color BBUI graph palette; child segments use up to five tones of the parent color before cycling. Caller colors override these defaults."
        id="spending-categories-chart-basic"
        title="Basic usage"
      >
        <div className={styles.chartPreview}>
          <SpendingCategoriesChart
            ariaLabel="Spending by category"
            data={sampleCategories}
            formatValue={formatCurrency}
          />
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        code={`<SpendingCategoriesChart
  ariaLabel="Spending by category"
  data={sampleCategories}
  emptyMessage="Select a month to see spending."
  formatValue={formatCurrency}
  isLoading
/>`}
        description="Loading and empty states are provided so the chart can fit naturally into asynchronous data views."
        id="spending-categories-chart-states"
        title="Loading and empty states"
      >
        <div className={styles.stateGrid}>
          <div className={styles.chartPreview}>
            <SpendingCategoriesChart
              ariaLabel="Loading spending by category"
              data={sampleCategories}
              formatValue={formatCurrency}
              isLoading
            />
          </div>
          <div className={styles.chartPreview}>
            <SpendingCategoriesChart
              ariaLabel="Spending by category"
              data={[]}
              emptyMessage="Select a month to see spending."
              formatValue={formatCurrency}
            />
          </div>
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        code={playgroundCode}
        description="Toggle the controlled subcategory mode. The same data and callback work in both ring layouts."
        id="spending-categories-chart-playground"
        title="Playground"
      >
        <div className={styles.playground}>
          <div className={styles.playgroundControls}>
            <Checkbox
              checked={showSubcategories}
              label="Show subcategories"
              onChange={(event) =>
                setShowSubcategories(event.currentTarget.checked)
              }
            />
          </div>
          <div className={styles.chartPreview}>
            <SpendingCategoriesChart
              ariaLabel="Spending by category"
              data={sampleCategories}
              formatValue={formatCurrency}
              showSubcategories={showSubcategories}
            />
          </div>
        </div>
      </ComponentDemoSection>

      <section
        aria-labelledby="spending-categories-chart-api-heading"
        className={pageStyles.componentReferenceSection}
        id="spending-categories-chart-api"
      >
        <HeadingText
          id="spending-categories-chart-api-heading"
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
                    <code>SpendingCategoryChartData[]</code>
                  </td>
                  <td>Required</td>
                  <td>
                    Category names, non-negative values, optional colors, and
                    optional subcategories. When provided, child values must
                    sum to the parent value.
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
                  <td>
                    Formats amounts for the center total and detail tooltip.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>showSubcategories</code>
                  </td>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>
                    <code>true</code>
                  </td>
                  <td>
                    Shows the category and subcategory rings when true;
                    otherwise shows one category ring.
                  </td>
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
                    <code>totalLabel</code>
                  </td>
                  <td>
                    <code>ReactNode</code>
                  </td>
                  <td>
                    <code>"Total spending"</code>
                  </td>
                  <td>Label displayed above the formatted center total.</td>
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
                  <td>Content shown when the data has no positive total.</td>
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
              <code>SpendingCategoryChartData</code> contains{" "}
              <code>name: string</code>, <code>value: number</code>, optional{" "}
              <code>color: string</code>, and optional{" "}
              <code>subcategories: SpendingSubcategoryChartData[]</code>.
              Subcategories use the same name, value, and optional color fields.
              Values must be finite and non-negative. A category with no
              subcategories is represented by one outer-ring segment when
              subcategories are enabled.
            </BodyText>
          </div>
        </div>
      </section>
    </section>
  );
}
