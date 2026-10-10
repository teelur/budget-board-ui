import { useState } from "react";
import { Card, NumberInput } from "../../../src";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import demoStyles from "../../components/ComponentDemoSection/ComponentDemoSection.module.css";
import pageStyles from "../Page.module.css";
import styles from "./NumberInputPage.module.css";
import { BodyText, HeadingText } from "../../../src";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export function NumberInputPage() {
  const [amount, setAmount] = useState<number | string>(250);

  return (
    <section className={pageStyles.componentSection} id="number-input">
      <div className={pageStyles.sectionHeading}>
        <div>
          <BodyText component="p" className={pageStyles.eyebrow} tone="muted" ff="var(--bb-font-data)" fz="0.68rem">Inputs</BodyText>
          <HeadingText level={2} tone="heading" lh={1.5}>NumberInput</HeadingText>
        </div>
        <code>import {"{ NumberInput }"} from '@teelur/budget-board-ui';</code>
      </div>
      <BodyText component="p" className={pageStyles.sectionCopy} tone="muted" m="1em 0">
        Mantine number-entry behavior with a BBUI surface, border, focus ring,
        and stepper treatment.
      </BodyText>

      <ComponentDemoSection
        description="Use Mantine's controlled value and change API with labels, descriptions, prefixes, and numeric constraints."
        id="number-input-basic"
        title="Basic usage"
        code={`const [amount, setAmount] = useState<number | string>(250);

<NumberInput
  label="Monthly amount"
  description="Enter an amount between 0 and 10,000."
  min={0}
  max={10000}
  step={50}
  prefix="$"
  value={amount}
  onChange={setAmount}
/>`}
      >
        <div className={styles.stack}>
          <NumberInput
            description="Enter an amount between 0 and 10,000."
            label="Monthly amount"
            max={10000}
            min={0}
            onChange={setAmount}
            prefix="$"
            step={50}
            value={amount}
          />
          <NumberInput
            aria-label="Uncontrolled amount"
            defaultValue={1250}
            max={10000}
            min={0}
            thousandSeparator=","
          />
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Compare the field fill on the page with its fill inside the BBUI Card surface."
        id="number-input-surfaces"
        title="Surface consistency"
        code={`<NumberInput label="Page surface" defaultValue={250} />
      <Card p="lg">
        <NumberInput label="Card surface" defaultValue={250} />
      </Card>`}
      >
        <div className={styles.surfaceSamples}>
          <div className={`${styles.surfaceSample} ${styles.pageSurface}`}>
            <BodyText component="span">Page surface</BodyText>
            <NumberInput aria-label="Page surface amount" defaultValue={250} />
          </div>
          <Card className={styles.surfaceSample} display="grid" p="lg">
            <BodyText component="span">Card surface</BodyText>
            <NumberInput aria-label="Card surface amount" defaultValue={250} />
          </Card>
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Mantine sizes remain available, and disabled or read-only behavior is unchanged."
        id="number-input-sizes-states"
        title="Sizes & states"
        code={`<NumberInput label="Small" size="sm" defaultValue={10} />
<NumberInput label="Read only" readOnly value={10} />
<NumberInput label="Disabled" disabled value={10} />`}
      >
        <div className={styles.stack}>
          {sizes.map((size) => (
            <NumberInput
              aria-label={`${size} amount`}
              defaultValue={10}
              key={size}
              size={size}
            />
          ))}
          <NumberInput aria-label="Read only amount" readOnly value={10} />
          <NumberInput aria-label="Disabled amount" disabled value={10} />
        </div>
      </ComponentDemoSection>

      <section
        className={pageStyles.componentReferenceSection}
        id="number-input-api"
      >
        <div className={demoStyles.componentDemoHeading}>
          <div>
            <HeadingText level={3} tone="heading" lh={1.5}>API reference</HeadingText>
            <BodyText component="p" tone="secondary" fz="0.82rem" lh={1.55} m="0.45rem 0 0">Every BBUI default and the key numeric input props.</BodyText>
          </div>
          <a
            aria-label="Link to API reference section"
            className={demoStyles.componentDemoAnchor}
            href="#number-input-api"
          >
            #
          </a>
        </div>
        <div className={pageStyles.referenceGrid}>
          <div>
            <table>
              <tbody>
                <tr>
                  <th>value</th>
                  <td>
                    <code>number | string</code>
                  </td>
                  <td>controlled value</td>
                </tr>
                <tr>
                  <th>defaultValue</th>
                  <td>
                    <code>number | string</code>
                  </td>
                  <td>uncontrolled initial value</td>
                </tr>
                <tr>
                  <th>onChange</th>
                  <td>
                    <code>(value: number | string) =&gt; void</code>
                  </td>
                  <td>called when the value changes</td>
                </tr>
                <tr>
                  <th>min / max / step</th>
                  <td>
                    <code>number | bigint</code>
                  </td>
                  <td>no minimum, maximum, or custom step</td>
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
                  <th>hideControls</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>false</td>
                </tr>
                <tr>
                  <th>className / classNames / styles</th>
                  <td>
                    <code>Mantine NumberInput styles API</code>
                  </td>
                  <td>consumer classes and styles are preserved</td>
                </tr>
                <tr>
                  <th>other props</th>
                  <td>
                    <code>NumberInputProps</code>
                  </td>
                  <td>
                    Mantine NumberInput props and native input attributes are
                    forwarded
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
            <code>{`<NumberInput
  label="Monthly amount"
  min={0}
  max={10000}
  step={50}
  value={amount}
  onChange={setAmount}
/>`}</code>
          </pre>
        </div>
      </section>
    </section>
  );
}
