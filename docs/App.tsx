import { useState } from "react";
import type { ReactNode } from "react";
import { Button } from "../src";

const buttonVariants = ["primary", "secondary", "danger", "ghost"] as const;
const buttonSizes = ["sm", "md", "lg"] as const;

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

export function App() {
  const [selectedVariant, setSelectedVariant] =
    useState<(typeof buttonVariants)[number]>("primary");
  const [selectedSize, setSelectedSize] =
    useState<(typeof buttonSizes)[number]>("md");

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="brand-mark">BB</div>
        <div>
          <p className="eyebrow">Component library</p>
          <h1>Budget Board UI</h1>
        </div>
        <a
          className="source-link"
          href="https://github.com/teelur/budget-board-ui"
        >
          GitHub
        </a>
      </header>

      <div className="content-layout">
        <aside className="side-nav" aria-label="Documentation navigation">
          <p className="nav-heading">On this page</p>
          <a href="#overview">Overview</a>
          <a href="#button">Button</a>
          <p className="nav-heading nav-heading-spaced">Package</p>
          <code>@teelur/budget-board-ui</code>
        </aside>

        <main className="main-content">
          <section className="intro" id="overview">
            <p className="eyebrow">Budget Board primitives</p>
            <h2>Small components with a clear point of view.</h2>
            <p className="intro-copy">
              A living reference for the components shipped by Budget Board UI.
              Explore the states, copy the examples, and see the public API in
              one place.
            </p>
            <div className="intro-meta">
              <span>React 19</span>
              <span>Mantine 9</span>
              <span>TypeScript</span>
            </div>
          </section>

          <section className="component-section" id="button">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Actions</p>
                <h2>Button</h2>
              </div>
              <code>import {"{ Button }"} from '@teelur/budget-board-ui';</code>
            </div>
            <p className="section-copy">
              A compact action primitive with intentional variants, sizing,
              loading, and slot support.
            </p>

            <div className="showcase-grid">
              <DemoFrame label="All variants">
                <div className="button-stack">
                  {buttonVariants.map((variant) => (
                    <Button key={variant} variant={variant}>
                      {variant}
                    </Button>
                  ))}
                </div>
              </DemoFrame>
              <DemoFrame label="States">
                <div className="button-stack">
                  <Button loading>Saving changes</Button>
                  <Button disabled>Unavailable</Button>
                  <Button fullWidth>Full width</Button>
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
                      setSelectedVariant(
                        event.target.value as typeof selectedVariant,
                      )
                    }
                  >
                    {buttonVariants.map((variant) => (
                      <option key={variant}>{variant}</option>
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
                        <code>primary | secondary | danger | ghost</code>
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
              <CodeBlock>{`<Button variant="danger" size="lg">
  Delete transaction
</Button>`}</CodeBlock>
            </div>
          </section>

          <footer className="site-footer">
            @teelur/budget-board-ui · built for Budget Board
          </footer>
        </main>
      </div>
    </div>
  );
}
