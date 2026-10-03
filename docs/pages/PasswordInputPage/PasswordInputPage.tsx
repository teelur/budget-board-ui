import { useState } from "react";
import { PasswordInput } from "../../../src";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import demoStyles from "../../components/ComponentDemoSection/ComponentDemoSection.module.css";
import pageStyles from "../Page.module.css";
import styles from "./PasswordInputPage.module.css";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export function PasswordInputPage() {
  const [password, setPassword] = useState("");

  return (
    <section className={pageStyles.componentSection} id="password-input">
      <div className={pageStyles.sectionHeading}>
        <div>
          <p className={pageStyles.eyebrow}>Inputs</p>
          <h2>PasswordInput</h2>
        </div>
        <code>
          import {"{ PasswordInput }"} from '@teelur/budget-board-ui';
        </code>
      </div>
      <p className={pageStyles.sectionCopy}>
        Mantine password input behavior and visibility toggle with BBUI field
        styling.
      </p>

      <ComponentDemoSection
        description="The visibility control preserves Mantine's reveal/hide behavior and can be made keyboard-focusable."
        id="password-input-basic"
        title="Basic usage"
        code={`<PasswordInput
  label="Account password"
  autoComplete="current-password"
  visibilityToggleFocusable
/>`}
      >
        <div className={styles.stack}>
          <PasswordInput
            autoComplete="current-password"
            label="Account password"
            visibilityToggleFocusable
          />
          <PasswordInput
            description="Use at least 12 characters."
            label="New password"
            autoComplete="new-password"
            placeholder="Create a password"
            visibilityToggleFocusable
          />
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="The password field keeps the same neutral fill over page and elevated card surfaces."
        id="password-input-surfaces"
        title="Surface consistency"
        code={`<PasswordInput label="Page surface" />
<PasswordInput label="Card surface" />`}
      >
        <div className={styles.surfaceSamples}>
          <div className={`${styles.surfaceSample} ${styles.pageSurface}`}>
            <span>Page surface</span>
            <PasswordInput aria-label="Page password" />
          </div>
          <div className={`${styles.surfaceSample} ${styles.cardSurface}`}>
            <span>Elevated surface</span>
            <PasswordInput aria-label="Elevated surface password" />
          </div>
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Control the input value and visibility independently, or use Mantine's default uncontrolled behavior."
        id="password-input-controlled"
        title="Controlled state"
        code={`const [password, setPassword] = useState("");
const [visible, setVisible] = useState(false);

<PasswordInput
  label="Password"
  value={password}
  onChange={(event) => setPassword(event.currentTarget.value)}
  visible={visible}
  onVisibilityChange={setVisible}
/>`}
      >
        <div className={styles.stack}>
          <PasswordInput
            label="Controlled password"
            onChange={(event) => setPassword(event.currentTarget.value)}
            value={password}
          />
          <PasswordInput
            aria-label="Uncontrolled password"
            defaultValue="sample-password"
          />
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Mantine sizes and disabled or read-only states remain available."
        id="password-input-sizes-states"
        title="Sizes & states"
        code={`<PasswordInput label="Small" size="sm" />
<PasswordInput label="Read only" readOnly value="Fixed value" />
<PasswordInput label="Disabled" disabled />`}
      >
        <div className={styles.stack}>
          {sizes.map((size) => (
            <PasswordInput
              aria-label={`${size} password`}
              key={size}
              placeholder={size}
              size={size}
            />
          ))}
          <PasswordInput
            aria-label="Read only password"
            readOnly
            value="Fixed value"
          />
          <PasswordInput aria-label="Disabled password" disabled />
        </div>
      </ComponentDemoSection>

      <section
        className={pageStyles.componentReferenceSection}
        id="password-input-api"
      >
        <div className={demoStyles.componentDemoHeading}>
          <div>
            <h3>API reference</h3>
            <p>BBUI styling and Mantine PasswordInput props.</p>
          </div>
          <a
            aria-label="Link to API reference section"
            className={demoStyles.componentDemoAnchor}
            href="#password-input-api"
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
                  <th>visible / defaultVisible</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>false</td>
                </tr>
                <tr>
                  <th>onVisibilityChange</th>
                  <td>
                    <code>(visible: boolean) =&gt; void</code>
                  </td>
                  <td>called when visibility changes</td>
                </tr>
                <tr>
                  <th>visibilityToggleFocusable</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>false</td>
                </tr>
                <tr>
                  <th>disabled / readOnly</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>false</td>
                </tr>
                <tr>
                  <th>className / classNames / styles</th>
                  <td>
                    <code>Mantine PasswordInput styles API</code>
                  </td>
                  <td>consumer classes and styles are preserved</td>
                </tr>
                <tr>
                  <th>other props</th>
                  <td>
                    <code>PasswordInputProps</code>
                  </td>
                  <td>
                    Mantine props and native input attributes are forwarded
                  </td>
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
            <code>{`<PasswordInput
  label="Account password"
  autoComplete="current-password"
  visibilityToggleFocusable
/>`}</code>
          </pre>
        </div>
      </section>
    </section>
  );
}
