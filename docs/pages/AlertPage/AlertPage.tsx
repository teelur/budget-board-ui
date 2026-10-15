import { useState } from "react";
import { Info } from "lucide-react";
import {
  Alert,
  alertColors,
  alertVariants,
  BodyText,
  Checkbox,
  HeadingText,
} from "../../../src";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import demoStyles from "../../components/ComponentDemoSection/ComponentDemoSection.module.css";
import pageStyles from "../Page.module.css";
import styles from "./AlertPage.module.css";

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function AlertPage() {
  const [selectedColor, setSelectedColor] =
    useState<(typeof alertColors)[number]>("info");
  const [selectedVariant, setSelectedVariant] =
    useState<(typeof alertVariants)[number]>("light");
  const [alertTitle, setAlertTitle] = useState("Import complete");
  const [alertMessage, setAlertMessage] = useState(
    "Your transactions are ready.",
  );
  const [showIcon, setShowIcon] = useState(false);
  const renderedTitle = alertTitle || "Alert title";
  const renderedMessage = alertMessage || "Alert message";
  const iconImport = showIcon
    ? `import { Info } from "lucide-react";\n\n`
    : "";
  const playgroundProps = [
    `color="${selectedColor}"`,
    `variant="${selectedVariant}"`,
    `title={${JSON.stringify(renderedTitle)}}`,
    ...(showIcon ? [`icon={<Info aria-hidden="true" size={18} />}`] : []),
  ];
  const playgroundCode = `${iconImport}<Alert
${playgroundProps.map((prop) => `  ${prop}`).join("\n")}
>
  {${JSON.stringify(renderedMessage)}}
</Alert>`;

  return (
    <section className={pageStyles.componentSection} id="alert">
      <div className={pageStyles.sectionHeading}>
        <div>
          <BodyText
            component="p"
            className={pageStyles.eyebrow}
            tone="muted"
            ff="var(--bb-font-data)"
            fz="0.68rem"
          >
            Feedback
          </BodyText>
          <HeadingText level={2} tone="heading" lh={1.5}>
            Alert
          </HeadingText>
        </div>
        <code>import {"{ Alert }"} from '@teelur/budget-board-ui';</code>
      </div>
      <BodyText
        component="p"
        className={pageStyles.sectionCopy}
        tone="muted"
        m="1em 0"
      >
        A semantic feedback message built on Mantine Alert. It supports the
        complete Mantine Alert API and uses BBUI semantic colors, with info as
        the default. Use Mantine&apos;s optional <code>icon</code> prop to add a
        visual marker.
      </BodyText>

      <ComponentDemoSection
        description="Choose a Mantine variant to adjust the visual weight while keeping the selected BBUI semantic color."
        id="alert-variants"
        title="Variants"
        code={alertVariants
          .map(
            (variant) =>
              `<Alert color="info" variant="${variant}" icon={<Info aria-hidden="true" size={18} />} title="${capitalize(variant)}">\n  Additional context for the alert.\n</Alert>`,
          )
          .join("\n\n")}
      >
        <div className={styles.stack}>
          {alertVariants.map((variant) => (
            <Alert
              key={variant}
              color="info"
              icon={<Info aria-hidden="true" size={18} />}
              title={capitalize(variant)}
              variant={variant}
            >
              Additional context for the alert.
            </Alert>
          ))}
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Use semantic colors from the shared BBUI palette to communicate context."
        id="alert-colors"
        title="Colors"
        code={alertColors
          .map(
            (color) =>
              `<Alert color="${color}" icon={<Info aria-hidden="true" size={18} />} title="${capitalize(color)}">\n  Additional context for the alert.\n</Alert>`,
          )
          .join("\n\n")}
      >
        <div className={styles.stack}>
          {alertColors.map((color) => (
            <Alert
              color={color}
              icon={<Info aria-hidden="true" size={18} />}
              key={color}
              title={capitalize(color)}
            >
              Additional context for the alert.
            </Alert>
          ))}
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Adjust representative Alert props and see the live result and matching JSX."
        id="alert-playground"
        title="API playground"
        code={playgroundCode}
      >
        <div className={styles.playground}>
          <div className={styles.playgroundControls}>
            <div className={styles.controlGrid}>
              <label className={styles.field}>
                <BodyText component="span">Color</BodyText>
                <select
                  onChange={(event) =>
                    setSelectedColor(
                      event.target.value as typeof selectedColor,
                    )
                  }
                  value={selectedColor}
                >
                  {alertColors.map((color) => (
                    <option key={color} value={color}>
                      {capitalize(color)}
                    </option>
                  ))}
                </select>
              </label>
              <label className={styles.field}>
                <BodyText component="span">Variant</BodyText>
                <select
                  onChange={(event) =>
                    setSelectedVariant(
                      event.target.value as typeof selectedVariant,
                    )
                  }
                  value={selectedVariant}
                >
                  {alertVariants.map((variant) => (
                    <option key={variant} value={variant}>
                      {capitalize(variant)}
                    </option>
                  ))}
                </select>
              </label>
              <label className={styles.field}>
                <BodyText component="span">Title</BodyText>
                <input
                  onChange={(event) => setAlertTitle(event.target.value)}
                  type="text"
                  value={alertTitle}
                />
              </label>
              <label className={styles.field}>
                <BodyText component="span">Message</BodyText>
                <input
                  onChange={(event) => setAlertMessage(event.target.value)}
                  type="text"
                  value={alertMessage}
                />
              </label>
            </div>
            <Checkbox
              checked={showIcon}
              className={styles.toggle}
              label="Show icon"
              onChange={(event) => setShowIcon(event.target.checked)}
              size="xs"
            />
          </div>
          <div className={styles.playgroundPreview}>
            <BodyText
              component="span"
              className={styles.previewLabel}
              tone="muted"
              ff="var(--bb-font-data)"
              fz="0.68rem"
            >
              Rendered result
            </BodyText>
            <div className={styles.previewStage}>
              <Alert
                color={selectedColor}
                icon={
                  showIcon ? <Info aria-hidden="true" size={18} /> : undefined
                }
                title={renderedTitle}
                variant={selectedVariant}
              >
                {renderedMessage}
              </Alert>
            </div>
          </div>
        </div>
      </ComponentDemoSection>

      <section className={pageStyles.componentReferenceSection} id="alert-api">
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
              BBUI adds semantic color styling while retaining Mantine's Alert
              props and Styles API.
            </BodyText>
          </div>
          <a
            aria-label="Link to API reference section"
            className={demoStyles.componentDemoAnchor}
            href="#alert-api"
          >
            #
          </a>
        </div>
        <div className={pageStyles.referenceGrid}>
          <div>
            <table>
              <tbody>
                <tr>
                  <th>color</th>
                  <td>
                    <code>{alertColors.join(" | ")}</code>
                  </td>
                  <td>info</td>
                </tr>
                <tr>
                  <th>variant</th>
                  <td>
                    <code>{alertVariants.join(" | ")}</code>
                  </td>
                  <td>Mantine default</td>
                </tr>
                <tr>
                  <th>icon</th>
                  <td>
                    <code>ReactNode</code>
                  </td>
                  <td>Optional; rendered beside the title and message</td>
                </tr>
                <tr>
                  <th>p</th>
                  <td>
                    <code>MantineSpacing</code>
                  </td>
                  <td>0.5rem</td>
                </tr>
                <tr>
                  <th>Mantine Alert props</th>
                  <td>
                    <code>AlertProps</code>
                  </td>
                  <td>
                    forwarded, including title, icon, close behavior, classNames,
                    styles, vars, and attributes
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <pre className={pageStyles.codeBlock}>
            <code>{`<Alert
  color="success"
  icon={<Info aria-hidden="true" size={18} />}
  title="Import complete"
>
  Your transactions are ready.
</Alert>`}</code>
          </pre>
        </div>
      </section>
    </section>
  );
}
