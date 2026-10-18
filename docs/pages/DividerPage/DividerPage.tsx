import { ApiPlayground } from "../../components/ApiPlayground/ApiPlayground";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import { BodyText, Divider, HeadingText } from "../../../src";
import type { DividerVariant } from "../../../src";
import pageStyles from "../Page.module.css";

const dividerVariants: DividerVariant[] = ["solid", "dashed", "dotted"];
const dividerSizes = ["xs", "sm", "md", "lg", "xl"] as const;

export function DividerPage() {
  return (
    <section className={pageStyles.componentSection} id="divider">
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
            Divider
          </HeadingText>
        </div>
        <code>import {"{ Divider }"} from '@teelur/budget-board-ui';</code>
      </div>
      <BodyText
        component="p"
        className={pageStyles.sectionCopy}
        tone="muted"
        m="1em 0"
      >
        Divider wraps Mantine&apos;s divider with BBUI semantic colors for its
        line and optional label. It supports horizontal and vertical rules,
        labels, variants, and the rest of Mantine&apos;s Divider props.
      </BodyText>

      <ComponentDemoSection
        description="A horizontal divider uses the BBUI subtle-border token."
        id="divider-basic"
        title="Basic divider"
        code="<Divider />"
      >
        <div style={{ maxWidth: "32rem", width: "100%" }}>
          <Divider />
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Use a label to divide related choices; its text uses the BBUI secondary-text token and its background remains transparent."
        id="divider-label"
        title="Labeled divider"
        code='<Divider label="or" labelPosition="center" />'
      >
        <div style={{ maxWidth: "32rem", width: "100%" }}>
          <Divider label="or" labelPosition="center" />
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="A vertical divider separates adjacent content in a row."
        id="divider-vertical"
        title="Vertical divider"
        code={`<div style={{ display: "flex", height: "5rem" }}>
  <span>Accounts</span>
  <Divider orientation="vertical" />
  <span>Budgets</span>
</div>`}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            gap: "1rem",
            height: "5rem",
          }}
        >
          <BodyText component="span">Accounts</BodyText>
          <Divider orientation="vertical" />
          <BodyText component="span">Budgets</BodyText>
        </div>
      </ComponentDemoSection>

      <ApiPlayground
        componentName="Divider"
        controls={[
          { key: "label", label: "Label", type: "text" },
          {
            key: "labelPosition",
            label: "Label position",
            type: "select",
            options: ["left", "center", "right"],
          },
          {
            key: "orientation",
            label: "Orientation",
            type: "select",
            options: ["horizontal", "vertical"],
          },
          {
            key: "variant",
            label: "Variant",
            type: "select",
            options: dividerVariants,
          },
          {
            key: "size",
            label: "Size",
            type: "select",
            options: dividerSizes,
          },
        ]}
        defaultValues={{
          label: "or",
          labelPosition: "center",
          orientation: "horizontal",
          size: "xs",
          variant: "solid",
        }}
        description="Adjust the label, orientation, line style, and size. All Mantine Divider props are forwarded."
        id="divider-playground"
        render={(values) => {
          const orientation = values.orientation as "horizontal" | "vertical";

          return (
            <div
              style={{
                alignItems: "center",
                display: orientation === "vertical" ? "flex" : "block",
                height: orientation === "vertical" ? "5rem" : undefined,
                width: "100%",
              }}
            >
              <Divider
                label={String(values.label)}
                labelPosition={values.labelPosition as "left" | "center" | "right"}
                orientation={orientation}
                size={String(values.size)}
                variant={values.variant as DividerVariant}
              />
            </div>
          );
        }}
      />

      <section className={pageStyles.componentReferenceSection} id="divider-api">
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
            Divider forwards Mantine Divider props and applies BBUI semantic
            defaults for the line and label.
          </BodyText>
        </div>
        <div className={pageStyles.referenceGrid}>
          <div>
            <table>
              <tbody>
                <tr>
                  <th>DividerProps</th>
                  <td>Mantine Divider props</td>
                  <td>
                    Supports <code>orientation</code> (horizontal by default),
                    <code>size</code> (Mantine size tokens or CSS lengths),
                    <code>variant</code> (<code>solid</code>, <code>dashed</code>
                    , or <code>dotted</code>), and optional <code>label</code>{" "}
                    with <code>labelPosition</code> (center by default). All
                    other Mantine Divider props and DOM attributes are
                    forwarded.
                  </td>
                </tr>
                <tr>
                  <th>color</th>
                  <td>Mantine Divider prop</td>
                  <td>
                    The default line uses the BBUI <code>border-subtle</code>{" "}
                    token. Set <code>color</code> to override the line color.
                    Labels use the BBUI <code>text-secondary</code> token and
                    have a transparent background.
                  </td>
                </tr>
                <tr>
                  <th>className, style</th>
                  <td>Mantine Divider props</td>
                  <td>
                    Forwarded to the root; consumer styles can override BBUI
                    defaults.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <pre className={pageStyles.codeBlock}>
            <code>{'<Divider label="or" labelPosition="center" />'}</code>
          </pre>
        </div>
      </section>
    </section>
  );
}
