import { Select } from "../../../src";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import demoStyles from "../../components/ComponentDemoSection/ComponentDemoSection.module.css";
import pageStyles from "../Page.module.css";

const accountTypes = [
  { value: "checking", label: "Checking" },
  { value: "savings", label: "Savings" },
  { value: "investment", label: "Investment" },
];

export function SelectPage() {
  return (
    <section className={pageStyles.componentSection} id="select">
      <div className={pageStyles.sectionHeading}>
        <div>
          <p className={pageStyles.eyebrow}>Inputs</p>
          <h2>Select</h2>
        </div>
        <code>import {"{ Select }"} from '@teelur/budget-board-ui';</code>
      </div>
      <p className={pageStyles.sectionCopy}>
        Mantine Select behavior with BBUI field, dropdown, and option styling.
      </p>

      <ComponentDemoSection
        description="Search or choose one item from a list."
        id="select-basic"
        title="Basic usage"
        code={`<Select
  data={[
    { value: "checking", label: "Checking" },
    { value: "savings", label: "Savings" },
    { value: "investment", label: "Investment" },
  ]}
  label="Account type"
  searchable
  clearable
  placeholder="Choose an account type"
/>`}
      >
        <div style={{ maxWidth: "30rem", width: "100%" }}>
          <Select
            clearable
            data={accountTypes}
            label="Account type"
            placeholder="Choose an account type"
            searchable
          />
        </div>
      </ComponentDemoSection>

      <section className={pageStyles.componentReferenceSection} id="select-api">
        <div className={demoStyles.componentDemoHeading}>
          <div>
            <h3>API reference</h3>
            <p>BBUI styling with Mantine Select props and behavior.</p>
          </div>
          <a
            aria-label="Link to API reference section"
            className={demoStyles.componentDemoAnchor}
            href="#select-api"
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
                    <code>string | null</code>
                  </td>
                  <td>controlled / uncontrolled selected value</td>
                </tr>
                <tr>
                  <th>onChange</th>
                  <td>
                    <code>(value: string | null) =&gt; void</code>
                  </td>
                  <td>called when the selected value changes</td>
                </tr>
                <tr>
                  <th>searchable / clearable / disabled</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>Mantine selection and input states</td>
                </tr>
                <tr>
                  <th>comboboxProps</th>
                  <td>
                    <code>ComboboxProps</code>
                  </td>
                  <td>dropdown positioning and nested style overrides</td>
                </tr>
                <tr>
                  <th>className / classNames / styles</th>
                  <td>
                    <code>Mantine Select styles API</code>
                  </td>
                  <td>consumer classes and styles are preserved</td>
                </tr>
                <tr>
                  <th>field and dropdown surfaces</th>
                  <td>
                    <code>surfaceInput / surfaceElevated</code>
                  </td>
                  <td>semantic BBUI colors in light and dark modes</td>
                </tr>
              </tbody>
            </table>
          </div>
          <pre className={pageStyles.codeBlock}>
            <code>{`<Select
  data={["Checking", "Savings"]}
  label="Account type"
  searchable
/>`}</code>
          </pre>
        </div>
      </section>
    </section>
  );
}