import { useState } from "react";
import { Info } from "lucide-react";
import {
  BodyText,
  Checkbox,
  HeadingText,
  Notification,
  notificationColors,
} from "../../../src";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import demoStyles from "../../components/ComponentDemoSection/ComponentDemoSection.module.css";
import pageStyles from "../Page.module.css";
import styles from "./NotificationPage.module.css";

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function NotificationPage() {
  const [selectedColor, setSelectedColor] =
    useState<(typeof notificationColors)[number]>("success");
  const [title, setTitle] = useState("Budget updated");
  const [message, setMessage] = useState(
    "Your budget changes have been saved.",
  );
  const [showIcon, setShowIcon] = useState(true);
  const [showCloseButton, setShowCloseButton] = useState(true);
  const renderedTitle = title || "Notification title";
  const renderedMessage = message || "Notification message";
  const iconImport = showIcon
    ? `import { Info } from "lucide-react";\n\n`
    : "";
  const playgroundProps = [
    `color="${selectedColor}"`,
    `title={${JSON.stringify(renderedTitle)}}`,
    ...(showIcon ? [`icon={<Info aria-hidden="true" size={18} />}`] : []),
    `withCloseButton={${showCloseButton}}`,
  ];
  const playgroundCode = `${iconImport}<Notification
${playgroundProps.map((prop) => `  ${prop}`).join("\n")}
>
  {${JSON.stringify(renderedMessage)}}
</Notification>`;

  return (
    <section className={pageStyles.componentSection} id="notification">
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
            Notification
          </HeadingText>
        </div>
        <code>import {"{ Notification }"} from '@teelur/budget-board-ui';</code>
      </div>
      <BodyText
        component="p"
        className={pageStyles.sectionCopy}
        tone="muted"
        m="1em 0"
      >
        A semantic notification presentation built on Mantine Notification. It
        uses BBUI status colors, elevated surfaces, and typography while
        retaining Mantine&apos;s props. BBUI does not own the notification
        queue; use this component with your preferred notification host and
        provide localized titles and status icons as needed.
      </BodyText>

      <ComponentDemoSection
        description="Use the shared semantic palette to distinguish status and emphasis."
        id="notification-colors"
        title="Colors"
        code={notificationColors
          .map(
            (color) =>
              `<Notification color="${color}" icon={<Info aria-hidden="true" size={18} />} title="${capitalize(color)}">\n  Additional context for this notification.\n</Notification>`,
          )
          .join("\n\n")}
      >
        <div className={styles.stack}>
          {notificationColors.map((color) => (
            <Notification
              color={color}
              icon={<Info aria-hidden="true" size={18} />}
              key={color}
              title={capitalize(color)}
            >
              Additional context for this notification.
            </Notification>
          ))}
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Adjust representative Notification props and see the live result and matching JSX."
        id="notification-playground"
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
                  {notificationColors.map((color) => (
                    <option key={color} value={color}>
                      {capitalize(color)}
                    </option>
                  ))}
                </select>
              </label>
              <label className={styles.field}>
                <BodyText component="span">Title</BodyText>
                <input
                  onChange={(event) => setTitle(event.target.value)}
                  type="text"
                  value={title}
                />
              </label>
              <label className={styles.field}>
                <BodyText component="span">Message</BodyText>
                <input
                  onChange={(event) => setMessage(event.target.value)}
                  type="text"
                  value={message}
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
            <Checkbox
              checked={showCloseButton}
              className={styles.toggle}
              label="Show close button"
              onChange={(event) => setShowCloseButton(event.target.checked)}
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
              <Notification
                color={selectedColor}
                icon={
                  showIcon ? <Info aria-hidden="true" size={18} /> : undefined
                }
                onClose={() => setShowCloseButton(false)}
                title={renderedTitle}
                withCloseButton={showCloseButton}
              >
                {renderedMessage}
              </Notification>
            </div>
          </div>
        </div>
      </ComponentDemoSection>

      <section
        className={pageStyles.componentReferenceSection}
        id="notification-api"
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
              BBUI adds semantic colors and notification styling while
              retaining Mantine&apos;s Notification props and Styles API.
            </BodyText>
          </div>
          <a
            aria-label="Link to API reference section"
            className={demoStyles.componentDemoAnchor}
            href="#notification-api"
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
                    <code>{notificationColors.join(" | ")}</code>
                  </td>
                  <td>info</td>
                </tr>
                <tr>
                  <th>title</th>
                  <td>
                    <code>ReactNode</code>
                  </td>
                  <td>Optional; provide a localized status title when needed</td>
                </tr>
                <tr>
                  <th>icon</th>
                  <td>
                    <code>ReactNode</code>
                  </td>
                  <td>Optional; replaces the semantic accent line</td>
                </tr>
                <tr>
                  <th>children</th>
                  <td>
                    <code>ReactNode</code>
                  </td>
                  <td>Notification message</td>
                </tr>
                <tr>
                  <th>withBorder</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>true</td>
                </tr>
                <tr>
                  <th>Mantine Notification props</th>
                  <td>
                    <code>NotificationProps</code>
                  </td>
                  <td>
                    Forwarded, including close behavior, classNames, styles,
                    vars, and HTML attributes
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <pre className={pageStyles.codeBlock}>
            <code>{`<Notification
  color="success"
  icon={<Info aria-hidden="true" size={18} />}
  title="Budget updated"
>
  Your budget changes have been saved.
</Notification>`}</code>
          </pre>
        </div>
      </section>
    </section>
  );
}
