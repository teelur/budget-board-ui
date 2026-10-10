import { useState } from "react";
import { PinInput } from "../../../src";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import demoStyles from "../../components/ComponentDemoSection/ComponentDemoSection.module.css";
import pageStyles from "../Page.module.css";
import styles from "./PinInputPage.module.css";
import { BodyText, HeadingText } from "../../../src";

export function PinInputPage() {
  const [code, setCode] = useState("");
  const [completedCode, setCompletedCode] = useState("");

  return (
    <section className={pageStyles.componentSection} id="pin-input">
      <div className={pageStyles.sectionHeading}>
        <div>
          <BodyText component="p" className={pageStyles.eyebrow}>Inputs</BodyText>
          <HeadingText level={2}>PinInput</HeadingText>
        </div>
        <code>import {"{ PinInput }"} from '@teelur/budget-board-ui';</code>
      </div>
      <BodyText component="p" className={pageStyles.sectionCopy}>
        Segmented PIN and one-time-code entry with BBUI field styling and
        Mantine keyboard behavior.
      </BodyText>

      <ComponentDemoSection
        description="Control the code value and respond when all cells are filled."
        id="pin-input-basic"
        title="Controlled code"
        code={`const [code, setCode] = useState("");

<PinInput
  ariaLabel="Verification code"
  type="number"
  length={6}
  value={code}
  onChange={setCode}
  onComplete={(value) => console.log(value)}
/>`}
      >
        <div className={styles.stack}>
          <PinInput
            ariaLabel="Verification code"
            length={6}
            onChange={setCode}
            onComplete={setCompletedCode}
            type="number"
            value={code}
          />
          <BodyText component="p" aria-live="polite" className={styles.value}>
            {completedCode
              ? `Completed code: ${completedCode}`
              : "Enter a code"}
          </BodyText>
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Mantine's masked, disabled, read-only, and sizing options are forwarded."
        id="pin-input-states"
        title="States"
        code={`<PinInput ariaLabel="Masked code" type="number" mask />
<PinInput ariaLabel="Disabled code" type="number" disabled />
<PinInput ariaLabel="Read-only code" defaultValue="2048" readOnly />`}
      >
        <div className={styles.states}>
          <div className={styles.state}>
            <BodyText component="span" className={styles.stateLabel}>Masked</BodyText>
            <PinInput ariaLabel="Masked code" length={4} mask type="number" />
          </div>
          <div className={styles.state}>
            <BodyText component="span" className={styles.stateLabel}>Disabled</BodyText>
            <PinInput
              ariaLabel="Disabled code"
              disabled
              length={4}
              type="number"
            />
          </div>
          <div className={styles.state}>
            <BodyText component="span" className={styles.stateLabel}>Read only</BodyText>
            <PinInput
              ariaLabel="Read-only code"
              defaultValue="2048"
              length={4}
              readOnly
              type="number"
            />
          </div>
          <div className={styles.state}>
            <BodyText component="span" className={styles.stateLabel}>Large cells</BodyText>
            <PinInput
              ariaLabel="Large code"
              length={4}
              size="lg"
              type="number"
            />
          </div>
        </div>
      </ComponentDemoSection>

      <section
        className={pageStyles.componentReferenceSection}
        id="pin-input-api"
      >
        <div className={demoStyles.componentDemoHeading}>
          <div>
            <HeadingText level={3}>API reference</HeadingText>
            <BodyText component="p">BBUI field styling and Mantine PinInput props.</BodyText>
          </div>
          <a
            aria-label="Link to API reference section"
            className={demoStyles.componentDemoAnchor}
            href="#pin-input-api"
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
                  <th>onChange / onComplete</th>
                  <td>
                    <code>(value: string) =&gt; void</code>
                  </td>
                  <td>called when the value changes / all cells are filled</td>
                </tr>
                <tr>
                  <th>length</th>
                  <td>
                    <code>number</code>
                  </td>
                  <td>4</td>
                </tr>
                <tr>
                  <th>type</th>
                  <td>
                    <code>alphanumeric | number | RegExp</code>
                  </td>
                  <td>alphanumeric</td>
                </tr>
                <tr>
                  <th>mask</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>false</td>
                </tr>
                <tr>
                  <th>ariaLabel</th>
                  <td>
                    <code>string</code>
                  </td>
                  <td>accessible name applied to each cell</td>
                </tr>
                <tr>
                  <th>autoFocus / manageFocus</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>false / true</td>
                </tr>
                <tr>
                  <th>oneTimeCode</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>true; enables one-time-code autocomplete</td>
                </tr>
                <tr>
                  <th>disabled / readOnly</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>false</td>
                </tr>
                <tr>
                  <th>size / gap / radius</th>
                  <td>
                    <code>MantineSize / MantineSpacing / MantineRadius</code>
                  </td>
                  <td>sm / md / theme default</td>
                </tr>
                <tr>
                  <th>className / classNames / styles</th>
                  <td>
                    <code>Mantine PinInput styles API</code>
                  </td>
                  <td>consumer classes and styles are preserved</td>
                </tr>
                <tr>
                  <th>other props</th>
                  <td>
                    <code>PinInputProps</code>
                  </td>
                  <td>Mantine props and root div attributes are forwarded</td>
                </tr>
                <tr>
                  <th>field background / focus</th>
                  <td>
                    <code>surfaceInput / focusRing</code>
                  </td>
                  <td>theme-aware fill, border, and keyboard focus ring</td>
                </tr>
              </tbody>
            </table>
          </div>
          <pre className={pageStyles.codeBlock}>
            <code>{`<PinInput
  ariaLabel="Verification code"
  type="number"
  length={6}
  value={code}
  onChange={setCode}
/>`}</code>
          </pre>
        </div>
      </section>
    </section>
  );
}
