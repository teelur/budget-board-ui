import { useState } from "react";
import { Progress, progressColors } from "../../../src";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import demoStyles from "../../components/ComponentDemoSection/ComponentDemoSection.module.css";
import pageStyles from "../Page.module.css";
import styles from "./ProgressPage.module.css";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function ProgressPage() {
  const [selectedColor, setSelectedColor] =
    useState<(typeof progressColors)[number]>("primary");
  const [selectedSize, setSelectedSize] =
    useState<(typeof sizes)[number]>("md");
  const [value, setValue] = useState(68);
  const [showLabel, setShowLabel] = useState(true);
  const [showProjection, setShowProjection] = useState(true);
  const [isStriped, setIsStriped] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  const playgroundProps = [
    `value={${value}}`,
    `color="${selectedColor}"`,
    `size="${selectedSize}"`,
    showLabel && "label",
    'ariaLabel="Current progress"',
    isStriped && "striped",
    isAnimated && "animated",
    showProjection &&
      'sections={[{ value: 14, color: "muted", ariaLabel: "Projected amount", striped: true }]}',
  ].filter(Boolean);
  const playgroundCode = `<Progress\n${playgroundProps.map((prop) => `  ${prop}`).join("\n")}\n/>`;

  return (
    <section className={pageStyles.componentSection} id="progress">
      <div className={pageStyles.sectionHeading}>
        <div>
          <p className={pageStyles.eyebrow}>Feedback</p>
          <h2>Progress</h2>
        </div>
        <code>import {"{ Progress }"} from '@teelur/budget-board-ui';</code>
      </div>
      <p className={pageStyles.sectionCopy}>
        A themed Mantine progress bar for a single value or a sequence of
        labeled sections. Values are clamped to the 0–100 range; enable the
        optional label to display the primary value as a percentage.
      </p>

      <ComponentDemoSection
        description="Show the computed percentage beside the bar and give the primary section an accessible name."
        id="progress-basic"
        title="Basic usage"
        code={`<Progress\n  ariaLabel="Current progress"\n  label\n  value={68}\n/>`}
      >
        <div className={styles.stack}>
          <Progress ariaLabel="Current progress" label value={68} />
          <Progress ariaLabel="Complete progress" color="success" value={100} />
          <Progress ariaLabel="Clamped progress" value={120} />
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Semantic fills follow the active Budget Board color palette in light and dark themes."
        id="progress-colors"
        title="Colors"
        code={progressColors
          .map(
            (color) =>
              `<Progress ariaLabel="${capitalize(color)} progress" color="${color}" value={56} />`,
          )
          .join("\n")}
      >
        <div className={styles.colorList}>
          {progressColors.map((color) => (
            <div className={styles.colorRow} key={color}>
              <span>{capitalize(color)}</span>
              <Progress
                ariaLabel={`${capitalize(color)} progress`}
                color={color}
                value={56}
              />
            </div>
          ))}
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Sections represent consecutive parts of the total. Give each section an accessible name; use striped styling for a projected or secondary portion."
        id="progress-sections"
        title="Sections"
        code={`<Progress
  ariaLabel="Actual spending"
  color="warning"
  label
  sections={[
    {
      value: 14,
      color: "muted",
      ariaLabel: "Projected recurring transactions",
      striped: true,
    },
  ]}
  value={68}
/>`}
      >
        <div className={styles.stack}>
          <Progress
            ariaLabel="Actual spending"
            color="warning"
            label
            sections={[
              {
                ariaLabel: "Projected recurring transactions",
                color: "muted",
                striped: true,
                value: 14,
              },
            ]}
            value={68}
          />
          <Progress
            animated
            ariaLabel="Upload progress"
            color="info"
            striped
            value={42}
          />
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Adjust the public props and inspect the resulting progress bar. Values above 100 remain clamped visually."
        id="progress-playground"
        title="Playground"
        code={playgroundCode}
      >
        <div className={styles.playground}>
          <div className={styles.playgroundControls}>
            <div className={styles.controlGrid}>
              <label className={styles.field}>
                <span>Value</span>
                <input
                  max={120}
                  min={0}
                  onChange={(event) => setValue(Number(event.target.value))}
                  type="range"
                  value={value}
                />
                <output>{value}</output>
              </label>
              <label className={styles.field}>
                <span>Color</span>
                <select
                  onChange={(event) =>
                    setSelectedColor(event.target.value as typeof selectedColor)
                  }
                  value={selectedColor}
                >
                  {progressColors.map((color) => (
                    <option key={color} value={color}>
                      {capitalize(color)}
                    </option>
                  ))}
                </select>
              </label>
              <label className={styles.field}>
                <span>Size</span>
                <select
                  onChange={(event) =>
                    setSelectedSize(event.target.value as typeof selectedSize)
                  }
                  value={selectedSize}
                >
                  {sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className={styles.toggles}>
              <label className={styles.toggle}>
                <input
                  checked={showLabel}
                  onChange={(event) => setShowLabel(event.target.checked)}
                  type="checkbox"
                />
                <span>Show Label</span>
              </label>
              <label className={styles.toggle}>
                <input
                  checked={showProjection}
                  onChange={(event) => setShowProjection(event.target.checked)}
                  type="checkbox"
                />
                <span>Projected Section</span>
              </label>
              <label className={styles.toggle}>
                <input
                  checked={isStriped}
                  onChange={(event) => setIsStriped(event.target.checked)}
                  type="checkbox"
                />
                <span>Striped Primary</span>
              </label>
              <label className={styles.toggle}>
                <input
                  checked={isAnimated}
                  onChange={(event) => setIsAnimated(event.target.checked)}
                  type="checkbox"
                />
                <span>Animate Stripes</span>
              </label>
            </div>
          </div>
          <div className={styles.playgroundPreview}>
            <span className={styles.previewLabel}>Rendered result</span>
            <div className={styles.previewStage}>
              <Progress
                animated={isAnimated}
                ariaLabel="Current progress"
                color={selectedColor}
                label={showLabel}
                {...(showProjection
                  ? {
                      sections: [
                        {
                          animated: isAnimated,
                          ariaLabel: "Projected amount",
                          color: "muted" as const,
                          striped: true,
                          value: 14,
                        },
                      ],
                    }
                  : {})}
                size={selectedSize}
                striped={isStriped}
                value={value}
              />
            </div>
          </div>
        </div>
      </ComponentDemoSection>

      <section
        className={pageStyles.componentReferenceSection}
        id="progress-api"
      >
        <div className={demoStyles.componentDemoHeading}>
          <div>
            <h3>API reference</h3>
            <p>Every public prop, its accepted values, and its default.</p>
          </div>
          <a
            aria-label="Link to API reference section"
            className={demoStyles.componentDemoAnchor}
            href="#progress-api"
          >
            #
          </a>
        </div>
        <div className={pageStyles.referenceGrid}>
          <div>
            <table>
              <tbody>
                <tr>
                  <th>value</th>
                  <td>
                    <code>number</code>
                  </td>
                  <td>required; clamped to 0–100</td>
                </tr>
                <tr>
                  <th>color</th>
                  <td>
                    <code>{progressColors.join(" | ")}</code>
                  </td>
                  <td>primary</td>
                </tr>
                <tr>
                  <th>label</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>
                    false; displays the clamped percentage to the right of the
                    bar
                  </td>
                </tr>
                <tr>
                  <th>ariaLabel</th>
                  <td>
                    <code>string</code>
                  </td>
                  <td>required; names the primary progress section</td>
                </tr>
                <tr>
                  <th>striped / animated</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>false</td>
                </tr>
                <tr>
                  <th>sections</th>
                  <td>
                    <code>ProgressSection[]</code>
                  </td>
                  <td>none</td>
                </tr>
                <tr>
                  <th>ProgressSection.value</th>
                  <td>
                    <code>number</code>
                  </td>
                  <td>required; clamped to 0–100</td>
                </tr>
                <tr>
                  <th>ProgressSection.color</th>
                  <td>
                    <code>{progressColors.join(" | ")}</code>
                  </td>
                  <td>inherits color</td>
                </tr>
                <tr>
                  <th>ProgressSection.ariaLabel</th>
                  <td>
                    <code>string</code>
                  </td>
                  <td>required</td>
                </tr>
                <tr>
                  <th>ProgressSection.striped / animated</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>false</td>
                </tr>
                <tr>
                  <th>size</th>
                  <td>
                    <code>MantineSize | string | number</code>
                  </td>
                  <td>Mantine default</td>
                </tr>
                <tr>
                  <th>radius</th>
                  <td>
                    <code>MantineRadius | number</code>
                  </td>
                  <td>xl</td>
                </tr>
                <tr>
                  <th>w</th>
                  <td>
                    <code>BoxProps["w"]</code>
                  </td>
                  <td>100%</td>
                </tr>
                <tr>
                  <th>transitionDuration / orientation / autoContrast</th>
                  <td>
                    <code>Mantine ProgressRootProps</code>
                  </td>
                  <td>Mantine defaults</td>
                </tr>
                <tr>
                  <th>style, className, other root attributes</th>
                  <td>
                    <code>ProgressRootProps</code>
                  </td>
                  <td>forwarded to Mantine Progress.Root</td>
                </tr>
              </tbody>
            </table>
          </div>
          <pre className={pageStyles.codeBlock}>
            <code>{`<Progress
  ariaLabel="Actual spending"
  color="warning"
  label
  sections={[
    {
      value: 14,
      color: "muted",
      ariaLabel: "Projected recurring transactions",
      striped: true,
    },
  ]}
  value={68}
/>`}</code>
          </pre>
        </div>
      </section>
    </section>
  );
}
