import { useState } from "react";
import { Button, Modal } from "../../../src";
import { BodyText, HeadingText } from "../../../src";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import demoStyles from "../../components/ComponentDemoSection/ComponentDemoSection.module.css";
import pageStyles from "../Page.module.css";
import styles from "./ModalPage.module.css";

const basicModalExample = `const [opened, setOpened] = useState(false);

<>
  <Button onClick={() => setOpened(true)}>Open settings</Button>
  <Modal
    centered
    opened={opened}
    onClose={() => setOpened(false)}
    title="Account settings"
  >
    <p>Manage your account preferences.</p>
  </Modal>
</>`;

export function ModalPage() {
  const [opened, setOpened] = useState(false);

  return (
    <section className={pageStyles.componentSection} id="modal">
      <div className={pageStyles.sectionHeading}>
        <div>
          <BodyText
            className={pageStyles.eyebrow}
            component="p"
            ff="var(--bb-font-data)"
            fz="0.68rem"
            tone="muted"
          >
            Overlays
          </BodyText>
          <HeadingText level={2} lh={1.5} tone="heading">
            Modal
          </HeadingText>
        </div>
        <code>import {"{ Modal }"} from '@teelur/budget-board-ui';</code>
      </div>
      <BodyText
        className={pageStyles.sectionCopy}
        component="p"
        m="1em 0"
        tone="muted"
      >
        A theme-aware dialog built on Mantine Modal. It keeps Mantine&apos;s
        accessible interaction and styling APIs while using BBUI semantic
        surfaces, text colors, typography, and a 1px border.
      </BodyText>

      <ComponentDemoSection
        description="Use opened and onClose to control visibility; title labels the dialog."
        id="modal-basic"
        title="Basic modal"
        code={basicModalExample}
      >
        <div className={styles.preview}>
          <Button onClick={() => setOpened(true)}>Open settings</Button>
          <Modal
            centered
            onClose={() => setOpened(false)}
            opened={opened}
            title="Account settings"
          >
            <BodyText component="p" m={0}>
              Manage your account preferences.
            </BodyText>
          </Modal>
        </div>
      </ComponentDemoSection>

      <section className={pageStyles.componentReferenceSection} id="modal-api">
        <div className={demoStyles.componentDemoHeading}>
          <div>
            <HeadingText level={3} lh={1.5} tone="heading">
              API reference
            </HeadingText>
            <BodyText
              component="p"
              fz="0.82rem"
              lh={1.55}
              m="0.45rem 0 0"
              tone="secondary"
            >
              Mantine Modal props are forwarded; BBUI adds semantic visual
              defaults and the Chromium inner-layout fix.
            </BodyText>
          </div>
          <a
            aria-label="Link to Modal API reference"
            className={demoStyles.componentDemoAnchor}
            href="#modal-api"
          >
            #
          </a>
        </div>
        <div className={pageStyles.referenceGrid}>
          <div>
            <table>
              <tbody>
                <tr>
                  <th>opened / onClose</th>
                  <td>required</td>
                  <td>
                    Control visibility. Mantine handles focus, Escape, outside
                    clicks, and focus restoration according to its defaults and
                    the related props.
                  </td>
                </tr>
                <tr>
                  <th>title</th>
                  <td>
                    <code>ReactNode</code>
                  </td>
                  <td>
                    Optional dialog title; Mantine uses it as the dialog&apos;s
                    accessible name when provided.
                  </td>
                </tr>
                <tr>
                  <th>p</th>
                  <td>
                    <code>MantineSpacing</code>
                  </td>
                  <td>
                    Defaults to <code>0.5rem</code>. Consumer values override
                    the default. This is Mantine&apos;s root style prop, passed
                    through by the BB wrapper.
                  </td>
                </tr>
                <tr>
                  <th>padding</th>
                  <td>
                    <code>MantineSpacing</code>
                  </td>
                  <td>
                    Controls Mantine Modal content padding; defaults to
                    Mantine&apos;s <code>md</code>.
                  </td>
                </tr>
                <tr>
                  <th>withOverlay / withCloseButton</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>
                    Both default to <code>true</code>. Overlay appearance and
                    behavior use Mantine&apos;s defaults unless configured
                    through <code>overlayProps</code> and other Mantine props.
                  </td>
                </tr>
                <tr>
                  <th>title / body / background</th>
                  <td>BBUI semantic styles</td>
                  <td>
                    The title is rendered with BBUI <code>HeadingText</code>
                    at level <code>2</code> and tone <code>heading</code>;
                    <code>textPrimary</code> for body content, and
                    <code>surface</code> for the content and header
                    background in light and dark color schemes.
                  </td>
                </tr>
                <tr>
                  <th>content border</th>
                  <td>BBUI semantic style</td>
                  <td>
                    A 1px <code>borderSubtle</code> border; custom Mantine
                    styles can override it.
                  </td>
                </tr>
                <tr>
                  <th>inner layout</th>
                  <td>Mantine Modal styles slot</td>
                  <td>
                    Defaults to <code>left: 0</code>, <code>right: 0</code>, and{" "}
                    <code>padding: 0 !important</code> to avoid a Chromium
                    layout issue. The forced zero padding remains in place;
                    consumers can customize other inner slot styles.
                  </td>
                </tr>
                <tr>
                  <th>classNames / styles</th>
                  <td>Mantine Modal styles API</td>
                  <td>
                    Consumer slot classes and styles are merged with BBUI
                    defaults, with consumer values taking precedence except for
                    the Chromium inner padding reset.
                  </td>
                </tr>
                <tr>
                  <th>other props</th>
                  <td>
                    <code>ModalProps</code>
                  </td>
                  <td>
                    Other Mantine Modal props are forwarded without changing
                    their Mantine defaults.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <pre className={pageStyles.codeBlock}>
            <code>{basicModalExample}</code>
          </pre>
        </div>
      </section>
    </section>
  );
}
