import { TextInput } from "../../../src";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import demoStyles from "../../components/ComponentDemoSection/ComponentDemoSection.module.css";
import pageStyles from "../Page.module.css";
import styles from "./TextInputPage.module.css";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export function TextInputPage() {
  return (
    <section className={pageStyles.componentSection} id="text-input">
      <div className={pageStyles.sectionHeading}>
        <div>
          <p className={pageStyles.eyebrow}>Inputs</p>
          <h2>TextInput</h2>
        </div>
        <code>import {"{ TextInput }"} from '@teelur/budget-board-ui';</code>
      </div>
      <p className={pageStyles.sectionCopy}>
        Mantine text input behavior with the same BBUI surface and focus styling
        as NumberInput.
      </p>

      <ComponentDemoSection
        description="Use native text input types with Mantine labels, descriptions, and placeholders."
        id="text-input-basic"
        title="Basic usage"
        code={`<TextInput
  label="Email address"
  description="Used for account notifications."
  type="email"
  placeholder="name@example.com"
  autoComplete="email"
/>`}
      >
        <div className={styles.stack}>
          <TextInput
            autoComplete="email"
            description="Used for account notifications."
            label="Email address"
            placeholder="name@example.com"
            type="email"
          />
          <TextInput
            aria-label="Search transactions"
            placeholder="Merchant or memo"
            type="search"
          />
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="The field keeps the same neutral fill on page and elevated card surfaces."
        id="text-input-surfaces"
        title="Surface consistency"
        code={`<TextInput label="Page surface" placeholder="Type here" />
<TextInput label="Card surface" placeholder="Type here" />`}
      >
        <div className={styles.surfaceSamples}>
          <div className={`${styles.surfaceSample} ${styles.pageSurface}`}>
            <span>Page surface</span>
            <TextInput aria-label="Page surface text" placeholder="Type here" />
          </div>
          <div className={`${styles.surfaceSample} ${styles.cardSurface}`}>
            <span>Elevated surface</span>
            <TextInput
              aria-label="Elevated surface text"
              placeholder="Type here"
            />
          </div>
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Mantine sizes and native disabled or read-only states remain available."
        id="text-input-sizes-states"
        title="Sizes & states"
        code={`<TextInput label="Small" size="sm" placeholder="Small input" />
<TextInput label="Read only" readOnly value="Fixed value" />
<TextInput label="Disabled" disabled placeholder="Unavailable" />`}
      >
        <div className={styles.sizeSamples}>
          {sizes.map((size) => (
            <TextInput
              aria-label={`${size} text`}
              key={size}
              placeholder={`${size} input`}
              size={size}
            />
          ))}
        </div>
        <div className={styles.stack}>
          <TextInput aria-label="Read only text" readOnly value="Fixed value" />
          <TextInput
            aria-label="Disabled text"
            disabled
            placeholder="Unavailable"
          />
        </div>
      </ComponentDemoSection>

      <section
        className={pageStyles.componentReferenceSection}
        id="text-input-api"
      >
        <div className={demoStyles.componentDemoHeading}>
          <div>
            <h3>API reference</h3>
            <p>BBUI styling with Mantine TextInput props.</p>
          </div>
          <a
            aria-label="Link to API reference section"
            className={demoStyles.componentDemoAnchor}
            href="#text-input-api"
          >
            #
          </a>
        </div>
        <div className={pageStyles.referenceGrid}>
          <div>
            <table>
              <tbody>
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
                    <code>ChangeEventHandler&lt;HTMLInputElement&gt;</code>
                  </td>
                  <td>native input change event</td>
                </tr>
                <tr>
                  <th>type</th>
                  <td>
                    <code>HTMLInputTypeAttribute</code>
                  </td>
                  <td>text</td>
                </tr>
                <tr>
                  <th>size</th>
                  <td>
                    <code>xs | sm | md | lg | xl</code>
                  </td>
                  <td>Mantine default: sm</td>
                </tr>
                <tr>
                  <th>disabled / readOnly</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>false</td>
                </tr>
                <tr>
                  <th>label / description / error</th>
                  <td>
                    <code>ReactNode</code>
                  </td>
                  <td>optional Mantine input content</td>
                </tr>
                <tr>
                  <th>className / classNames / styles</th>
                  <td>
                    <code>Mantine TextInput styles API</code>
                  </td>
                  <td>consumer classes and styles are preserved</td>
                </tr>
                <tr>
                  <th>other props</th>
                  <td>
                    <code>TextInputProps</code>
                  </td>
                  <td>Mantine props and native input attributes</td>
                </tr>
                <tr>
                  <th>field background</th>
                  <td>
                    <code>surfaceInput</code>
                  </td>
                  <td>theme-aware; independent of the parent surface</td>
                </tr>
                <tr>
                  <th>focus treatment</th>
                  <td>
                    <code>focusRing</code>
                  </td>
                  <td>BBUI focus border and keyboard ring</td>
                </tr>
              </tbody>
            </table>
          </div>
          <pre className={pageStyles.codeBlock}>
            <code>{`<TextInput
  label="Email address"
  type="email"
  autoComplete="email"
  placeholder="name@example.com"
/>`}</code>
          </pre>
        </div>
      </section>
    </section>
  );
}
