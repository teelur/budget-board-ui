import { useState } from "react";
import { BodyText, Button, Checkbox, HeadingText, Popover } from "../../../src";
import type { PopoverProps } from "../../../src";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import demoStyles from "../../components/ComponentDemoSection/ComponentDemoSection.module.css";
import pageStyles from "../Page.module.css";
import styles from "./PopoverPage.module.css";

type PopoverPosition = NonNullable<PopoverProps["position"]>;

const positions: PopoverPosition[] = ["bottom", "top", "right", "left"];

const basicPopoverExample = `const [opened, setOpened] = useState(false);

<Popover opened={opened} onChange={setOpened} withArrow>
  <Popover.Target>
    <Button onClick={() => setOpened((current) => !current)}>
      Show details
    </Button>
  </Popover.Target>
  <Popover.Dropdown>Additional details appear here.</Popover.Dropdown>
</Popover>`;

export function PopoverPage() {
  const [opened, setOpened] = useState(false);
  const [playgroundOpened, setPlaygroundOpened] = useState(false);
  const [playgroundPosition, setPlaygroundPosition] =
    useState<PopoverPosition>("bottom");
  const [playgroundWithArrow, setPlaygroundWithArrow] = useState(true);
  const playgroundCode = `const [opened, setOpened] = useState(false);

<Popover
  opened={opened}
  onChange={setOpened}
  position="${playgroundPosition}"
  withArrow={${playgroundWithArrow}}
>
  <Popover.Target>
    <Button onClick={() => setOpened((current) => !current)}>
      Show preview
    </Button>
  </Popover.Target>
  <Popover.Dropdown maw={280}>
    Account preferences and notification settings.
  </Popover.Dropdown>
</Popover>`;

  return (
    <section className={pageStyles.componentSection} id="popover">
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
            Popover
          </HeadingText>
        </div>
        <code>import {"{ Popover }"} from '@teelur/budget-board-ui';</code>
      </div>
      <BodyText
        className={pageStyles.sectionCopy}
        component="p"
        m="1em 0"
        tone="muted"
      >
        A theme-aware floating panel built on Mantine Popover. The Mantine
        compound API and interaction behavior are preserved, with BBUI semantic
        surfaces, text colors, typography, and a subtle border.
      </BodyText>

      <ComponentDemoSection
        description="Use Popover.Target for the trigger and Popover.Dropdown for the content."
        id="popover-basic"
        title="Basic popover"
        code={basicPopoverExample}
      >
        <div className={styles.preview}>
          <Popover
            onChange={setOpened}
            opened={opened}
            withArrow
            withinPortal={false}
          >
            <Popover.Target>
              <Button onClick={() => setOpened((current) => !current)}>
                Show details
              </Button>
            </Popover.Target>
            <Popover.Dropdown>
              <BodyText component="p" m={0}>
                Additional details appear here.
              </BodyText>
            </Popover.Dropdown>
          </Popover>
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Choose a placement and toggle the arrow, then open the live result."
        id="popover-playground"
        title="API playground"
        code={playgroundCode}
      >
        <div className={styles.playground}>
          <div className={styles.playgroundControls}>
            <div className={styles.controlGrid}>
              <label className={styles.field}>
                <BodyText component="span">Position</BodyText>
                <select
                  onChange={(event) =>
                    setPlaygroundPosition(
                      event.target.value as PopoverPosition,
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
            </div>
            <Checkbox
              checked={playgroundWithArrow}
              className={styles.toggle}
              label="Show arrow"
              onChange={(event) =>
                setPlaygroundWithArrow(event.target.checked)
              }
              size="xs"
            />
          </div>
          <div className={styles.playgroundPreview}>
            <BodyText
              className={styles.previewLabel}
              component="span"
              ff="var(--bb-font-data)"
              fz="0.68rem"
              tone="muted"
            >
              Rendered result
            </BodyText>
            <div className={styles.previewStage}>
              <Popover
                onChange={setPlaygroundOpened}
                opened={playgroundOpened}
                position={playgroundPosition}
                withArrow={playgroundWithArrow}
                withinPortal={false}
              >
                <Popover.Target>
                  <Button
                    onClick={() =>
                      setPlaygroundOpened((current) => !current)
                    }
                  >
                    Show preview
                  </Button>
                </Popover.Target>
                <Popover.Dropdown maw={280}>
                  <BodyText component="p" m={0}>
                    Account preferences and notification settings.
                  </BodyText>
                </Popover.Dropdown>
              </Popover>
            </div>
          </div>
        </div>
      </ComponentDemoSection>

      <section className={pageStyles.componentReferenceSection} id="popover-api">
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
              Mantine Popover props are forwarded; the compound components are
              available as static members on the BBUI Popover.
            </BodyText>
          </div>
          <a
            aria-label="Link to Popover API reference"
            className={demoStyles.componentDemoAnchor}
            href="#popover-api"
          >
            #
          </a>
        </div>
        <div className={pageStyles.referenceGrid}>
          <div>
            <table>
              <tbody>
                <tr>
                  <th>opened / defaultOpened / onChange</th>
                  <td>
                    <code>boolean</code> / <code>boolean</code> / callback
                  </td>
                  <td>
                    Control the open state, or provide an initial state for an
                    uncontrolled popover. <code>defaultOpened</code> defaults
                    to <code>false</code>.
                  </td>
                </tr>
                <tr>
                  <th>Popover.Target</th>
                  <td>required compound component</td>
                  <td>
                    Wraps the target element that toggles the popover. The
                    target element must support a ref.
                  </td>
                </tr>
                <tr>
                  <th>Popover.Dropdown / Popover.ContextMenu</th>
                  <td>compound components</td>
                  <td>
                    Provide the floating content. <code>Popover.ContextMenu</code>
                    is also forwarded from Mantine for context-menu behavior.
                  </td>
                </tr>
                <tr>
                  <th>position / offset / width</th>
                  <td>Mantine values</td>
                  <td>
                    Position defaults to <code>bottom</code>, offset to{" "}
                    <code>8</code>, and width to <code>max-content</code>.
                  </td>
                </tr>
                <tr>
                  <th>withArrow / arrowSize / arrowOffset</th>
                  <td>
                    <code>boolean</code> / <code>number</code> /{" "}
                    <code>number</code>
                  </td>
                  <td>
                    Arrow defaults to <code>false</code>, with size{" "}
                    <code>7px</code> and offset <code>5px</code>.
                  </td>
                </tr>
                <tr>
                  <th>closeOnClickOutside / closeOnEscape / trapFocus</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>
                    Defaults are <code>true</code>, <code>true</code>, and{" "}
                    <code>false</code>, respectively. Mantine controls the
                    related focus and dismissal behavior.
                  </td>
                </tr>
                <tr>
                  <th>withinPortal</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>
                    Defaults to <code>true</code>; set to <code>false</code> to
                    render the dropdown beside its target in the DOM.
                  </td>
                </tr>
                <tr>
                  <th>background / border / text / typography</th>
                  <td>BBUI semantic styles</td>
                  <td>
                    The dropdown uses the <code>page</code> background,{" "}
                    <code>borderSubtle</code>, <code>textPrimary</code>, and
                    the BBUI body font in both color schemes. The arrow matches
                    the dropdown surface and border.
                  </td>
                </tr>
                <tr>
                  <th>classNames / styles</th>
                  <td>Mantine Popover styles API</td>
                  <td>
                    Consumer slot classes and styles are merged with BBUI
                    dropdown defaults, with consumer values taking precedence.
                  </td>
                </tr>
                <tr>
                  <th>other props</th>
                  <td>
                    <code>PopoverProps</code>
                  </td>
                  <td>
                    Other Mantine Popover props are forwarded without changing
                    their Mantine defaults.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </section>
  );
}
