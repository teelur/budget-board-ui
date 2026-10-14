import { CollapsibleCard } from "../../../src";
import type { CardSurface } from "../../../src";
import { ApiPlayground } from "../../components/ApiPlayground/ApiPlayground";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import demoStyles from "../../components/ComponentDemoSection/ComponentDemoSection.module.css";
import pageStyles from "../Page.module.css";
import { BodyText, HeadingText } from "../../../src";
import styles from "./CollapsibleCardPage.module.css";

const exampleCode = `<CollapsibleCard title="Account overview">
  <p>Checking account balance: $4,218.32</p>
</CollapsibleCard>`;

export function CollapsibleCardPage() {
  return (
    <section
      className={pageStyles.componentSection}
      id="collapsible-card"
    >
      <div className={pageStyles.sectionHeading}>
        <div>
          <BodyText
            component="p"
            className={pageStyles.eyebrow}
            tone="muted"
            ff="var(--bb-font-data)"
            fz="0.68rem"
          >
            Content
          </BodyText>
          <HeadingText level={2} tone="heading" lh={1.5}>
            CollapsibleCard
          </HeadingText>
        </div>
        <code>
          import {"{ CollapsibleCard }"} from '@teelur/budget-board-ui';
        </code>
      </div>
      <BodyText
        component="p"
        className={pageStyles.sectionCopy}
        tone="muted"
        m="1em 0"
      >
        A themed Card with an accessible title toggle and an animated content
        region. It starts expanded and can also be controlled by its parent.
      </BodyText>

      <ApiPlayground
        componentName="CollapsibleCard"
        controls={[
          {
            key: "surface",
            label: "Surface",
            type: "select",
            options: ["default", "sunken", "outline"],
          },
        ]}
        defaultValues={{ surface: "default" }}
        description="Choose the card surface, then use the title toggle to collapse and expand the content."
        id="collapsible-card-playground"
        staticCodeProps={[
          'title="Account overview"',
          "defaultExpanded",
        ]}
        childrenCode="<p>Checking account balance: $4,218.32</p>"
        render={(values) => (
          <div className={styles.preview}>
            <CollapsibleCard
              surface={values.surface as CardSurface}
              title="Account overview"
            >
              <BodyText component="p" m={0}>
                Checking account balance: <strong>$4,218.32</strong>
              </BodyText>
            </CollapsibleCard>
          </div>
        )}
      />

      <ComponentDemoSection
        description="The content region is inert while collapsed. The title button exposes its state and controls the associated region."
        id="collapsible-card-example"
        title="Account overview"
        code={exampleCode}
      >
        <div className={styles.preview}>
          <CollapsibleCard title="Account overview">
            <BodyText component="p" m={0}>
              Checking account balance: <strong>$4,218.32</strong>
            </BodyText>
          </CollapsibleCard>
        </div>
      </ComponentDemoSection>

      <section
        className={pageStyles.componentReferenceSection}
        id="collapsible-card-api"
      >
        <div className={demoStyles.componentDemoHeading}>
          <div>
            <HeadingText level={3} tone="heading" lh={1.5}>
              API reference
            </HeadingText>
            <BodyText
              component="p"
              tone="secondary"
              fz="0.82rem"
              lh={1.55}
              m="0.45rem 0 0"
            >
              A Card surface with a full-width disclosure button and content
              area.
            </BodyText>
          </div>
          <a
            aria-label="Link to CollapsibleCard API reference"
            className={demoStyles.componentDemoAnchor}
            href="#collapsible-card-api"
          >
            #
          </a>
        </div>
        <div className={pageStyles.referenceGrid}>
          <div>
            <table>
              <tbody>
                <tr>
                  <th>title</th>
                  <td>
                    <code>ReactNode</code>
                  </td>
                  <td>Required; visible text and accessible name of the toggle.</td>
                </tr>
                <tr>
                  <th>children</th>
                  <td>
                    <code>ReactNode</code>
                  </td>
                  <td>Required; content rendered in the associated region.</td>
                </tr>
                <tr>
                  <th>expanded</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>
                    When provided, controls the expanded state. Pair with{" "}
                    <code>onExpandedChange</code> to update the value.
                  </td>
                </tr>
                <tr>
                  <th>defaultExpanded</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>
                    Defaults to <code>true</code>; sets the initial state for
                    uncontrolled use.
                  </td>
                </tr>
                <tr>
                  <th>onExpandedChange</th>
                  <td>
                    <code>(expanded: boolean) =&gt; void</code>
                  </td>
                  <td>Called when the user toggles the title button.</td>
                </tr>
                <tr>
                  <th>surface</th>
                  <td>
                    <code>CardSurface</code>
                  </td>
                  <td>
                    Defaults to <code>default</code>. The <code>outline</code>{" "}
                    surface matches the app page background and retains the
                    subtle border.
                  </td>
                </tr>
                <tr>
                  <th>Card props</th>
                  <td>
                    <code>CollapsibleCardProps</code>
                  </td>
                  <td>
                    Other Card props are forwarded to the root, including
                    border, styling, and DOM attributes. The internal layout
                    controls the root padding.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <pre className={pageStyles.codeBlock}>
            <code>{exampleCode}</code>
          </pre>
        </div>
      </section>
    </section>
  );
}
