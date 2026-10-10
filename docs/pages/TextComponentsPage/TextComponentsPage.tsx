import {
  BodyText,
  CaptionText,
  DataText,
  DisplayText,
  HeadingText,
} from "../../../src";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import demoStyles from "../../components/ComponentDemoSection/ComponentDemoSection.module.css";
import pageStyles from "../Page.module.css";
import styles from "./TextComponentsPage.module.css";

export function TextComponentsPage() {
  return (
    <section className={pageStyles.componentSection} id="text-components">
      <div className={pageStyles.sectionHeading}>
        <div>
          <BodyText component="p" className={pageStyles.eyebrow}>Typography</BodyText>
          <HeadingText level={2}>Text components</HeadingText>
        </div>
        <code>5 roles · semantic tones</code>
      </div>
      <BodyText component="p" className={pageStyles.sectionCopy}>
        Choose a role for the content and hierarchy, then use tone for its
        semantic color. Use HeadingText for document headings; DisplayText is
        visual display copy and does not create a heading.
      </BodyText>

      <ComponentDemoSection
        description="Use each role for its typographic purpose; headings preserve the document outline."
        id="text-component-hierarchy"
        title="Hierarchy roles"
        code={`<DisplayText>Budget Board</DisplayText>
<HeadingText level={2}>Monthly overview</HeadingText>
<BodyText>Readable supporting copy goes here.</BodyText>
<CaptionText>Updated just now</CaptionText>
<DataText>-$1,284.50</DataText>`}
      >
        <div className={styles.roleStack}>
          <DisplayText>Budget Board</DisplayText>
          <HeadingText level={2}>Monthly overview</HeadingText>
          <BodyText>Readable supporting copy goes here.</BodyText>
          <CaptionText>Updated just now</CaptionText>
          <DataText>-$1,284.50</DataText>
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Tone is independent from typography role; Mantine style props can override role defaults."
        id="text-component-tones"
        title="Tones and overrides"
        code={`<BodyText tone="secondary">Supporting content</BodyText>
<CaptionText tone="metadata">Updated just now</CaptionText>
<DisplayText fz="2rem" tone="muted">Display copy</DisplayText>
<DataText fw={600} c="var(--bb-color-text-primary)">
  $12,480.00
</DataText>`}
      >
        <div className={styles.toneGrid}>
          <BodyText tone="primary">Primary</BodyText>
          <BodyText tone="secondary">Secondary</BodyText>
          <BodyText tone="metadata">Metadata</BodyText>
          <BodyText tone="muted">Muted</BodyText>
          <DisplayText fz="2rem" tone="muted">
            Display override
          </DisplayText>
          <DataText c="var(--bb-color-text-primary)" fw={600}>
            $12,480.00
          </DataText>
        </div>
      </ComponentDemoSection>

      <section
        className={pageStyles.componentReferenceSection}
        id="text-components-api"
      >
        <div className={demoStyles.componentDemoHeading}>
          <div>
            <HeadingText level={3}>API reference</HeadingText>
            <BodyText component="p">Defaults and props for using each BBUI text component.</BodyText>
          </div>
          <a
            aria-label="Link to text components API reference"
            className={demoStyles.componentDemoAnchor}
            href="#text-components-api"
          >
            #
          </a>
        </div>

        <section className={styles.apiSection}>
          <HeadingText level={4}>Role defaults</HeadingText>
          <div className={pageStyles.referenceGrid}>
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Component</th>
                    <th>Defaults</th>
                    <th>Use for</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>DisplayText</th>
                    <td>
                      <code>
                        span, display font, fz 1.6rem, lh 1.1, fw 700, primary
                      </code>
                    </td>
                    <td>Brand/display copy; does not imply heading semantics</td>
                  </tr>
                  <tr>
                    <th>HeadingText</th>
                    <td>
                      <code>h2, display font, fw 700, primary</code>
                    </td>
                    <td>
                      Semantic headings; level defaults to 2 and controls size
                    </td>
                  </tr>
                  <tr>
                    <th>BodyText</th>
                    <td>
                      <code>p, body font, md, fw 400, primary</code>
                    </td>
                    <td>Paragraphs and supporting copy</td>
                  </tr>
                  <tr>
                    <th>CaptionText</th>
                    <td>
                      <code>span, body font, sm, fw 400, secondary</code>
                    </td>
                    <td>Compact supporting or metadata text</td>
                  </tr>
                  <tr>
                    <th>DataText</th>
                    <td>
                      <code>span, data font, md, fw 500, primary</code>
                    </td>
                    <td>Amounts and aligned values; tabular numerals</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <pre className={pageStyles.codeBlock}>
              <code>{`import {
  BodyText,
  CaptionText,
  DataText,
  DisplayText,
  HeadingText,
} from "@teelur/budget-board-ui";

<DisplayText>Budget Board</DisplayText>
<HeadingText level={2}>Monthly overview</HeadingText>
<BodyText tone="secondary">Supporting copy</BodyText>
<CaptionText tone="metadata">Updated just now</CaptionText>
<DataText fw={600}>$12,480.00</DataText>`}</code>
            </pre>
          </div>
        </section>

        <section className={styles.apiSection}>
          <HeadingText level={4}>Props shared by all text roles</HeadingText>
          <div className={styles.apiTableScroll}>
            <table className={styles.apiTable}>
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Behavior</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>tone</th>
                  <td>
                    <code>TextTone</code>: primary, secondary, metadata, muted
                  </td>
                  <td>
                    Selects a semantic text color. Defaults are shown above;
                    tone is independent from the typography role.
                  </td>
                </tr>
                <tr>
                  <th>component</th>
                  <td>
                    <code>React.ElementType</code>
                  </td>
                  <td>
                    Overrides the rendered root element. For HeadingText,
                    level still determines visual size if the element is
                    overridden.
                  </td>
                </tr>
                <tr>
                  <th>c</th>
                  <td>
                    <code>MantineColor</code>
                  </td>
                  <td>
                    Optional explicit color; takes precedence over tone.
                  </td>
                </tr>
                <tr>
                  <th>size</th>
                  <td>
                    <code>TextProps["size"]</code> or <code>TitleSize</code>
                  </td>
                  <td>
                    Mantine Text sizing on DisplayText, BodyText, CaptionText,
                    and DataText; Title sizing on HeadingText. Explicit size
                    overrides the role default.
                  </td>
                </tr>
                <tr>
                  <th>ff / fz / fw / lh</th>
                  <td>
                    <code>Mantine style props</code>
                  </td>
                  <td>
                    Override the role font family, size, weight, and line
                    height.
                  </td>
                </tr>
                <tr>
                  <th>children</th>
                  <td>
                    <code>ReactNode</code>
                  </td>
                  <td>Content rendered by the component</td>
                </tr>
                <tr>
                  <th>className / style / other props</th>
                  <td>
                    <code>TextProps</code> or <code>TitleProps</code>
                  </td>
                  <td>
                    Forwarded to the root. HeadingText uses TitleProps; the
                    other roles use TextProps.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.apiSection}>
          <HeadingText level={4}>HeadingText-specific prop</HeadingText>
          <div className={styles.apiTableScroll}>
            <table className={styles.apiTable}>
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type / default</th>
                  <th>Behavior</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>level</th>
                  <td>
                    <code>1 | 2 | 3 | 4 | 5 | 6</code>; default <code>2</code>
                  </td>
                  <td>
                    Renders h1–h6 and selects the corresponding default heading
                    size. Use the level that matches the page outline.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </section>
  );
}
