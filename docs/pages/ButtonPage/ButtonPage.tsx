import { useState } from "react";
import {
  Button,
  buttonColors,
  buttonSizes,
  buttonVariants,
} from "../../../src";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import demoStyles from "../../components/ComponentDemoSection/ComponentDemoSection.module.css";
import pageStyles from "../Page.module.css";
import styles from "./ButtonPage.module.css";

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

const buttonSizeLabels = {
  "compact-xs": "Compact extra small (24px)",
  "compact-sm": "Compact small (28px)",
  "compact-md": "Compact medium (32px)",
  "compact-lg": "Compact large (40px)",
  "compact-xl": "Compact extra large (48px)",
  xs: "Extra small (28px)",
  sm: "Small (32px)",
  md: "Medium (40px)",
  lg: "Large (48px)",
  xl: "Extra large (56px)",
} as const;

const standardButtonSizes = buttonSizes.filter(
  (size) => !size.startsWith("compact-"),
);
const compactButtonSizes = buttonSizes.filter((size) =>
  size.startsWith("compact-"),
);
const buttonTypes = ["button", "submit", "reset"] as const;

export function ButtonPage() {
  const [selectedVariant, setSelectedVariant] =
    useState<(typeof buttonVariants)[number]>("filled");
  const [selectedColor, setSelectedColor] =
    useState<(typeof buttonColors)[number]>("primary");
  const [selectedSize, setSelectedSize] =
    useState<(typeof buttonSizes)[number]>("md");
  const [buttonLabel, setButtonLabel] = useState("Add transaction");
  const [leftSection, setLeftSection] = useState("+");
  const [rightSection, setRightSection] = useState(">");
  const [selectedType, setSelectedType] =
    useState<(typeof buttonTypes)[number]>("button");
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [isShowcaseSelected, setIsShowcaseSelected] = useState(false);
  const [isFullWidth, setIsFullWidth] = useState(false);
  const renderedLabel = buttonLabel || "Button";

  const playgroundProps = [
    `color="${selectedColor}"`,
    `size="${selectedSize}"`,
    `variant="${selectedVariant}"`,
    `type="${selectedType}"`,
    isLoading && "loading",
    isDisabled && "disabled",
    isSelected && "selected",
    isFullWidth && "fullWidth",
    leftSection && `leftSection={${JSON.stringify(leftSection)}}`,
    rightSection && `rightSection={${JSON.stringify(rightSection)}}`,
  ].filter(Boolean);
  const playgroundCode = `<Button
${playgroundProps.map((prop) => `  ${prop}`).join("\n")}
>
  ${renderedLabel}
</Button>`;

  return (
    <section className={pageStyles.componentSection} id="button">
      <div className={pageStyles.sectionHeading}>
        <div>
          <p className={pageStyles.eyebrow}>Actions</p>
          <h2>Button</h2>
        </div>
        <code>import {"{ Button }"} from '@teelur/budget-board-ui';</code>
      </div>
      <p className={pageStyles.sectionCopy}>
        A compact action primitive with independent appearance, semantic color,
        interaction, sizing, and slot support.
      </p>
      <p className={pageStyles.sectionCopy}>
        Buttons follow the active Mantine color scheme. This documentation site
        switches between <code>budgetBoardTheme</code> and
        <code>budgetBoardDarkTheme</code> through <code>MantineProvider</code>.
      </p>

      <ComponentDemoSection
        description="Use filled, outline, or ghost treatments to establish hierarchy."
        id="button-variants"
        title="Variants"
        code={buttonVariants
          .map(
            (variant) =>
              `<Button variant="${variant}">${capitalize(variant)}</Button>`,
          )
          .join("\n")}
      >
        <div className={styles.buttonStack}>
          {buttonVariants.map((variant) => (
            <Button key={variant} variant={variant}>
              {capitalize(variant)}
            </Button>
          ))}
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Semantic colors communicate intent consistently; use contrast for a theme-aware black or white action."
        id="button-colors"
        title="Colors"
        code={buttonColors
          .map(
            (color) => `<Button color="${color}">${capitalize(color)}</Button>`,
          )
          .join("\n")}
      >
        <div className={styles.buttonStack}>
          {buttonColors.map((color) => (
            <Button color={color} key={color}>
              {capitalize(color)}
            </Button>
          ))}
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Scale the control to match the density and emphasis of its surrounding layout."
        id="button-sizes"
        title="Sizes"
        code={standardButtonSizes
          .map(
            (size) =>
              `<Button size="${size}">${buttonSizeLabels[size]}</Button>`,
          )
          .join("\n")}
      >
        <div className={styles.buttonStack}>
          {standardButtonSizes.map((size) => (
            <Button key={size} size={size}>
              {buttonSizeLabels[size]}
            </Button>
          ))}
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Use compact sizes when the surrounding layout calls for a tighter control without changing its type scale."
        id="button-compact-sizes"
        title="Compact sizes"
        code={compactButtonSizes
          .map(
            (size) =>
              `<Button size="${size}">${buttonSizeLabels[size]}</Button>`,
          )
          .join("\n")}
      >
        <div className={styles.buttonStack}>
          {compactButtonSizes.map((size) => (
            <Button key={size} size={size}>
              {buttonSizeLabels[size]}
            </Button>
          ))}
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Loading and disabled states keep availability visible while preserving the button's shape."
        id="button-states"
        title="States"
        code={`<Button loading>Saving changes</Button>
<Button disabled>Unavailable</Button>`}
      >
        <div className={styles.buttonStack}>
          <Button loading>Saving changes</Button>
          <Button disabled>Unavailable</Button>
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Filled buttons show the on state with a solid surface and the off state with an outline treatment."
        id="button-selected"
        title="Selected"
        code={`const [selected, setSelected] = useState(false);

<Button
  selected={selected}
  onClick={() => setSelected((current) => !current)}
>
  Toggle selection
</Button>`}
      >
        <div className={`${styles.buttonStack} ${styles.buttonSelectedDemo}`}>
          <Button
            selected={isShowcaseSelected}
            onClick={() => setIsShowcaseSelected((current) => !current)}
          >
            Toggle selection
          </Button>
          <span aria-live="polite">
            {isShowcaseSelected ? "Selected" : "Unselected"}
          </span>
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Use sections for compact icons or contextual affordances at either edge of the label."
        id="button-sections"
        title="Sections"
        code={`<Button leftSection="+" rightSection=">">
  Add transaction
</Button>
<Button color="neutral" leftSection="<">
  Back
</Button>`}
      >
        <div className={styles.buttonStack}>
          <Button leftSection="+" rightSection=">">
            Add transaction
          </Button>
          <Button color="neutral" leftSection="<">
            Back
          </Button>
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Stretch a button across its container when the action needs a larger target."
        id="button-full-width"
        title="Full width"
        code={`<Button fullWidth>
  Continue
</Button>`}
      >
        <Button className={styles.buttonWide} fullWidth>
          Continue
        </Button>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Use Mantine dimension props for fixed, constrained, or responsive button sizing."
        id="button-dimensions"
        title="Dimensions"
        code={`<Button
  w={240}
  miw={200}
  maw="100%"
  h={48}
  mih={44}
  mah={56}
>
  Constrained action
</Button>`}
      >
        <Button h={48} mah={56} maw="100%" mih={44} miw={200} w={240}>
          Constrained action
        </Button>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Adjust the public props together and see the resulting control immediately."
        id="button-playground"
        title="Playground"
        code={playgroundCode}
      >
        <div className={styles.buttonPlayground}>
          <div className={styles.buttonPlaygroundControls}>
            <div className={styles.buttonControlGroup}>
              <div>
                <p className={styles.buttonControlHeading}>Appearance</p>
                <p className={styles.buttonControlCopy}>
                  Tune the visual treatment and scale.
                </p>
              </div>
              <div className={styles.buttonControlGrid}>
                <label className={styles.buttonField}>
                  <span>Variant</span>
                  <select
                    value={selectedVariant}
                    onChange={(event) =>
                      setSelectedVariant(
                        event.target.value as typeof selectedVariant,
                      )
                    }
                  >
                    {buttonVariants.map((variant) => (
                      <option key={variant} value={variant}>
                        {capitalize(variant)}
                      </option>
                    ))}
                  </select>
                </label>
                <label className={styles.buttonField}>
                  <span>Color</span>
                  <select
                    value={selectedColor}
                    onChange={(event) =>
                      setSelectedColor(
                        event.target.value as typeof selectedColor,
                      )
                    }
                  >
                    {buttonColors.map((color) => (
                      <option key={color} value={color}>
                        {capitalize(color)}
                      </option>
                    ))}
                  </select>
                </label>
                <label className={styles.buttonField}>
                  <span>Size</span>
                  <select
                    value={selectedSize}
                    onChange={(event) =>
                      setSelectedSize(event.target.value as typeof selectedSize)
                    }
                  >
                    {buttonSizes.map((size) => (
                      <option key={size} value={size}>
                        {buttonSizeLabels[size]}
                      </option>
                    ))}
                  </select>
                </label>
                <label className={styles.buttonField}>
                  <span>Type</span>
                  <select
                    value={selectedType}
                    onChange={(event) =>
                      setSelectedType(event.target.value as typeof selectedType)
                    }
                  >
                    {buttonTypes.map((type) => (
                      <option key={type} value={type}>
                        {capitalize(type)}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            <div className={styles.buttonControlGroup}>
              <div>
                <p className={styles.buttonControlHeading}>Content</p>
                <p className={styles.buttonControlCopy}>
                  Preview labels and optional edge sections.
                </p>
              </div>
              <label className={styles.buttonField}>
                <span>Label</span>
                <input
                  onChange={(event) => setButtonLabel(event.target.value)}
                  type="text"
                  value={buttonLabel}
                />
              </label>
              <div className={styles.buttonControlGrid}>
                <label className={styles.buttonField}>
                  <span>Left section</span>
                  <input
                    aria-label="Left section"
                    onChange={(event) => setLeftSection(event.target.value)}
                    placeholder="Optional"
                    type="text"
                    value={leftSection}
                  />
                </label>
                <label className={styles.buttonField}>
                  <span>Right section</span>
                  <input
                    aria-label="Right section"
                    onChange={(event) => setRightSection(event.target.value)}
                    placeholder="Optional"
                    type="text"
                    value={rightSection}
                  />
                </label>
              </div>
            </div>

            <div className={styles.buttonControlGroup}>
              <div>
                <p className={styles.buttonControlHeading}>Behavior</p>
                <p className={styles.buttonControlCopy}>
                  Test availability and layout states.
                </p>
              </div>
              <div className={styles.buttonToggleGrid}>
                <label className={styles.buttonToggle}>
                  <input
                    checked={isLoading}
                    onChange={(event) => setIsLoading(event.target.checked)}
                    type="checkbox"
                  />
                  <span>Loading</span>
                </label>
                <label className={styles.buttonToggle}>
                  <input
                    checked={isDisabled}
                    onChange={(event) => setIsDisabled(event.target.checked)}
                    type="checkbox"
                  />
                  <span>Disabled</span>
                </label>
                <label className={styles.buttonToggle}>
                  <input
                    checked={isSelected}
                    onChange={(event) => setIsSelected(event.target.checked)}
                    type="checkbox"
                  />
                  <span>Selected</span>
                </label>
                <label className={styles.buttonToggle}>
                  <input
                    checked={isFullWidth}
                    onChange={(event) => setIsFullWidth(event.target.checked)}
                    type="checkbox"
                  />
                  <span>Full width</span>
                </label>
              </div>
            </div>
          </div>

          <div className={styles.buttonPlaygroundPreview}>
            <span className={styles.buttonPreviewLabel}>Rendered result</span>
            <div className={styles.buttonPreviewStage}>
              <Button
                selected={isSelected}
                color={selectedColor}
                disabled={isDisabled}
                fullWidth={isFullWidth}
                leftSection={leftSection || undefined}
                loading={isLoading}
                rightSection={rightSection || undefined}
                size={selectedSize}
                type={selectedType}
                variant={selectedVariant}
              >
                {renderedLabel}
              </Button>
            </div>
          </div>
        </div>
      </ComponentDemoSection>

      <section className={pageStyles.componentReferenceSection} id="button-api">
        <div className={demoStyles.componentDemoHeading}>
          <div>
            <h3>API reference</h3>
            <p>Every public prop, its accepted values, and its default.</p>
          </div>
          <a
            aria-label="Link to API reference section"
            className={demoStyles.componentDemoAnchor}
            href="#button-api"
          >
            #
          </a>
        </div>
        <div className={pageStyles.referenceGrid}>
          <div>
            <table>
              <tbody>
                <tr>
                  <th>children</th>
                  <td>
                    <code>ReactNode</code>
                  </td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>className</th>
                  <td>
                    <code>string</code>
                  </td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>color</th>
                  <td>
                    <code>{buttonColors.join(" | ")}</code>
                  </td>
                  <td>primary</td>
                </tr>
                <tr>
                  <th>disabled</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>false</td>
                </tr>
                <tr>
                  <th>fullWidth</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>false</td>
                </tr>
                <tr>
                  <th>leftSection</th>
                  <td>
                    <code>ReactNode</code>
                  </td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>loading</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>false</td>
                </tr>
                <tr>
                  <th>Mantine dimension props</th>
                  <td>
                    <code>StyleProp&lt;string | number&gt;</code>
                  </td>
                  <td>
                    <code>w, miw, maw, h, mih, mah</code>; responsive values
                    supported
                  </td>
                </tr>
                <tr>
                  <th>native button attributes</th>
                  <td>
                    <code>ButtonHTMLAttributes&lt;HTMLButtonElement&gt;</code>
                  </td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>rightSection</th>
                  <td>
                    <code>ReactNode</code>
                  </td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>selected</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>Filled: true is solid/on; false is outlined/off</td>
                </tr>
                <tr>
                  <th>size</th>
                  <td>
                    <code>{buttonSizes.join(" | ")}</code>
                  </td>
                  <td>md</td>
                </tr>
                <tr>
                  <th>style</th>
                  <td>
                    <code>MantineStyleProp</code>
                  </td>
                  <td>CSS object, theme callback, or nested array of either</td>
                </tr>
                <tr>
                  <th>type</th>
                  <td>
                    <code>button | submit | reset</code>
                  </td>
                  <td>button</td>
                </tr>
                <tr>
                  <th>variant</th>
                  <td>
                    <code>{buttonVariants.join(" | ")}</code>
                  </td>
                  <td>filled</td>
                </tr>
              </tbody>
            </table>
          </div>
          <pre className={pageStyles.codeBlock}>
            <code>{`<Button color="error" variant="outline" size="lg">
  Delete transaction
</Button>`}</code>
          </pre>
        </div>
      </section>
    </section>
  );
}
