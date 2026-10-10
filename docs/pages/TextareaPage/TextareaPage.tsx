import { useState } from "react";
import { Card, Textarea } from "../../../src";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import demoStyles from "../../components/ComponentDemoSection/ComponentDemoSection.module.css";
import pageStyles from "../Page.module.css";
import styles from "./TextareaPage.module.css";
import { BodyText, HeadingText } from "../../../src";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export function TextareaPage() {
  const [note, setNote] = useState("");

  return (
    <section className={pageStyles.componentSection} id="textarea">
      <div className={pageStyles.sectionHeading}>
        <div>
          <BodyText component="p" className={pageStyles.eyebrow} tone="muted" ff="var(--bb-font-data)" fz="0.68rem">Inputs</BodyText>
          <HeadingText level={2} tone="heading" lh={1.5}>Textarea</HeadingText>
        </div>
        <code>import {"{ Textarea }"} from '@teelur/budget-board-ui';</code>
      </div>
      <BodyText component="p" className={pageStyles.sectionCopy} tone="muted" m="1em 0">
        A multiline text field with Mantine row sizing and autosize behavior,
        styled to match the BBUI input family.
      </BodyText>

      <ComponentDemoSection
        description="Use autosize with row limits for notes that grow naturally while staying within a predictable range."
        id="textarea-basic"
        title="Basic usage"
        code={`<Textarea
  label="Transaction note"
  description="Add context to this transaction."
  minRows={3}
  maxRows={6}
  autosize
  placeholder="What was this purchase for?"
/>`}
      >
        <div className={styles.stack}>
          <Textarea
            autosize
            description="Add context to this transaction."
            label="Transaction note"
            maxLength={240}
            maxRows={6}
            minRows={3}
            placeholder="What was this purchase for?"
          />
          <Textarea
            aria-label="Uncontrolled note"
            defaultValue="Monthly rent and utilities"
            minRows={2}
            placeholder="Add a note"
          />
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Compare the multiline field fill on the page and inside the BBUI Card surface."
        id="textarea-surfaces"
        title="Surface consistency"
        code={`<Textarea label="Page surface" minRows={3} />
      <Card p="lg">
        <Textarea label="Card surface" minRows={3} />
      </Card>`}
      >
        <div className={styles.surfaceSamples}>
          <div className={`${styles.surfaceSample} ${styles.pageSurface}`}>
            <BodyText component="span">Page surface</BodyText>
            <Textarea aria-label="Page note" minRows={3} />
          </div>
          <Card className={styles.surfaceSample} display="grid" p="lg">
            <BodyText component="span">Card surface</BodyText>
            <Textarea aria-label="Card surface note" minRows={3} />
          </Card>
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Control the value with native textarea change events, or use Mantine's default uncontrolled behavior."
        id="textarea-controlled"
        title="Controlled state"
        code={`const [note, setNote] = useState("");

<Textarea
  label="Note"
  value={note}
  onChange={(event) => setNote(event.currentTarget.value)}
  minRows={3}
/>`}
      >
        <div className={styles.stack}>
          <Textarea
            label="Controlled note"
            maxLength={240}
            minRows={3}
            onChange={(event) => setNote(event.currentTarget.value)}
            placeholder="Write a note"
            value={note}
          />
          <Textarea
            aria-label="Read only note"
            readOnly
            value="This note cannot be changed."
            minRows={2}
          />
          <Textarea aria-label="Disabled note" disabled minRows={2} />
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="All Mantine sizes and resize settings remain available."
        id="textarea-sizes"
        title="Sizes & resize"
        code={`<Textarea label="Compact" size="sm" minRows={2} />
<Textarea label="Resizable" resize="vertical" minRows={3} />`}
      >
        <div className={styles.stack}>
          {sizes.map((size) => (
            <Textarea
              aria-label={`${size} note`}
              key={size}
              minRows={2}
              placeholder={`${size} textarea`}
              size={size}
            />
          ))}
          <Textarea
            aria-label="Resizable note"
            minRows={3}
            placeholder="Drag to resize"
            resize="vertical"
          />
        </div>
      </ComponentDemoSection>

      <section
        className={pageStyles.componentReferenceSection}
        id="textarea-api"
      >
        <div className={demoStyles.componentDemoHeading}>
          <div>
            <HeadingText level={3} tone="heading" lh={1.5}>API reference</HeadingText>
            <BodyText component="p" tone="secondary" fz="0.82rem" lh={1.55} m="0.45rem 0 0">BBUI styling with Mantine Textarea props.</BodyText>
          </div>
          <a
            aria-label="Link to API reference section"
            className={demoStyles.componentDemoAnchor}
            href="#textarea-api"
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
                    <code>ChangeEventHandler&lt;HTMLTextAreaElement&gt;</code>
                  </td>
                  <td>native textarea change event</td>
                </tr>
                <tr>
                  <th>autosize</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>false</td>
                </tr>
                <tr>
                  <th>minRows / maxRows</th>
                  <td>
                    <code>number</code>
                  </td>
                  <td>autosize row limits</td>
                </tr>
                <tr>
                  <th>resize</th>
                  <td>
                    <code>CSSProperties["resize"]</code>
                  </td>
                  <td>none</td>
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
                    <code>Mantine Textarea styles API</code>
                  </td>
                  <td>consumer classes and styles are preserved</td>
                </tr>
                <tr>
                  <th>style / wrapperProps.style</th>
                  <td>
                    <code>CSSProperties</code>
                  </td>
                  <td>
                    style is passed to Mantine's input root; wrapperProps.style
                    overrides it when both are supplied
                  </td>
                </tr>
                <tr>
                  <th>other props</th>
                  <td>
                    <code>TextareaProps</code>
                  </td>
                  <td>Mantine props and native textarea attributes</td>
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
            <code>{`<Textarea
  label="Transaction note"
  minRows={3}
  maxRows={6}
  autosize
  placeholder="What was this purchase for?"
/>`}</code>
          </pre>
        </div>
      </section>
    </section>
  );
}
