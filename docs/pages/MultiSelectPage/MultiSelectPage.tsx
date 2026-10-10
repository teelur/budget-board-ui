import { MultiSelect } from "../../../src";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import demoStyles from "../../components/ComponentDemoSection/ComponentDemoSection.module.css";
import pageStyles from "../Page.module.css";
import { BodyText, HeadingText } from "../../../src";

const accounts = [
  { value: "checking", label: "Checking" },
  { value: "savings", label: "Savings" },
  { value: "investment", label: "Investment" },
];

export function MultiSelectPage() {
  return (
    <section className={pageStyles.componentSection} id="multi-select">
      <div className={pageStyles.sectionHeading}>
        <div>
          <BodyText component="p" className={pageStyles.eyebrow} tone="muted" ff="var(--bb-font-data)" fz="0.68rem">Inputs</BodyText>
          <HeadingText level={2} tone="heading" lh={1.5}>MultiSelect</HeadingText>
        </div>
        <code>import {"{ MultiSelect }"} from '@teelur/budget-board-ui';</code>
      </div>
      <BodyText component="p" className={pageStyles.sectionCopy} tone="muted" m="1em 0">
        Select several options, with optional query-based option creation.
      </BodyText>

      <ComponentDemoSection
        description="Search for and select multiple accounts."
        id="multi-select-basic"
        title="Basic usage"
        code={`<MultiSelect
  data={[
    { value: "checking", label: "Checking" },
    { value: "savings", label: "Savings" },
  ]}
  label="Accounts"
  searchable
  clearable
/>`}
      >
        <div style={{ maxWidth: "30rem", width: "100%" }}>
          <MultiSelect
            clearable
            data={accounts}
            label="Accounts"
            placeholder="Select accounts"
            searchable
          />
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Type a new label to add it as a selected value."
        id="multi-select-creatable"
        title="Creatable options"
        code={`<MultiSelect
  creatable
  data={["Home", "Food"]}
  getCreateLabel={(query) => "Add " + query}
  label="Tags"
  onCreate={(query) => ({ value: query, label: query })}
/>`}
      >
        <div style={{ maxWidth: "30rem", width: "100%" }}>
          <MultiSelect
            creatable
            data={["Home", "Food"]}
            getCreateLabel={(query) => `Add "${query}"`}
            label="Tags"
            onCreate={(query) => ({ value: query, label: query })}
            placeholder="Search or add a tag"
          />
        </div>
      </ComponentDemoSection>

      <section
        className={pageStyles.componentReferenceSection}
        id="multi-select-api"
      >
        <div className={demoStyles.componentDemoHeading}>
          <div>
            <HeadingText level={3} tone="heading" lh={1.5}>API reference</HeadingText>
            <BodyText component="p" tone="secondary" fz="0.82rem" lh={1.55} m="0.45rem 0 0">BBUI styling with Mantine MultiSelect props and behavior.</BodyText>
          </div>
          <a
            aria-label="Link to API reference section"
            className={demoStyles.componentDemoAnchor}
            href="#multi-select-api"
          >
            #
          </a>
        </div>
        <div className={pageStyles.referenceGrid}>
          <div>
            <table>
              <tbody>
                <tr>
                  <th>data</th>
                  <td>
                    <code>ComboboxData</code>
                  </td>
                  <td>strings, labeled options, or grouped options</td>
                </tr>
                <tr>
                  <th>value / defaultValue</th>
                  <td>
                    <code>string[]</code>
                  </td>
                  <td>controlled / uncontrolled selected values</td>
                </tr>
                <tr>
                  <th>onChange</th>
                  <td>
                    <code>(values: string[]) =&gt; void</code>
                  </td>
                  <td>called when selected values change</td>
                </tr>
                <tr>
                  <th>creatable</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>offers the non-matching search query as an option</td>
                </tr>
                <tr>
                  <th>getCreateLabel</th>
                  <td>
                    <code>(query: string) =&gt; ReactNode</code>
                  </td>
                  <td>custom content for the create option</td>
                </tr>
                <tr>
                  <th>onCreate</th>
                  <td>
                    <code>(query: string) =&gt; string | item | void</code>
                  </td>
                  <td>returns the created value and optional display label</td>
                </tr>
                <tr>
                  <th>searchable / clearable / maxValues</th>
                  <td>
                    <code>boolean / number</code>
                  </td>
                  <td>search, clear, and limit selection</td>
                </tr>
                <tr>
                  <th>className / classNames / styles / comboboxProps</th>
                  <td>
                    <code>Mantine styles API</code>
                  </td>
                  <td>consumer classes and nested dropdown styles are preserved</td>
                </tr>
              </tbody>
            </table>
          </div>
          <pre className={pageStyles.codeBlock}>
            <code>{`<MultiSelect
  creatable
  data={["Home", "Food"]}
  getCreateLabel={(query) => "Add " + query}
  onCreate={(query) => ({ value: query, label: query })}
/>`}</code>
          </pre>
        </div>
      </section>
    </section>
  );
}