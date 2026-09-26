import { useState } from "react";
import {
  SegmentedControl,
  segmentedControlColors,
  segmentedControlSizes,
  segmentedControlVariants,
} from "../../../src";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import demoStyles from "../../components/ComponentDemoSection/ComponentDemoSection.module.css";
import pageStyles from "../Page.module.css";
import styles from "./SegmentedControlPage.module.css";

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

const periodData = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" },
];

const accessibleName = "Period";

const standardSizes = segmentedControlSizes.filter(
  (size) => !size.startsWith("compact-"),
);
const compactSizes = segmentedControlSizes.filter((size) =>
  size.startsWith("compact-"),
);

export function SegmentedControlPage() {
  const [selectedColor, setSelectedColor] =
    useState<(typeof segmentedControlColors)[number]>("primary");
  const [selectedVariant, setSelectedVariant] =
    useState<(typeof segmentedControlVariants)[number]>("filled");
  const [selectedSize, setSelectedSize] =
    useState<(typeof segmentedControlSizes)[number]>("md");
  const [isFullWidth, setIsFullWidth] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [playgroundValue, setPlaygroundValue] = useState("week");

  const playgroundProps = [
    `data={data}`,
    `aria-label="${accessibleName}"`,
    `color="${selectedColor}"`,
    `variant="${selectedVariant}"`,
    `size="${selectedSize}"`,
    isFullWidth && "fullWidth",
    isDisabled && "disabled",
  ].filter(Boolean);
  const playgroundCode = `<SegmentedControl
${playgroundProps.map((prop) => `  ${prop}`).join("\n")}
  value={value}
  onChange={setValue}
/>`;

  return (
    <section className={pageStyles.componentSection} id="segmented-control">
      <div className={pageStyles.sectionHeading}>
        <div>
          <p className={pageStyles.eyebrow}>Inputs</p>
          <h2>SegmentedControl</h2>
        </div>
        <code>
          import {"{ SegmentedControl }"} from '@teelur/budget-board-ui';
        </code>
      </div>
      <p className={pageStyles.sectionCopy}>
        A radiogroup for picking one option from a small, always-visible set,
        with an animated indicator that follows the active segment.
      </p>

      <ComponentDemoSection
        description="Pass a data array of value/label pairs plus a value and onChange to control the selection."
        id="segmented-control-basic"
        title="Basic usage"
        code={`const [value, setValue] = useState("week");

<SegmentedControl
  aria-label="Period"
  data={${JSON.stringify(periodData)}}
  value={value}
  onChange={setValue}
/>`}
      >
        <SegmentedControl
          aria-label={accessibleName}
          data={periodData}
          onChange={setPlaygroundValue}
          value={playgroundValue}
        />
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Semantic colors tint the animated indicator behind the active segment."
        id="segmented-control-colors"
        title="Colors"
        code={segmentedControlColors
          .map(
            (color) =>
              `<SegmentedControl aria-label="Period" color="${color}" data={data} defaultValue="day" />`,
          )
          .join("\n")}
      >
        <div className={styles.stack}>
          {segmentedControlColors.map((color) => (
            <SegmentedControl
              aria-label={accessibleName}
              color={color}
              data={periodData}
              defaultValue="day"
              key={color}
            />
          ))}
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Use filled, outline, or ghost treatments to establish hierarchy."
        id="segmented-control-variants"
        title="Variants"
        code={segmentedControlVariants
          .map(
            (variant) =>
              `<SegmentedControl aria-label="Period" variant="${variant}" data={data} defaultValue="day" />`,
          )
          .join("\n")}
      >
        <div className={styles.stack}>
          {segmentedControlVariants.map((variant) => (
            <SegmentedControl
              aria-label={accessibleName}
              data={periodData}
              defaultValue="day"
              key={variant}
              variant={variant}
            />
          ))}
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Scale the control to match the density of its surrounding layout."
        id="segmented-control-sizes"
        title="Sizes"
        code={standardSizes
          .map(
            (size) =>
              `<SegmentedControl aria-label="Period" size="${size}" data={data} defaultValue="day" />`,
          )
          .join("\n")}
      >
        <div className={styles.stack}>
          {standardSizes.map((size) => (
            <SegmentedControl
              aria-label={accessibleName}
              data={periodData}
              defaultValue="day"
              key={size}
              size={size}
            />
          ))}
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Use compact sizes when the surrounding layout calls for a tighter control."
        id="segmented-control-compact-sizes"
        title="Compact sizes"
        code={compactSizes
          .map(
            (size) =>
              `<SegmentedControl aria-label="Period" size="${size}" data={data} defaultValue="day" />`,
          )
          .join("\n")}
      >
        <div className={styles.stack}>
          {compactSizes.map((size) => (
            <SegmentedControl
              aria-label={accessibleName}
              data={periodData}
              defaultValue="day"
              key={size}
              size={size}
            />
          ))}
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Segments can carry an icon alongside their label, and can be disabled individually or as a whole group."
        id="segmented-control-icons-disabled"
        title="Icons & disabled"
        code={`<SegmentedControl
  data={[
    { value: "list", label: "List", leftSection: "\u2261" },
    { value: "grid", label: "Grid", leftSection: "\u25a6", disabled: true },
  ]}
  defaultValue="list"
/>
<SegmentedControl aria-label="Period" data={data} defaultValue="day" disabled />`}
      >
        <div className={styles.stack}>
          <SegmentedControl
            aria-label="View"
            data={[
              { value: "list", label: "List", leftSection: "\u2261" },
              {
                value: "grid",
                label: "Grid",
                leftSection: "\u25a6",
                disabled: true,
              },
            ]}
            defaultValue="list"
          />
          <SegmentedControl
            aria-label="Period"
            data={periodData}
            defaultValue="day"
            disabled
          />
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Stretch the control across its container so every segment shares the available width equally."
        id="segmented-control-full-width"
        title="Full width"
        code={`<SegmentedControl aria-label="Period" data={data} defaultValue="day" fullWidth />`}
      >
        <SegmentedControl
          aria-label="Period"
          data={periodData}
          defaultValue="day"
          fullWidth
        />
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Adjust the public props together and see the resulting control immediately."
        id="segmented-control-playground"
        title="Playground"
        code={playgroundCode}
      >
        <div className={styles.playground}>
          <div className={styles.playgroundControls}>
            <label className={styles.field}>
              <span>Color</span>
              <select
                onChange={(event) =>
                  setSelectedColor(event.target.value as typeof selectedColor)
                }
                value={selectedColor}
              >
                {segmentedControlColors.map((color) => (
                  <option key={color} value={color}>
                    {capitalize(color)}
                  </option>
                ))}
              </select>
            </label>
            <label className={styles.field}>
              <span>Variant</span>
              <select
                onChange={(event) =>
                  setSelectedVariant(
                    event.target.value as typeof selectedVariant,
                  )
                }
                value={selectedVariant}
              >
                {segmentedControlVariants.map((variant) => (
                  <option key={variant} value={variant}>
                    {capitalize(variant)}
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
                {segmentedControlSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </label>
            <label className={styles.toggle}>
              <input
                checked={isFullWidth}
                onChange={(event) => setIsFullWidth(event.target.checked)}
                type="checkbox"
              />
              <span>Full width</span>
            </label>
            <label className={styles.toggle}>
              <input
                checked={isDisabled}
                onChange={(event) => setIsDisabled(event.target.checked)}
                type="checkbox"
              />
              <span>Disabled</span>
            </label>
          </div>
          <div className={styles.playgroundPreview}>
            <SegmentedControl
              aria-label={accessibleName}
              color={selectedColor}
              data={periodData}
              disabled={isDisabled}
              fullWidth={isFullWidth}
              onChange={setPlaygroundValue}
              size={selectedSize}
              value={playgroundValue}
              variant={selectedVariant}
            />
          </div>
        </div>
      </ComponentDemoSection>

      <section
        className={pageStyles.componentReferenceSection}
        id="segmented-control-api"
      >
        <div className={demoStyles.componentDemoHeading}>
          <div>
            <h3>API reference</h3>
            <p>Every public prop, its accepted values, and its default.</p>
          </div>
          <a
            aria-label="Link to API reference section"
            className={demoStyles.componentDemoAnchor}
            href="#segmented-control-api"
          >
            #
          </a>
        </div>
        <div className={pageStyles.referenceGrid}>
          <div>
            <table>
              <tbody>
                <tr>
                  <th>data</th>
                  <td>
                    <code>SegmentedControlItem[]</code>
                  </td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>aria-label / aria-labelledby</th>
                  <td>
                    <code>string</code>
                  </td>
                  <td>one is required</td>
                </tr>
                <tr>
                  <th>value</th>
                  <td>
                    <code>string</code>
                  </td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>defaultValue</th>
                  <td>
                    <code>string</code>
                  </td>
                  <td>first item's value</td>
                </tr>
                <tr>
                  <th>onChange</th>
                  <td>
                    <code>(value: string) =&gt; void</code>
                  </td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>name</th>
                  <td>
                    <code>string</code>
                  </td>
                  <td>auto-generated</td>
                </tr>
                <tr>
                  <th>color</th>
                  <td>
                    <code>{segmentedControlColors.join(" | ")}</code>
                  </td>
                  <td>primary</td>
                </tr>
                <tr>
                  <th>variant</th>
                  <td>
                    <code>{segmentedControlVariants.join(" | ")}</code>
                  </td>
                  <td>filled</td>
                </tr>
                <tr>
                  <th>size</th>
                  <td>
                    <code>{segmentedControlSizes.join(" | ")}</code>
                  </td>
                  <td>md</td>
                </tr>
                <tr>
                  <th>fullWidth</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>false</td>
                </tr>
                <tr>
                  <th>disabled</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>false</td>
                </tr>
                <tr>
                  <th>className</th>
                  <td>
                    <code>string</code>
                  </td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>style</th>
                  <td>
                    <code>CSSProperties</code>
                  </td>
                  <td>CSS object merged with the component styles</td>
                </tr>
                <tr>
                  <th>native div attributes</th>
                  <td>
                    <code>HTMLAttributes&lt;HTMLDivElement&gt;</code>
                  </td>
                  <td>forwarded to the root group element</td>
                </tr>
                <tr>
                  <th>SegmentedControlItem.value</th>
                  <td>
                    <code>string</code>
                  </td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>SegmentedControlItem.label</th>
                  <td>
                    <code>ReactNode</code>
                  </td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>SegmentedControlItem.disabled</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>false</td>
                </tr>
                <tr>
                  <th>SegmentedControlItem.leftSection</th>
                  <td>
                    <code>ReactNode</code>
                  </td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </div>
          <pre className={pageStyles.codeBlock}>
            <code>{`<SegmentedControl
  aria-label="Period"
  data={[
    { value: "day", label: "Day" },
    { value: "week", label: "Week" },
  ]}
  value={value}
  onChange={setValue}
  color="accent"
/>`}</code>
          </pre>
        </div>
      </section>
    </section>
  );
}
