import { useState } from "react";
import type { ReactNode } from "react";
import { Button } from "../src";

const buttonVariants = ["primary", "secondary", "danger", "ghost"] as const;
const buttonSizes = ["sm", "md", "lg"] as const;

const typographyRoles = [
  {
    name: "Display",
    token: "--bb-font-display",
    family: "Plus Jakarta Sans",
    description: "Brand moments and major page or section headings.",
    className: "typography-display",
  },
  {
    name: "Body",
    token: "--bb-font-body",
    family: "IBM Plex Sans",
    description: "Navigation, controls, labels, and supporting copy.",
    className: "typography-body",
  },
  {
    name: "Data",
    token: "--bb-font-data",
    family: "IBM Plex Sans · tabular numerals",
    description: "Balances, amounts, dates, and compact financial metadata.",
    className: "typography-data",
  },
] as const;

const lightColors = [
  {
    name: "Canvas",
    token: "--bb-color-page",
    value: "#F7F6F2",
    description:
      "The main application background behind every page and layout region.",
    className: "color-light-canvas",
  },
  {
    name: "Primary surface",
    token: "--bb-color-surface",
    value: "#FFFFFF",
    description:
      "The default surface for cards, content panels, and focused work areas.",
    className: "color-light-surface",
  },
  {
    name: "Elevated surface",
    token: "--bb-color-surface-elevated",
    value: "#FFFCF7",
    description:
      "A gently lifted layer for menus, controls, dialogs, and temporary focus.",
    className: "color-light-elevated",
  },
  {
    name: "Navigation",
    token: "--bb-color-navigation",
    value: "#F1EFE9",
    description:
      "The distinct shell surface used by navigation and app-level chrome.",
    className: "color-light-navigation",
  },
] as const;

const darkColors = [
  {
    name: "Canvas",
    token: "--bb-color-page",
    value: "#111214",
    description:
      "The main application background behind every page and layout region.",
    className: "color-dark-canvas",
  },
  {
    name: "Primary surface",
    token: "--bb-color-surface",
    value: "#191B1F",
    description:
      "The default surface for cards, content panels, and focused work areas.",
    className: "color-dark-surface",
  },
  {
    name: "Elevated surface",
    token: "--bb-color-surface-elevated",
    value: "#22252A",
    description:
      "A lighter layer for menus, controls, dialogs, and temporary focus.",
    className: "color-dark-elevated",
  },
  {
    name: "Navigation",
    token: "--bb-color-navigation",
    value: "#191B1F",
    description:
      "The distinct shell surface used by navigation and app-level chrome.",
    className: "color-dark-navigation",
  },
] as const;

const textRoles = [
  {
    name: "Heading",
    token: "--bb-color-text-heading",
    lightValue: "#242321",
    darkValue: "#F2F0EB",
    className: "text-role-heading",
    description:
      "Page, section, and card headings. Strongest neutral text role.",
  },
  {
    name: "Primary",
    token: "--bb-color-text-primary",
    lightValue: "#3A3834",
    darkValue: "#D8D5CE",
    className: "text-role-primary",
    description: "Main transaction text, amounts, and important labels.",
  },
  {
    name: "Secondary",
    token: "--bb-color-text-secondary",
    lightValue: "#68645D",
    darkValue: "#AAA69E",
    className: "text-role-secondary",
    description: "Supporting descriptions and helper copy.",
  },
  {
    name: "Metadata",
    token: "--bb-color-text-metadata",
    lightValue: "#807A70",
    darkValue: "#8E8A83",
    className: "text-role-metadata",
    description:
      "Dates, categories, timestamps, and compact transaction details.",
  },
  {
    name: "Muted",
    token: "--bb-color-text-muted",
    lightValue: "#969087",
    darkValue: "#716F6B",
    className: "text-role-muted",
    description: "Inactive navigation and low-priority labels.",
  },
  {
    name: "Disabled",
    token: "--bb-color-text-disabled",
    lightValue: "#B7B1A7",
    darkValue: "#55585D",
    className: "text-role-disabled",
    description: "Unavailable controls and disabled content.",
  },
] as const;

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
  const [colorMode, setColorMode] = useState<"light" | "dark">("light");
  const [selectedVariant, setSelectedVariant] =
    useState<(typeof buttonVariants)[number]>("primary");
  const [selectedSize, setSelectedSize] =
    useState<(typeof buttonSizes)[number]>("md");

  return (
    <div className="site-shell" data-color-mode={colorMode}>
      <header className="site-header">
        <div className="brand-mark">BB</div>
        <div>
          <p className="eyebrow">Component library</p>
          <h1>Budget Board UI</h1>
        </div>
        <div className="header-actions">
          <button
            className="mode-toggle"
            onClick={() =>
              setColorMode((mode) => (mode === "light" ? "dark" : "light"))
            }
            type="button"
          >
            {colorMode === "light" ? "Dark mode" : "Light mode"}
          </button>
          <a
            className="source-link"
            href="https://github.com/teelur/budget-board-ui"
          >
            GitHub
          </a>
        </div>
      </header>

      <div className="content-layout">
        <aside className="side-nav" aria-label="Documentation navigation">
          <p className="nav-heading">On this page</p>
          <a href="#overview">Overview</a>
          <a href="#color-theme">Color theme</a>
          <a href="#typography">Typography</a>
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

          <section className="component-section" id="color-theme">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Color foundations</p>
                <h2>Color theme</h2>
              </div>
              <code>{colorMode} mode</code>
            </div>
            <p className="section-copy">
              A restrained background system keeps the canvas, working surfaces,
              and application chrome distinct without relying on heavy shadows.
              These are the only finalized colors so far.
            </p>
            <div className="color-theme-section">
              <p className="theme-subheading">Light mode</p>
              <div className="color-grid">
                {lightColors.map((color) => (
                  <div className="color-card" key={color.token}>
                    <div className={`color-swatch ${color.className}`} />
                    <div className="color-card-content">
                      <div className="color-card-heading">
                        <strong>{color.name}</strong>
                        <code>{color.value}</code>
                      </div>
                      <code>{color.token}</code>
                      <p>{color.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="theme-subheading">Dark mode</p>
              <div className="color-grid">
                {darkColors.map((color) => (
                  <div className="color-card" key={color.token}>
                    <div className={`color-swatch ${color.className}`} />
                    <div className="color-card-content">
                      <div className="color-card-heading">
                        <strong>{color.name}</strong>
                        <code>{color.value}</code>
                      </div>
                      <code>{color.token}</code>
                      <p>{color.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="theme-subheading">Shared roles</p>
              <div className="role-grid">
                <div>
                  <code>--bb-color-border</code>
                  <p>
                    Quiet separators and outlines, derived from the active
                    neutral palette.
                  </p>
                </div>
                <div>
                  <code>--bb-color-text-primary</code>
                  <p>The default readable text role for application content.</p>
                </div>
                <div>
                  <code>--bb-color-text-disabled</code>
                  <p>
                    A deliberately low-contrast role for unavailable content.
                  </p>
                </div>
              </div>

              <p className="theme-subheading">Text roles</p>
              <div className="text-role-grid">
                {textRoles.map((role) => (
                  <div className="text-role-card" key={role.token}>
                    <div className={`text-role-sample ${role.className}`}>
                      Aa
                    </div>
                    <div className="text-role-content">
                      <div className="color-card-heading">
                        <strong>{role.name}</strong>
                        <code>{role.lightValue}</code>
                      </div>
                      <code>{role.token}</code>
                      <p>{role.description}</p>
                      <span className="text-role-dark-value">
                        Dark mode {role.darkValue}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="component-section" id="typography">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Type foundations</p>
                <h2>Typography</h2>
              </div>
              <code>3 roles · 2 families</code>
            </div>
            <p className="section-copy">
              A small type system keeps the interface warm and readable while
              giving financial values a precise, aligned rhythm.
            </p>

            <div className="typography-grid">
              {typographyRoles.map((role) => (
                <div className="typography-card" key={role.token}>
                  <span className="demo-label">{role.name}</span>
                  <strong className={role.className}>
                    {role.name === "Data" ? "$12,480.00" : "Budget Board"}
                  </strong>
                  <code>{role.token}</code>
                  <p>{role.family}</p>
                  <small>{role.description}</small>
                </div>
              ))}
            </div>

            <div className="typography-transaction">
              <div>
                <strong>Neighborhood Market and Household Supplies</strong>
                <span>Sep 19, 2026 · Groceries</span>
              </div>
              <strong className="typography-data typography-amount">
                -$1,284.50
              </strong>
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
