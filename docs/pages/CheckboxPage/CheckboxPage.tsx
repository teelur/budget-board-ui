import { useState } from "react";
import { Checkbox } from "../../../src";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import demoStyles from "../../components/ComponentDemoSection/ComponentDemoSection.module.css";
import pageStyles from "../Page.module.css";
import styles from "./CheckboxPage.module.css";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export function CheckboxPage() {
  const [controlledChecked, setControlledChecked] = useState(false);
  const [playgroundChecked, setPlaygroundChecked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isIndeterminate, setIsIndeterminate] = useState(false);
  const [labelPosition, setLabelPosition] = useState<"left" | "right">("right");

  const playgroundProps = [
    'label="Include pending transactions"',
    `labelPosition="${labelPosition}"`,
    isDisabled && "disabled",
    isIndeterminate && "indeterminate",
  ].filter(Boolean);
  const playgroundCode = `<Checkbox
${playgroundProps.map((prop) => `  ${prop}`).join("\n")}
  checked={checked}
  onChange={(event) => setChecked(event.currentTarget.checked)}
/>`;

  return (
    <section className={pageStyles.componentSection} id="checkbox">
      <div className={pageStyles.sectionHeading}>
        <div>
          <p className={pageStyles.eyebrow}>Inputs</p>
          <h2>Checkbox</h2>
        </div>
        <code>import {"{ Checkbox }"} from '@teelur/budget-board-ui';</code>
      </div>
      <p className={pageStyles.sectionCopy}>
        Mantine checkbox behavior with BBUI colors, typography, and keyboard
        focus treatment.
      </p>

      <ComponentDemoSection
        description="Use a label and optional description to identify the setting or choice."
        id="checkbox-basic"
        title="Basic usage"
        code={`<Checkbox
  label="Include pending transactions"
  description="Show transactions that have not cleared yet."
/>`}
      >
        <div className={styles.stack}>
          <Checkbox
            description="Show transactions that have not cleared yet."
            label="Include pending transactions"
          />
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Mantine's checkbox sizes, label positions, disabled, and indeterminate states are available."
        id="checkbox-sizes-states"
        title="Sizes & states"
        code={`<Checkbox size="xs" label="Extra small" />
<Checkbox defaultChecked label="Selected" />
<Checkbox indeterminate label="Partially selected" />
<Checkbox disabled label="Unavailable" />
<Checkbox labelPosition="left" label="Label on the left" />`}
      >
        <div className={styles.stateStack}>
          {sizes.map((size) => (
            <Checkbox key={size} label={`Size ${size}`} size={size} />
          ))}
          <Checkbox defaultChecked label="Selected" />
          <Checkbox indeterminate label="Partially selected" />
          <Checkbox disabled label="Unavailable" />
          <Checkbox labelPosition="left" label="Label on the left" />
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="The control can be controlled with checked and onChange, like a native checkbox."
        id="checkbox-controlled"
        title="Controlled state"
        code={`const [checked, setChecked] = useState(false);

<Checkbox
  checked={checked}
  label="Send monthly summary"
  onChange={(event) => setChecked(event.currentTarget.checked)}
/>`}
      >
        <Checkbox
          checked={controlledChecked}
          label="Send monthly summary"
          onChange={(event) =>
            setControlledChecked(event.currentTarget.checked)
          }
        />
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Adjust the public props and interact with the rendered checkbox."
        id="checkbox-playground"
        title="Playground"
        code={playgroundCode}
      >
        <div className={styles.playground}>
          <div className={styles.playgroundControls}>
            <div className={styles.controlGrid}>
              <Checkbox
                checked={isDisabled}
                label="Disabled"
                onChange={(event) => setIsDisabled(event.currentTarget.checked)}
                size="xs"
              />
              <Checkbox
                checked={isIndeterminate}
                label="Indeterminate"
                onChange={(event) =>
                  setIsIndeterminate(event.currentTarget.checked)
                }
                size="xs"
              />
            </div>
            <label className={styles.field}>
              <span>Label position</span>
              <select
                onChange={(event) =>
                  setLabelPosition(event.target.value as typeof labelPosition)
                }
                value={labelPosition}
              >
                <option value="right">Right</option>
                <option value="left">Left</option>
              </select>
            </label>
          </div>
          <div className={styles.playgroundPreview}>
            <Checkbox
              checked={playgroundChecked}
              description="Show transactions that have not cleared yet."
              disabled={isDisabled}
              indeterminate={isIndeterminate}
              label="Include pending transactions"
              labelPosition={labelPosition}
              onChange={(event) =>
                setPlaygroundChecked(event.currentTarget.checked)
              }
            />
          </div>
        </div>
      </ComponentDemoSection>

      <section
        className={pageStyles.componentReferenceSection}
        id="checkbox-api"
      >
        <div className={demoStyles.componentDemoHeading}>
          <div>
            <h3>API reference</h3>
            <p>BBUI styling with Mantine Checkbox props.</p>
          </div>
          <a
            aria-label="Link to API reference section"
            className={demoStyles.componentDemoAnchor}
            href="#checkbox-api"
          >
            #
          </a>
        </div>
        <div className={pageStyles.referenceGrid}>
          <div>
            <table>
              <tbody>
                <tr>
                  <th>checked / defaultChecked</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>controlled / uncontrolled state; default unchecked</td>
                </tr>
                <tr>
                  <th>onChange</th>
                  <td>
                    <code>ChangeEventHandler&lt;HTMLInputElement&gt;</code>
                  </td>
                  <td>native checkbox change event</td>
                </tr>
                <tr>
                  <th>label / description / error</th>
                  <td>
                    <code>ReactNode</code>
                  </td>
                  <td>optional Mantine input content</td>
                </tr>
                <tr>
                  <th>disabled / readOnly / required</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>false</td>
                </tr>
                <tr>
                  <th>indeterminate</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>false; takes visual precedence over checked</td>
                </tr>
                <tr>
                  <th>labelPosition</th>
                  <td>
                    <code>left | right</code>
                  </td>
                  <td>right</td>
                </tr>
                <tr>
                  <th>size</th>
                  <td>
                    <code>xs | sm | md | lg | xl</code>
                  </td>
                  <td>Mantine default: sm</td>
                </tr>
                <tr>
                  <th>color / iconColor</th>
                  <td>
                    <code>MantineColor</code>
                  </td>
                  <td>BBUI primary and primary content by default</td>
                </tr>
                <tr>
                  <th>variant / radius</th>
                  <td>
                    <code>filled | outline / MantineRadius</code>
                  </td>
                  <td>filled / sm</td>
                </tr>
                <tr>
                  <th>className / classNames / styles / wrapperProps</th>
                  <td>
                    <code>Mantine Checkbox styles API</code>
                  </td>
                  <td>consumer classes and styles are preserved</td>
                </tr>
                <tr>
                  <th>other props</th>
                  <td>
                    <code>CheckboxProps</code>
                  </td>
                  <td>Mantine props and native input attributes</td>
                </tr>
                <tr>
                  <th>focus treatment</th>
                  <td>
                    <code>focusRing</code>
                  </td>
                  <td>visible keyboard focus ring</td>
                </tr>
              </tbody>
            </table>
          </div>
          <pre className={pageStyles.codeBlock}>
            <code>{`<Checkbox
  label="Include pending transactions"
  description="Show transactions that have not cleared yet."
/>`}</code>
          </pre>
        </div>
      </section>
    </section>
  );
}
