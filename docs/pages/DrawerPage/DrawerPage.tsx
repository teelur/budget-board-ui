import { useState } from "react";
import { Button, Checkbox, Drawer } from "../../../src";
import type { DrawerProps } from "../../../src";
import { BodyText, HeadingText } from "../../../src";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import demoStyles from "../../components/ComponentDemoSection/ComponentDemoSection.module.css";
import pageStyles from "../Page.module.css";
import styles from "./DrawerPage.module.css";

type DrawerPosition = NonNullable<DrawerProps["position"]>;

const positions: DrawerPosition[] = ["left", "right", "top", "bottom"];

const basicDrawerExample = `const [opened, setOpened] = useState(false);

<>
  <Button onClick={() => setOpened(true)}>Open settings</Button>
  <Drawer
    opened={opened}
    onClose={() => setOpened(false)}
    title="Account settings"
  >
    <p>Manage your account preferences.</p>
  </Drawer>
</>`;

export function DrawerPage() {
  const [opened, setOpened] = useState(false);
  const [playgroundOpened, setPlaygroundOpened] = useState(false);
  const [playgroundTitle, setPlaygroundTitle] = useState("Account settings");
  const [playgroundPosition, setPlaygroundPosition] =
    useState<DrawerPosition>("left");
  const [playgroundSize, setPlaygroundSize] = useState("md");
  const [playgroundWithOverlay, setPlaygroundWithOverlay] = useState(true);
  const [playgroundWithCloseButton, setPlaygroundWithCloseButton] =
    useState(true);
  const renderedPlaygroundTitle = playgroundTitle || "Drawer title";
  const playgroundCode = `const [opened, setOpened] = useState(false);

<>
  <Button onClick={() => setOpened(true)}>Open preview</Button>
  <Drawer
    opened={opened}
    onClose={() => setOpened(false)}
    position="${playgroundPosition}"
    size="${playgroundSize}"
    title={${JSON.stringify(renderedPlaygroundTitle)}}
    withOverlay={${playgroundWithOverlay}}
    withCloseButton={${playgroundWithCloseButton}}
  >
    Manage your account preferences.
  </Drawer>
</>`;

  return (
    <section className={pageStyles.componentSection} id="drawer">
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
            Drawer
          </HeadingText>
        </div>
        <code>import {"{ Drawer }"} from '@teelur/budget-board-ui';</code>
      </div>
      <BodyText
        className={pageStyles.sectionCopy}
        component="p"
        m="1em 0"
        tone="muted"
      >
        A theme-aware panel built on Mantine Drawer. It preserves Mantine&apos;s
        component props and interaction behavior while using BBUI semantic
        surfaces, text colors, typography, and a subtle border.
      </BodyText>

      <ComponentDemoSection
        description="Use opened and onClose to control visibility; title labels the drawer."
        id="drawer-basic"
        title="Basic drawer"
        code={basicDrawerExample}
      >
        <div className={styles.preview}>
          <Button onClick={() => setOpened(true)}>Open settings</Button>
          <Drawer
            onClose={() => setOpened(false)}
            opened={opened}
            title="Account settings"
          >
            <BodyText component="p" m={0}>
              Manage your account preferences.
            </BodyText>
          </Drawer>
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Configure representative Drawer props, open the live result, and view the matching JSX."
        id="drawer-playground"
        title="API playground"
        code={playgroundCode}
      >
        <div className={styles.playground}>
          <div className={styles.playgroundControls}>
            <div className={styles.controlGrid}>
              <label className={styles.field}>
                <BodyText component="span">Title</BodyText>
                <input
                  onChange={(event) => setPlaygroundTitle(event.target.value)}
                  type="text"
                  value={playgroundTitle}
                />
              </label>
              <label className={styles.field}>
                <BodyText component="span">Position</BodyText>
                <select
                  onChange={(event) =>
                    setPlaygroundPosition(
                      event.target.value as DrawerPosition,
                    )
                  }
                  value={playgroundPosition}
                >
                  {positions.map((position) => (
                    <option key={position} value={position}>
                      {position}
                    </option>
                  ))}
                </select>
              </label>
              <label className={styles.field}>
                <BodyText component="span">Size</BodyText>
                <select
                  onChange={(event) => setPlaygroundSize(event.target.value)}
                  value={playgroundSize}
                >
                  <option value="xs">Extra small</option>
                  <option value="sm">Small</option>
                  <option value="md">Medium</option>
                  <option value="lg">Large</option>
                  <option value="xl">Extra large</option>
                </select>
              </label>
            </div>
            <Checkbox
              checked={playgroundWithOverlay}
              className={styles.toggle}
              label="Show overlay"
              onChange={(event) =>
                setPlaygroundWithOverlay(event.target.checked)
              }
              size="xs"
            />
            <Checkbox
              checked={playgroundWithCloseButton}
              className={styles.toggle}
              label="Show close button"
              onChange={(event) =>
                setPlaygroundWithCloseButton(event.target.checked)
              }
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
              <Button onClick={() => setPlaygroundOpened(true)}>
                Open preview
              </Button>
              <Drawer
                onClose={() => setPlaygroundOpened(false)}
                opened={playgroundOpened}
                position={playgroundPosition}
                size={playgroundSize}
                title={renderedPlaygroundTitle}
                withCloseButton={playgroundWithCloseButton}
                withOverlay={playgroundWithOverlay}
              >
                <BodyText component="p" m={0}>
                  Manage your account preferences.
                </BodyText>
              </Drawer>
            </div>
          </div>
        </div>
      </ComponentDemoSection>

      <section className={pageStyles.componentReferenceSection} id="drawer-api">
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
              Mantine Drawer component props are forwarded; BBUI adds semantic
              visual defaults without adding outer spacing around the panel.
            </BodyText>
          </div>
          <a
            aria-label="Link to Drawer API reference"
            className={demoStyles.componentDemoAnchor}
            href="#drawer-api"
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
                    Optional drawer title; Mantine uses it as the dialog&apos;s
                    accessible name when provided.
                  </td>
                </tr>
                <tr>
                  <th>position</th>
                  <td>
                    <code>left | right | top | bottom</code>
                  </td>
                  <td>
                    Side of the screen where the drawer opens; defaults to{" "}
                    <code>left</code>.
                  </td>
                </tr>
                <tr>
                  <th>size</th>
                  <td>
                    <code>MantineSize | CSS length | number</code>
                  </td>
                  <td>
                    Defaults to <code>md</code>; controls width for left/right
                    drawers and height for top/bottom drawers.
                  </td>
                </tr>
                <tr>
                  <th>offset / radius</th>
                  <td>Mantine values</td>
                  <td>
                    Offset defaults to <code>0</code>; radius defaults to{" "}
                    <code>0</code>. Both retain Mantine&apos;s accepted values.
                  </td>
                </tr>
                <tr>
                  <th>p</th>
                  <td>
                    <code>MantineSpacing</code>
                  </td>
                  <td>
                    No outer root spacing is added by default, so the panel
                    reaches the viewport edge. Set <code>p</code> to inset it.
                  </td>
                </tr>
                <tr>
                  <th>padding</th>
                  <td>
                    <code>MantineSpacing</code>
                  </td>
                  <td>
                    Controls Mantine content, header, and footer padding;
                    defaults to Mantine&apos;s <code>md</code>.
                  </td>
                </tr>
                <tr>
                  <th>withOverlay / withCloseButton</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>
                    Both default to <code>true</code>. Overlay appearance and
                    behavior can be configured through <code>overlayProps</code>
                    and other Mantine props.
                  </td>
                </tr>
                <tr>
                  <th>title / body / panel / border</th>
                  <td>BBUI semantic styles</td>
                  <td>
                    The title uses BBUI <code>HeadingText</code> at level{" "}
                    <code>5</code>; body text uses <code>textPrimary</code>, and
                    the panel uses <code>surface</code> with a 1px{" "}
                    <code>borderSubtle</code> border in both color schemes.
                  </td>
                </tr>
                <tr>
                  <th>classNames / styles</th>
                  <td>Mantine styles API</td>
                  <td>
                    Consumer slot classes and styles, including callback forms,
                    are merged with BBUI defaults; consumer values take
                    precedence.
                  </td>
                </tr>
                <tr>
                  <th>other props</th>
                  <td>
                    <code>DrawerProps</code>
                  </td>
                  <td>
                    The full Mantine Drawer component prop API is forwarded,
                    including props for transitions, scroll locking, focus,
                    portals, close behavior, and the overlay and close button.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <pre className={pageStyles.codeBlock}>
            <code>{`import { Drawer } from "@teelur/budget-board-ui";

<Drawer
  opened={opened}
  onClose={closeDrawer}
  position="left"
  size="md"
  title="Account settings"
>
  Drawer content
</Drawer>`}</code>
          </pre>
        </div>
      </section>
    </section>
  );
}
