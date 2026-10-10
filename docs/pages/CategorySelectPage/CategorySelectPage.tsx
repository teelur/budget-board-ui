import { useState } from "react";
import { CategorySelect } from "../../../src";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import demoStyles from "../../components/ComponentDemoSection/ComponentDemoSection.module.css";
import pageStyles from "../Page.module.css";
import { BodyText, HeadingText } from "../../../src";

const categories = [
  {
    value: "Home",
    label: "Home",
    children: [
      { value: "Utilities", label: "Utilities" },
      { value: "Maintenance", label: "Maintenance" },
    ],
  },
  {
    value: "Food",
    label: "Food",
    children: [{ value: "Groceries", label: "Groceries" }],
  },
  { value: "Transport", label: "Transport" },
];

export function CategorySelectPage() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <section className={pageStyles.componentSection} id="category-select">
      <div className={pageStyles.sectionHeading}>
        <div>
          <BodyText component="p" className={pageStyles.eyebrow}>Inputs</BodyText>
          <HeadingText level={2}>CategorySelect</HeadingText>
        </div>
        <code>
          import {"{ CategorySelect }"} from '@teelur/budget-board-ui';
        </code>
      </div>
      <BodyText component="p" className={pageStyles.sectionCopy}>
        Search and select from a hierarchical list of categories.
      </BodyText>

      <ComponentDemoSection
        description="Parent labels use semibold primary text; child labels use secondary text with a subtle indent. All categories remain selectable."
        id="category-select-basic"
        title="Basic usage"
        code={`const [value, setValue] = useState<string | null>(null);

<CategorySelect
  data={categories}
  label="Category"
  onChange={setValue}
  value={value}
/>`}
      >
        <div style={{ maxWidth: "30rem", width: "100%" }}>
          <CategorySelect
            data={categories}
            label="Category"
            onChange={setValue}
            placeholder="Select a category"
            value={value}
          />
        </div>
      </ComponentDemoSection>

      <section
        className={pageStyles.componentReferenceSection}
        id="category-select-api"
      >
        <div className={demoStyles.componentDemoHeading}>
          <div>
            <HeadingText level={3}>API reference</HeadingText>
            <BodyText component="p">Hierarchical category options with searchable selection.</BodyText>
          </div>
          <a
            aria-label="Link to API reference section"
            className={demoStyles.componentDemoAnchor}
            href="#category-select-api"
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
                    provide one: flat category records with <code>value</code>
                    and <code>parent</code>, or nested options with{" "}
                    <code>value</code>, optional <code>label</code> (defaults to{" "}
                    <code>value</code>), and optional <code>children</code>
                  </td>
                </tr>
                <tr>
                  <th>value</th>
                  <td>
                    <code>string | null</code>
                  </td>
                  <td>currently selected category</td>
                </tr>
                <tr>
                  <th>onChange</th>
                  <td>
                    <code>(value: string) =&gt; void</code>
                  </td>
                  <td>selected value, or an empty string when toggled off</td>
                </tr>
                <tr>
                  <th>onClick</th>
                  <td>
                    <code>MouseEventHandler&lt;HTMLButtonElement&gt;</code>
                  </td>
                  <td>
                    trigger click handler, called before the dropdown toggles
                  </td>
                </tr>
                <tr>
                  <th>readOnly</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>prevents the category dropdown from opening</td>
                </tr>
                <tr>
                  <th>placeholder / searchPlaceholder</th>
                  <td>
                    <code>string</code>
                  </td>
                  <td>trigger and search input text</td>
                </tr>
                <tr>
                  <th>nothingFoundMessage</th>
                  <td>
                    <code>ReactNode</code>
                  </td>
                  <td>content shown when the search has no matches</td>
                </tr>
                <tr>
                  <th>parent and child styling</th>
                  <td>
                    <code>
                      semibold primary parent / inset secondary child label
                    </code>
                  </td>
                  <td>all options remain selectable; child labels are inset</td>
                </tr>
                <tr>
                  <th>withinPortal</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>false</td>
                </tr>
                <tr>
                  <th>includeUncategorized</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>false; appends an uncategorized option</td>
                </tr>
                <tr>
                  <th>comboboxProps</th>
                  <td>
                    <code>ComboboxProps</code>
                  </td>
                  <td>dropdown and option customization</td>
                </tr>
              </tbody>
            </table>
          </div>
          <pre className={pageStyles.codeBlock}>
            <code>{`<CategorySelect
  data={[
    {
      value: "Home",
      label: "Home",
      children: [{ value: "Utilities", label: "Utilities" }],
    },
  ]}
  value={value}
  onChange={setValue}
/>`}</code>
          </pre>
        </div>
      </section>
    </section>
  );
}
