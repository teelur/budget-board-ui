import { useState } from "react";
import {
  BodyText,
  CategoryMultiSelect,
  HeadingText,
} from "../../../src";
import type { CategorySelectCategory } from "../../../src";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import demoStyles from "../../components/ComponentDemoSection/ComponentDemoSection.module.css";
import pageStyles from "../Page.module.css";

const categories: CategorySelectCategory[] = [
  { value: "Utilities", parent: "Home" },
  { value: "Maintenance", parent: "Home" },
  { value: "Groceries", parent: "Food" },
  { value: "Home", parent: "" },
  { value: "Food", parent: "" },
  { value: "Transport", parent: "" },
];

export function CategoryMultiSelectPage() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <section
      className={pageStyles.componentSection}
      id="category-multi-select"
    >
      <div className={pageStyles.sectionHeading}>
        <div>
          <BodyText
            component="p"
            className={pageStyles.eyebrow}
            tone="muted"
            ff="var(--bb-font-data)"
            fz="0.68rem"
          >
            Inputs
          </BodyText>
          <HeadingText level={2} tone="heading" lh={1.5}>
            CategoryMultiSelect
          </HeadingText>
        </div>
        <code>
          import {"{ CategoryMultiSelect }"} from '@teelur/budget-board-ui';
        </code>
      </div>
      <BodyText
        component="p"
        className={pageStyles.sectionCopy}
        tone="muted"
        m="1em 0"
      >
        Search and select multiple values from a hierarchical category list.
      </BodyText>

      <ComponentDemoSection
        description="Parent and child categories follow CategorySelect ordering and styling. The uncategorized label can be localized by the caller."
        id="category-multi-select-basic"
        title="Basic usage"
        code={`const [value, setValue] = useState<string[]>([]);

<CategoryMultiSelect
  categories={categories}
  includeUncategorized
  label="Categories"
  onChange={setValue}
  value={value}
/>`}
      >
        <div style={{ maxWidth: "30rem", width: "100%" }}>
          <CategoryMultiSelect
            aria-label="Categories"
            categories={categories}
            includeUncategorized
            onChange={setValue}
            value={value}
          />
        </div>
      </ComponentDemoSection>

      <section
        className={pageStyles.componentReferenceSection}
        id="category-multi-select-api"
      >
        <div className={demoStyles.componentDemoHeading}>
          <div>
            <HeadingText level={3} tone="heading" lh={1.5}>
              API reference
            </HeadingText>
            <BodyText
              component="p"
              tone="secondary"
              fz="0.82rem"
              lh={1.55}
              m="0.45rem 0 0"
            >
              Hierarchical category options with multiple selection.
            </BodyText>
          </div>
          <a
            aria-label="Link to API reference section"
            className={demoStyles.componentDemoAnchor}
            href="#category-multi-select-api"
          >
            #
          </a>
        </div>
        <div className={pageStyles.referenceGrid}>
          <div>
            <table>
              <tbody>
                <tr>
                  <th>categories / data</th>
                  <td>
                    <code>
                      CategorySelectCategory[] / CategorySelectOption[]
                    </code>
                  </td>
                  <td>
                    provide one: flat records with <code>value</code> and{" "}
                    <code>parent</code>, or nested options with optional{" "}
                    <code>label</code> and <code>children</code>
                  </td>
                </tr>
                <tr>
                  <th>value / defaultValue</th>
                  <td>
                    <code>string[]</code>
                  </td>
                  <td>controlled / uncontrolled selected categories</td>
                </tr>
                <tr>
                  <th>onChange</th>
                  <td>
                    <code>(values: string[]) =&gt; void</code>
                  </td>
                  <td>called when the selection changes</td>
                </tr>
                <tr>
                  <th>includeUncategorized</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>false; appends the uncategorized option</td>
                </tr>
                <tr>
                  <th>uncategorizedLabel</th>
                  <td>
                    <code>string</code>
                  </td>
                  <td>display label for the uncategorized option</td>
                </tr>
                <tr>
                  <th>searchable / clearable / withinPortal</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>search defaults on; portal defaults off</td>
                </tr>
              </tbody>
            </table>
          </div>
          <pre className={pageStyles.codeBlock}>
            <code>{`<CategoryMultiSelect
  categories={categories}
  includeUncategorized
  onChange={setValue}
  value={value}
/>`}</code>
          </pre>
        </div>
      </section>
    </section>
  );
}
