import { useState } from "react";
import {
  Checkbox,
  Progress,
  progressColors,
  progressTypes,
} from "../../../src";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import demoStyles from "../../components/ComponentDemoSection/ComponentDemoSection.module.css";
import pageStyles from "../Page.module.css";
import styles from "./ProgressPage.module.css";
import { BodyText, HeadingText } from "../../../src";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function ProgressPage() {
  const [selectedColor, setSelectedColor] =
    useState<(typeof progressColors)[number]>("primary");
  const [selectedType, setSelectedType] =
    useState<(typeof progressTypes)[number]>("default");
  const [selectedSize, setSelectedSize] =
    useState<(typeof sizes)[number]>("md");
  const [value, setValue] = useState(68);
  const [amount, setAmount] = useState(-85);
  const [limit, setLimit] = useState(100);
  const [warningThreshold, setWarningThreshold] = useState(80);
  const [showLabel, setShowLabel] = useState(true);
  const [showProjection, setShowProjection] = useState(true);
  const [isStriped, setIsStriped] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  const handleTypeChange = (type: (typeof progressTypes)[number]) => {
    setSelectedType(type);

    if (type === "income") {
      setAmount(Math.abs(amount));
    } else if (type === "expense") {
      setAmount(-Math.abs(amount));
    }
  };

  const playgroundProps = [
    ...(selectedType === "default" ? [`value={${value}}`] : []),
    `color="${selectedColor}"`,
    `size="${selectedSize}"`,
    ...(selectedType === "default"
      ? []
      : [
          `amount={${amount}}`,
          `limit={${limit}}`,
          `type="${selectedType}"`,
          selectedType === "expense" &&
            `warningThreshold={${warningThreshold}}`,
        ]),
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
          <BodyText component="p" className={pageStyles.eyebrow}>Feedback</BodyText>
          <HeadingText level={2}>Progress</HeadingText>
        </div>
        <code>import {"{ Progress }"} from '@teelur/budget-board-ui';</code>
      </div>
      <BodyText component="p" className={pageStyles.sectionCopy}>
        A themed Mantine progress bar for a single value or a sequence of
        labeled sections. Values are clamped to the 0–100 range; enable the
        optional label to display the primary value as a percentage. For income
        and expense progress, amount and limit determine the percentage and
        status color; value is optional and overrides the derived percentage.
      </BodyText>

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
              <BodyText component="span">{capitalize(color)}</BodyText>
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
        description="Income stays info-colored until its limit is met, then turns green. Expense amounts are negative; their color turns warning at the threshold and error after exceeding the limit."
        id="progress-responsive-colors"
        title="Responsive colors"
        code={`<Progress
  amount={-85}
  ariaLabel="Monthly expenses"
  limit={100}
  type="expense"
/>`}
      >
        <div className={styles.stack}>
          <Progress
            amount={720}
            ariaLabel="Monthly income"
            limit={800}
            type="income"
          />
          <Progress
            amount={-85}
            ariaLabel="Monthly expenses"
            limit={100}
            type="expense"
          />
          <Progress
            amount={-105}
            ariaLabel="Over-budget expenses"
            limit={100}
            type="expense"
          />
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
              {selectedType === "default" && (
                <label className={styles.field}>
                  <BodyText component="span">Value</BodyText>
                  <input
                    max={120}
                    min={0}
                    onChange={(event) => setValue(Number(event.target.value))}
                    type="range"
                    value={value}
                  />
                  <output>{value}</output>
                </label>
              )}
              <label className={styles.field}>
                <BodyText component="span">Type</BodyText>
                <select
                  onChange={(event) =>
                    handleTypeChange(
                      event.target.value as (typeof progressTypes)[number],
                    )
                  }
                  value={selectedType}
                >
                  {progressTypes.map((type) => (
                    <option key={type} value={type}>
                      {capitalize(type)}
                    </option>
                  ))}
                </select>
              </label>
              {selectedType !== "default" && (
                <>
                  <label className={styles.field}>
                    <BodyText component="span">
                      {selectedType === "expense"
                        ? "Amount (negative)"
                        : "Amount"}
                    </BodyText>
                    <input
                      max={selectedType === "expense" ? 0 : 120}
                      min={selectedType === "expense" ? -120 : 0}
                      onChange={(event) =>
                        setAmount(Number(event.target.value))
                      }
                      step={1}
                      type="range"
                      value={amount}
                    />
                    <output>{amount}</output>
                  </label>
                  <label className={styles.field}>
                    <BodyText component="span">Limit</BodyText>
                    <input
                      max={150}
                      min={1}
                      onChange={(event) => setLimit(Number(event.target.value))}
                      step={1}
                      type="range"
                      value={limit}
                    />
                    <output>{limit}</output>
                  </label>
                  {selectedType === "expense" && (
                    <label className={styles.field}>
                      <BodyText component="span">Warning Threshold</BodyText>
                      <input
                        max={100}
                        min={0}
                        onChange={(event) =>
                          setWarningThreshold(Number(event.target.value))
                        }
                        step={5}
                        type="range"
                        value={warningThreshold}
                      />
                      <output>{warningThreshold}%</output>
                    </label>
                  )}
                </>
              )}
              <label className={styles.field}>
                <BodyText component="span">Color</BodyText>
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
                <BodyText component="span">Size</BodyText>
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
              <Checkbox
                checked={showLabel}
                className={styles.toggle}
                label="Show Label"
                onChange={(event) => setShowLabel(event.target.checked)}
                size="xs"
              />
              <Checkbox
                checked={showProjection}
                className={styles.toggle}
                label="Projected Section"
                onChange={(event) => setShowProjection(event.target.checked)}
                size="xs"
              />
              <Checkbox
                checked={isStriped}
                className={styles.toggle}
                label="Striped Primary"
                onChange={(event) => setIsStriped(event.target.checked)}
                size="xs"
              />
              <Checkbox
                checked={isAnimated}
                className={styles.toggle}
                label="Animate Stripes"
                onChange={(event) => setIsAnimated(event.target.checked)}
                size="xs"
              />
            </div>
          </div>
          <div className={styles.playgroundPreview}>
            <BodyText component="span" className={styles.previewLabel}>Rendered result</BodyText>
            <div className={styles.previewStage}>
              <Progress
                {...(selectedType === "default"
                  ? { value }
                  : {
                      amount,
                      limit,
                      type: selectedType,
                      ...(selectedType === "expense"
                        ? { warningThreshold }
                        : {}),
                    })}
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
            <HeadingText level={3}>API reference</HeadingText>
            <BodyText component="p">Every public prop, its accepted values, and its default.</BodyText>
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
                  <td>
                    Required for default type; optional for income/expense,
                    where it overrides the derived percentage; clamped to 0–100
                  </td>
                </tr>
                <tr>
                  <th>color</th>
                  <td>
                    <code>{progressColors.join(" | ")}</code>
                  </td>
                  <td>
                    primary; overridden by responsive status when configured
                  </td>
                </tr>
                <tr>
                  <th>amount / limit</th>
                  <td>
                    <code>number</code>
                  </td>
                  <td>
                    Required with <code>type="income"</code> or{" "}
                    <code>type="expense"</code> to calculate percentage and
                    status color; expense amounts are negative; a non-positive
                    limit derives a 0% fill
                  </td>
                </tr>
                <tr>
                  <th>type</th>
                  <td>
                    <code>{progressTypes.join(" | ")}</code>
                  </td>
                  <td>default; income and expense enable responsive colors</td>
                </tr>
                <tr>
                  <th>warningThreshold</th>
                  <td>
                    <code>number</code>
                  </td>
                  <td>80; expense warning percentage of limit</td>
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
