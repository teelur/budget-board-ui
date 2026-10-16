import { Code } from "../../../src";
import { ApiPlayground } from "../../components/ApiPlayground/ApiPlayground";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import demoStyles from "../../components/ComponentDemoSection/ComponentDemoSection.module.css";
import pageStyles from "../Page.module.css";
import { BodyText, HeadingText } from "../../../src";

export function CodePage() {
  return (
    <section className={pageStyles.componentSection} id="code">
      <div className={pageStyles.sectionHeading}>
        <div>
          <BodyText
            className={pageStyles.eyebrow}
            component="p"
            ff="var(--bb-font-data)"
            fz="0.68rem"
            tone="muted"
          >
            Content
          </BodyText>
          <HeadingText level={2} lh={1.5} tone="heading">
            Code
          </HeadingText>
        </div>
        <code>import {"{ Code }"} from '@teelur/budget-board-ui';</code>
      </div>
      <BodyText
        className={pageStyles.sectionCopy}
        component="p"
        m="1em 0"
        tone="muted"
      >
        Inline and block code use IBM Plex Mono and BBUI colors, while
        preserving Mantine Code props.
      </BodyText>

      <ApiPlayground
        componentName="Code"
        controls={[{ key: "block", label: "Block display", type: "toggle" }]}
        defaultValues={{ block: false }}
        description="Switch between inline code and a scrollable block snippet."
        id="code-playground"
        childrenCode={'budget = 1250'}
        render={(values) => (
          <Code block={values.block as boolean}>budget = 1250</Code>
        )}
      />

      <ComponentDemoSection
        description="Use inline code for short identifiers, values, and expressions within text."
        id="code-inline"
        title="Inline code"
        code={`<BodyText>
  Set <Code>category = "housing"</Code> before saving.
</BodyText>`}
      >
        <BodyText>
          Set <Code>category = "housing"</Code> before saving.
        </BodyText>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Set block to render a pre element for multiline snippets; long lines scroll within the available width."
        id="code-block"
        title="Block code"
        code={`<Code block>
  const remaining = income - expenses;
</Code>`}
      >
        <Code block data-testid="code-block-preview">
          const remaining = income - expenses;
        </Code>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Mantine's color prop remains available for a custom code background."
        id="code-color"
        title="Custom background"
        code={`<Code color="var(--bb-color-selection)">selected</Code>`}
      >
        <Code color="var(--bb-color-selection)">selected</Code>
      </ComponentDemoSection>

      <section className={pageStyles.componentReferenceSection} id="code-api">
        <div className={demoStyles.componentDemoHeading}>
          <div>
            <HeadingText level={3} lh={1.5} tone="heading">
              API reference
            </HeadingText>
            <BodyText component="p" fz="0.82rem" lh={1.55} m="0.45rem 0 0" tone="secondary">
              BBUI styling with Mantine Code props and native code element
              attributes.
            </BodyText>
          </div>
          <a
            aria-label="Link to API reference section"
            className={demoStyles.componentDemoAnchor}
            href="#code-api"
          >
            #
          </a>
        </div>
        <div className={pageStyles.referenceGrid}>
          <div>
            <table>
              <tbody>
                <tr>
                  <th>children</th>
                  <td>
                    <code>ReactNode</code>
                  </td>
                  <td>code content</td>
                </tr>
                <tr>
                  <th>block</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>false; renders a pre element when true</td>
                </tr>
                <tr>
                  <th>color</th>
                  <td>
                    <code>MantineColor</code>
                  </td>
                  <td>optional code background color; BBUI surface by default</td>
                </tr>
                <tr>
                  <th>className / classNames / styles / style</th>
                  <td>
                    <code>Mantine Code styling props</code>
                  </td>
                  <td>consumer classes and styles are preserved</td>
                </tr>
                <tr>
                  <th>other props</th>
                  <td>
                    <code>CodeProps</code>
                  </td>
                  <td>Mantine Box props and native code element attributes</td>
                </tr>
              </tbody>
            </table>
          </div>
          <pre className={pageStyles.codeBlock}>
            <code>{`<Code block color="var(--bb-color-selection)">
  const remaining = income - expenses;
</Code>`}</code>
          </pre>
        </div>
      </section>
    </section>
  );
}
