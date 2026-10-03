import { Autocomplete } from "../../../src";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import demoStyles from "../../components/ComponentDemoSection/ComponentDemoSection.module.css";
import pageStyles from "../Page.module.css";

const merchants = [
  "Cedar Market",
  "Corner Coffee",
  "Greenway Grocer",
  "Northside Books",
  "Willow Pharmacy",
];

export function AutocompletePage() {
  return (
    <section className={pageStyles.componentSection} id="autocomplete">
      <div className={pageStyles.sectionHeading}>
        <div>
          <p className={pageStyles.eyebrow}>Inputs</p>
          <h2>Autocomplete</h2>
        </div>
        <code>import {"{ Autocomplete }"} from '@teelur/budget-board-ui';</code>
      </div>
      <p className={pageStyles.sectionCopy}>
        Mantine Autocomplete behavior with BBUI input and dropdown styling.
      </p>

      <ComponentDemoSection
        description="Type to filter the available merchant suggestions."
        id="autocomplete-basic"
        title="Basic usage"
        code={`<Autocomplete
  data={[
    "Cedar Market",
    "Corner Coffee",
    "Greenway Grocer",
    "Northside Books",
    "Willow Pharmacy",
  ]}
  label="Merchant"
  placeholder="Search merchants"
/>`}
      >
        <div style={{ maxWidth: "32rem", width: "100%" }}>
          <Autocomplete
            data={merchants}
            label="Merchant"
            placeholder="Search merchants"
          />
        </div>
      </ComponentDemoSection>

      <section
        className={pageStyles.componentReferenceSection}
        id="autocomplete-api"
      >
        <div className={demoStyles.componentDemoHeading}>
          <div>
            <h3>API reference</h3>
            <p>BBUI styling with Mantine Autocomplete props and behavior.</p>
          </div>
          <a
            aria-label="Link to API reference section"
            className={demoStyles.componentDemoAnchor}
            href="#autocomplete-api"
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
                    <code>ComboboxGenericData</code>
                  </td>
                  <td>suggestions; strings or labeled options</td>
                </tr>
                <tr>
                  <th>value / defaultValue</th>
                  <td>
                    <code>string</code>
                  </td>
                  <td>controlled / uncontrolled value</td>
                </tr>
                <tr>
                  <th>onChange</th>
                  <td>
                    <code>(value: string) =&gt; void</code>
                  </td>
                  <td>called when the input value changes</td>
                </tr>
                <tr>
                  <th>filter / limit</th>
                  <td>
                    <code>filter function / number</code>
                  </td>
                  <td>custom filtering and maximum visible options</td>
                </tr>
                <tr>
                  <th>disabled / readOnly</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>false</td>
                </tr>
                <tr>
                  <th>comboboxProps</th>
                  <td>
                    <code>ComboboxProps</code>
                  </td>
                  <td>dropdown positioning and Combobox customization</td>
                </tr>
                <tr>
                  <th>className / classNames / styles</th>
                  <td>
                    <code>Mantine Autocomplete styles API</code>
                  </td>
                  <td>consumer classes and styles are preserved</td>
                </tr>
                <tr>
                  <th>other props</th>
                  <td>
                    <code>AutocompleteProps</code>
                  </td>
                  <td>Mantine props and native input attributes</td>
                </tr>
                <tr>
                  <th>field and dropdown surfaces</th>
                  <td>
                    <code>surfaceInput / surfaceElevated</code>
                  </td>
                  <td>theme-aware BBUI colors</td>
                </tr>
              </tbody>
            </table>
          </div>
          <pre className={pageStyles.codeBlock}>
            <code>{`<Autocomplete
  data={["Cedar Market", "Corner Coffee"]}
  label="Merchant"
  placeholder="Search merchants"
/>`}</code>
          </pre>
        </div>
      </section>
    </section>
  );
}
