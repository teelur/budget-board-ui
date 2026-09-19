import { useState } from "react";
import {
  Button,
  buttonColors,
  buttonSizes,
  buttonVariants,
} from "../../src/Button/Button";
import { ComponentDemoSection } from "../components/ComponentDemoSection";

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

const buttonSizeLabels = {
  "compact-xs": "Compact extra small",
  "compact-sm": "Compact small",
  "compact-md": "Compact medium",
  "compact-lg": "Compact large",
  "compact-xl": "Compact extra large",
  xs: "Extra small",
  sm: "Small",
  md: "Medium",
  lg: "Large",
  xl: "Extra large",
} as const;

const standardButtonSizes = buttonSizes.filter(
  (size) => !size.startsWith("compact-"),
);
const compactButtonSizes = buttonSizes.filter((size) =>
  size.startsWith("compact-"),
);

export function ButtonPage() {
  const [selectedVariant, setSelectedVariant] =
    useState<(typeof buttonVariants)[number]>("filled");
  const [selectedColor, setSelectedColor] =
    useState<(typeof buttonColors)[number]>("primary");
  const [selectedSize, setSelectedSize] =
    useState<(typeof buttonSizes)[number]>("md");

  return (
    <section className="component-section" id="button">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Actions</p>
          <h2>Button</h2>
        </div>
        <code>import {"{ Button }"} from '@teelur/budget-board-ui';</code>
      </div>
      <p className="section-copy">
        A compact action primitive with independent appearance, semantic color,
        interaction, sizing, and slot support.
      </p>

      <ComponentDemoSection
        description="Use visual weight to establish hierarchy without changing the action itself."
        id="button-variants"
        title="Variants"
        code={buttonVariants
          .map(
            (variant) =>
              `<Button variant="${variant}">${capitalize(variant)}</Button>`,
          )
          .join("\n")}
      >
        <div className="button-stack">
          {buttonVariants.map((variant) => (
            <Button key={variant} variant={variant}>
              {capitalize(variant)}
            </Button>
          ))}
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Semantic colors communicate intent consistently across the application."
        id="button-colors"
        title="Colors"
        code={buttonColors
          .map(
            (color) => `<Button color="${color}">${capitalize(color)}</Button>`,
          )
          .join("\n")}
      >
        <div className="button-stack">
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
        <div className="button-stack">
          {standardButtonSizes.map((size) => (
            <Button key={size} size={size}>
              {size.toUpperCase()}
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
        <div className="button-stack">
          {compactButtonSizes.map((size) => (
            <Button key={size} size={size}>
              {size.toUpperCase()}
            </Button>
          ))}
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Loading and disabled states keep availability visible while preserving the button's shape."
        id="button-states"
        title="States"
        code={`<Button color="success">Ready</Button>
<Button loading>Saving changes</Button>
<Button disabled>Unavailable</Button>`}
      >
        <div className="button-stack">
          <Button color="success">Ready</Button>
          <Button loading>Saving changes</Button>
          <Button disabled>Unavailable</Button>
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
        <div className="button-stack">
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
        <Button className="button-wide" fullWidth>
          Continue
        </Button>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Adjust the public props together and see the resulting control immediately."
        id="button-playground"
        title="Playground"
        code={`<Button
  color="${selectedColor}"
  size="${selectedSize}"
  variant="${selectedVariant}"
  leftSection="+"
  rightSection=">">
  Add transaction
</Button>`}
      >
        <div className="control-row">
          <label>
            <span>Variant</span>
            <select
              value={selectedVariant}
              onChange={(event) =>
                setSelectedVariant(event.target.value as typeof selectedVariant)
              }
            >
              {buttonVariants.map((variant) => (
                <option key={variant} value={variant}>
                  {capitalize(variant)}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Color</span>
            <select
              value={selectedColor}
              onChange={(event) =>
                setSelectedColor(event.target.value as typeof selectedColor)
              }
            >
              {buttonColors.map((color) => (
                <option key={color} value={color}>
                  {capitalize(color)}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Size</span>
            <select
              value={selectedSize}
              onChange={(event) =>
                setSelectedSize(event.target.value as typeof selectedSize)
              }
            >
              {buttonSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>
          <div className="live-result">
            <span>Rendered result</span>
            <Button
              color={selectedColor}
              size={selectedSize}
              variant={selectedVariant}
              leftSection="+"
              rightSection=">"
            >
              Add transaction
            </Button>
          </div>
        </div>
      </ComponentDemoSection>

      <section className="component-reference-section" id="button-api">
        <div className="component-demo-heading">
          <div>
            <h3>API reference</h3>
            <p>Every public prop, its accepted values, and its default.</p>
          </div>
          <a
            aria-label="Link to API reference section"
            className="component-demo-anchor"
            href="#button-api"
          >
            #
          </a>
        </div>
        <div className="reference-grid">
          <div>
            <table>
              <tbody>
                <tr>
                  <th>variant</th>
                  <td>
                    <code>{buttonVariants.join(" | ")}</code>
                  </td>
                  <td>filled</td>
                </tr>
                <tr>
                  <th>color</th>
                  <td>
                    <code>{buttonColors.join(" | ")}</code>
                  </td>
                  <td>primary</td>
                </tr>
                <tr>
                  <th>size</th>
                  <td>
                    <code>{buttonSizes.join(" | ")}</code>
                  </td>
                  <td>md</td>
                </tr>
                <tr>
                  <th>loading</th>
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
                  <th>rightSection</th>
                  <td>
                    <code>ReactNode</code>
                  </td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </div>
          <pre className="code-block">
            <code>{`<Button color="error" variant="outline" size="lg">
  Delete transaction
</Button>`}</code>
          </pre>
        </div>
      </section>
    </section>
  );
}
