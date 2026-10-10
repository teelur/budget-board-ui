import { FileInput } from "../../../src";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import demoStyles from "../../components/ComponentDemoSection/ComponentDemoSection.module.css";
import pageStyles from "../Page.module.css";
import styles from "./FileInputPage.module.css";
import { BodyText, HeadingText } from "../../../src";

export function FileInputPage() {
  return (
    <section className={pageStyles.componentSection} id="file-input">
      <div className={pageStyles.sectionHeading}>
        <div>
          <BodyText component="p" className={pageStyles.eyebrow} tone="muted" ff="var(--bb-font-data)" fz="0.68rem">Inputs</BodyText>
          <HeadingText level={2} tone="heading" lh={1.5}>FileInput</HeadingText>
        </div>
        <code>import {"{ FileInput }"} from '@teelur/budget-board-ui';</code>
      </div>
      <BodyText component="p" className={pageStyles.sectionCopy} tone="muted" m="1em 0">
        Mantine file selection behavior with the same BBUI surface and focus
        styling as the other input components.
      </BodyText>

      <ComponentDemoSection
        description="Choose a file, restrict accepted file types, and optionally show Mantine's clear control."
        id="file-input-basic"
        title="Basic usage"
        code={`<FileInput
  label="Statement"
  placeholder="Choose a PDF"
  accept="application/pdf"
  clearable
/>`}
      >
        <div className={styles.stack}>
          <FileInput
            accept="application/pdf"
            clearable
            description="PDF files only."
            label="Statement"
            placeholder="Choose a PDF"
          />
          <FileInput
            accept="image/*"
            label="Receipt image"
            placeholder="Choose an image"
          />
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Mantine sizes and disabled or read-only states remain available."
        id="file-input-states"
        title="Sizes & states"
        code={`<FileInput label="Small" size="sm" placeholder="Choose a file" />
<FileInput label="Disabled" disabled placeholder="Unavailable" />
<FileInput label="Read only" readOnly value={file} />`}
      >
        <div className={styles.stack}>
          <FileInput label="Small" placeholder="Choose a file" size="sm" />
          <FileInput disabled label="Disabled" placeholder="Unavailable" />
        </div>
      </ComponentDemoSection>

      <section
        className={pageStyles.componentReferenceSection}
        id="file-input-api"
      >
        <div className={demoStyles.componentDemoHeading}>
          <div>
            <HeadingText level={3} tone="heading" lh={1.5}>API reference</HeadingText>
            <BodyText component="p" tone="secondary" fz="0.82rem" lh={1.55} m="0.45rem 0 0">BBUI styling with Mantine FileInput props.</BodyText>
          </div>
          <a
            aria-label="Link to API reference section"
            className={demoStyles.componentDemoAnchor}
            href="#file-input-api"
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
                    <code>File | File[] | null</code>
                  </td>
                  <td>controlled / uncontrolled selected files</td>
                </tr>
                <tr>
                  <th>onChange</th>
                  <td>
                    <code>(value: File | File[] | null) =&gt; void</code>
                  </td>
                  <td>called when the selection changes</td>
                </tr>
                <tr>
                  <th>multiple</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>false; when true, selection values are File arrays</td>
                </tr>
                <tr>
                  <th>accept / name</th>
                  <td>
                    <code>string</code>
                  </td>
                  <td>native file input attributes</td>
                </tr>
                <tr>
                  <th>clearable / clearSectionMode</th>
                  <td>
                    <code>boolean / ClearSectionMode</code>
                  </td>
                  <td>false / Mantine default: both</td>
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
                    <code>Mantine FileInput styles API</code>
                  </td>
                  <td>consumer classes and styles are preserved</td>
                </tr>
                <tr>
                  <th>other props</th>
                  <td>
                    <code>FileInputProps</code>
                  </td>
                  <td>Mantine props and native button attributes</td>
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
            <code>{`<FileInput
  label="Statement"
  placeholder="Choose a PDF"
  accept="application/pdf"
  clearable
/>`}</code>
          </pre>
        </div>
      </section>
    </section>
  );
}
