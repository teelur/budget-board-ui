import { useState } from "react";
import { Button } from "../../src";
import type { ReactNode } from "react";

const buttonVariants = ["filled", "outline", "ghost"] as const;
const buttonColors = [
  "primary",
  "secondary",
  "accent",
  "neutral",
  "info",
  "success",
  "warning",
  "error",
] as const;
const buttonSizes = ["sm", "md", "lg"] as const;

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="code-block">
      <code>{children}</code>
    </pre>
  );
}

function DemoFrame({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <div className="demo-frame">
      <span className="demo-label">{label}</span>
      {children}
    </div>
  );
}

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

      <div className="showcase-grid">
        <DemoFrame label="Appearance">
          <div className="button-stack">
            {buttonVariants.map((variant) => (
              <Button key={variant} variant={variant}>
                {capitalize(variant)}
              </Button>
            ))}
          </div>
        </DemoFrame>
        <DemoFrame label="Semantic colors">
          <div className="button-stack">
            {buttonColors.map((color) => (
              <Button color={color} key={color}>
                {capitalize(color)}
              </Button>
            ))}
          </div>
        </DemoFrame>
        <DemoFrame label="Availability">
          <div className="button-stack">
            <Button color="success">Ready</Button>
            <Button loading>Saving changes</Button>
            <Button disabled>Unavailable</Button>
          </div>
        </DemoFrame>
        <DemoFrame label="Layout and slots">
          <div className="button-stack">
            <Button size="sm">Compact</Button>
            <Button leftSection="+" rightSection="→">
              With sections
            </Button>
            <Button className="button-wide" fullWidth>
              Full width
            </Button>
          </div>
        </DemoFrame>
      </div>

      <DemoFrame label="Try the props">
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
                <option key={size}>{size}</option>
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
              rightSection="→"
            >
              Add transaction
            </Button>
          </div>
        </div>
      </DemoFrame>

      <div className="reference-grid">
        <div>
          <h3>Props</h3>
          <table>
            <tbody>
              <tr>
                <th>variant</th>
                <td>
                  <code>filled | outline | ghost</code>
                </td>
                <td>filled</td>
              </tr>
              <tr>
                <th>color</th>
                <td>
                  <code>
                    primary | secondary | accent | neutral | info | success |
                    warning | error
                  </code>
                </td>
                <td>primary</td>
              </tr>
              <tr>
                <th>size</th>
                <td>
                  <code>sm | md | lg</code>
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
        <CodeBlock>{`<Button color="error" variant="outline" size="lg">
  Delete transaction
</Button>`}</CodeBlock>
      </div>
    </section>
  );
}
