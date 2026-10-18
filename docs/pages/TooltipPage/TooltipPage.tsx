import { BodyText, Button, HeadingText, Tooltip } from "../../../src";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import demoStyles from "../../components/ComponentDemoSection/ComponentDemoSection.module.css";
import pageStyles from "../Page.module.css";

const basicTooltipExample = `<Tooltip label="Explain this setting." withArrow>
  <Button variant="outline">Monthly limit</Button>
</Tooltip>`;

export function TooltipPage() {
  return (
    <section className={pageStyles.componentSection} id="tooltip">
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
            Tooltip
          </HeadingText>
        </div>
        <code>import {"{ Tooltip }"} from '@teelur/budget-board-ui';</code>
      </div>
      <BodyText
        className={pageStyles.sectionCopy}
        component="p"
        m="1em 0"
        tone="muted"
      >
        A theme-aware tooltip built on Mantine Tooltip. Mantine&apos;s props,
        trigger behavior, and accessibility are preserved, with a BBUI overlay
        surface, semantic text color, and body typography. Its
        colors adapt to the active light or dark scheme.
      </BodyText>

      <ComponentDemoSection
        description="Hover or focus the trigger to reveal its label. Mantine controls positioning, timing, and interaction behavior."
        id="tooltip-basic"
        title="Basic tooltip"
        code={basicTooltipExample}
      >
        <Tooltip
          label="Explain this setting."
          opened
          position="top"
          withArrow
          withinPortal={false}
        >
          <Button variant="outline">Monthly limit</Button>
        </Tooltip>
      </ComponentDemoSection>

      <section className={pageStyles.componentReferenceSection} id="tooltip-api">
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
              Tooltip forwards Mantine Tooltip props and applies BBUI semantic
              defaults to its content and optional arrow.
            </BodyText>
          </div>
          <a
            aria-label="Link to Tooltip API reference"
            className={demoStyles.componentDemoAnchor}
            href="#tooltip-api"
          >
            #
          </a>
        </div>
        <div className={pageStyles.referenceGrid}>
          <div>
            <table>
              <tbody>
                <tr>
                  <th>TooltipProps</th>
                  <td>Mantine Tooltip props</td>
                  <td>
                    All Mantine Tooltip props, including DOM attributes, are
                    forwarded without changing Mantine defaults.
                  </td>
                </tr>
                <tr>
                  <th>label</th>
                  <td>React content</td>
                  <td>The content displayed when the tooltip is open.</td>
                </tr>
                <tr>
                  <th>position / offset / withArrow</th>
                  <td>Mantine values</td>
                  <td>
                    Control placement, distance from the target, and whether
                    the arrow is shown.
                  </td>
                </tr>
                <tr>
                  <th>opened / defaultOpened / onChange</th>
                  <td>Mantine control props</td>
                  <td>
                    Control or observe the open state; otherwise Mantine opens
                    the tooltip in response to its configured events.
                  </td>
                </tr>
                <tr>
                  <th>background / border / text / typography</th>
                  <td>BBUI semantic styles</td>
                  <td>
                    The tooltip uses the <code>surfaceOverlay</code>{" "}
                    background, <code>borderSubtle</code>,{" "}
                    <code>textPrimary</code>, and the BBUI body font. These
                    semantic colors follow the active color scheme, and its
                    arrow matches the surface and border.
                  </td>
                </tr>
                <tr>
                  <th>classNames / styles</th>
                  <td>Mantine Tooltip styles API</td>
                  <td>
                    Consumer slot classes and styles are merged with BBUI
                    defaults, with consumer values taking precedence.
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
