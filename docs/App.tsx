import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Moon, Sun } from "lucide-react";
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

const surfaceRoles = [
  {
    name: "Sunken surface",
    token: "--bb-color-surface-sunken",
    lightValue: "#EBE8DF",
    darkValue: "#0D0F12",
    description: "A recessed layer for wells, inactive regions, and depth.",
    lightClassName: "color-light-sunken",
    darkClassName: "color-dark-sunken",
  },
  {
    name: "Overlay surface",
    token: "--bb-color-surface-overlay",
    lightValue: "#FFFAF2",
    darkValue: "#292C31",
    description: "A focused layer for overlays, popovers, and temporary work.",
    lightClassName: "color-light-overlay",
    darkClassName: "color-dark-overlay",
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
  {
    name: "Inverse",
    token: "--bb-color-text-inverse",
    lightValue: "#FFFAF2",
    darkValue: "#242321",
    className: "text-role-inverse",
    description:
      "High-contrast text for dark surfaces in light mode and light surfaces in dark mode.",
  },
] as const;

const themeRoles = [
  {
    name: "Primary",
    token: "--bb-color-primary",
    lightValue: "#4C6EF5",
    darkValue: "#91A7FF",
    lightContent: "#FFFAF2",
    darkContent: "#1E2450",
    description:
      "Primary actions, active states, and the clearest call to action.",
    lightClassName: "theme-role-light-primary",
    darkClassName: "theme-role-dark-primary",
  },
  {
    name: "Primary content",
    token: "--bb-color-primary-content",
    lightValue: "#FFFAF2",
    darkValue: "#1E2450",
    lightContent: "#4C6EF5",
    darkContent: "#91A7FF",
    description: "Readable foreground content placed on the primary role.",
    lightClassName: "theme-role-light-primary-content",
    darkClassName: "theme-role-dark-primary-content",
  },
  {
    name: "Secondary",
    token: "--bb-color-secondary",
    lightValue: "#12B886",
    darkValue: "#63E6BE",
    lightContent: "#063B2F",
    darkContent: "#063B2F",
    description: "Supporting actions and complementary control surfaces.",
    lightClassName: "theme-role-light-secondary",
    darkClassName: "theme-role-dark-secondary",
  },
  {
    name: "Secondary content",
    token: "--bb-color-secondary-content",
    lightValue: "#063B2F",
    darkValue: "#063B2F",
    lightContent: "#12B886",
    darkContent: "#63E6BE",
    description: "Readable foreground content placed on the secondary role.",
    lightClassName: "theme-role-light-secondary-content",
    darkClassName: "theme-role-dark-secondary-content",
  },
  {
    name: "Accent",
    token: "--bb-color-accent",
    lightValue: "#F76707",
    darkValue: "#FFA94D",
    lightContent: "#4A2103",
    darkContent: "#4A2103",
    description:
      "Focused emphasis for highlights, attention, and memorable moments.",
    lightClassName: "theme-role-light-accent",
    darkClassName: "theme-role-dark-accent",
  },
  {
    name: "Accent content",
    token: "--bb-color-accent-content",
    lightValue: "#4A2103",
    darkValue: "#4A2103",
    lightContent: "#F76707",
    darkContent: "#FFA94D",
    description: "Readable foreground content placed on the accent role.",
    lightClassName: "theme-role-light-accent-content",
    darkClassName: "theme-role-dark-accent-content",
  },
  {
    name: "Neutral",
    token: "--bb-color-neutral",
    lightValue: "#E7E3DA",
    darkValue: "#34373A",
    lightContent: "#3A3834",
    darkContent: "#F2F0EB",
    description: "Low-emphasis controls and quiet structural actions.",
    lightClassName: "theme-role-light-neutral",
    darkClassName: "theme-role-dark-neutral",
  },
  {
    name: "Neutral content",
    token: "--bb-color-neutral-content",
    lightValue: "#3A3834",
    darkValue: "#F2F0EB",
    lightContent: "#E7E3DA",
    darkContent: "#34373A",
    description: "Readable foreground content placed on the neutral role.",
    lightClassName: "theme-role-light-neutral-content",
    darkClassName: "theme-role-dark-neutral-content",
  },
] as const;

const semanticColorGroups = [
  {
    name: "Structure and interaction",
    roles: [
      ["Subtle border", "border-subtle"],
      ["Strong border", "border-strong"],
      ["Focus ring", "focus-ring"],
      ["Selection", "selection"],
    ],
  },
  {
    name: "Feedback",
    roles: [
      ["Info", "info"],
      ["Info content", "info-content"],
      ["Success", "success"],
      ["Success content", "success-content"],
      ["Warning", "warning"],
      ["Warning content", "warning-content"],
      ["Error", "error"],
      ["Error content", "error-content"],
    ],
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
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const headerRef = useRef<HTMLElement>(null);
  const [selectedVariant, setSelectedVariant] =
    useState<(typeof buttonVariants)[number]>("primary");
  const [selectedSize, setSelectedSize] =
    useState<(typeof buttonSizes)[number]>("md");
  const colors = colorMode === "light" ? lightColors : darkColors;

  useEffect(() => {
    const header = headerRef.current;

    if (!header) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsHeaderVisible(entry?.isIntersecting ?? false),
      { threshold: 0 },
    );

    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`site-shell${isHeaderVisible ? "" : " header-hidden"}`}
      data-color-mode={colorMode}
    >
      <header className="site-header" ref={headerRef}>
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
            aria-label={`Current mode: ${colorMode}`}
            title={`Current mode: ${colorMode}`}
            type="button"
          >
            {colorMode === "light" ? <Sun size={17} /> : <Moon size={17} />}
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
              Surfaces, text, and theme roles are finalized; structure,
              interaction, and feedback roles below remain temporary until their
              hues are reviewed.
            </p>
            <div className="color-theme-section">
              <p className="theme-subheading">Surfaces</p>
              <p className="theme-subheading-copy">
                Light and dark surfaces use the same quiet, grounded hierarchy
                while adapting their values to the surrounding mode. Small
                shifts in value create depth without depending on heavy shadows.
              </p>
              <div className="color-grid">
                {colors.map((color) => (
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

              <div className="surface-role-grid">
                {surfaceRoles.map((role) => (
                  <div className="surface-role-card" key={role.token}>
                    <div
                      className={`surface-role-swatch ${
                        colorMode === "light"
                          ? role.lightClassName
                          : role.darkClassName
                      }`}
                    />
                    <div className="surface-role-content">
                      <div className="color-card-heading">
                        <strong>{role.name}</strong>
                        <code>
                          {colorMode === "light"
                            ? role.lightValue
                            : role.darkValue}
                        </code>
                      </div>
                      <code>{role.token}</code>
                      <p>{role.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="theme-subheading">Text roles</p>
              <p className="theme-subheading-copy">
                Both modes use a measured neutral scale to keep financial
                information readable at a glance. Stronger values establish
                hierarchy while muted roles recede when attention should move
                elsewhere.
              </p>
              <div className="text-role-grid">
                {textRoles.map((role) => (
                  <div className="text-role-card" key={role.token}>
                    <div className={`text-role-sample ${role.className}`}>
                      Aa
                    </div>
                    <div className="text-role-content">
                      <div className="color-card-heading">
                        <strong>{role.name}</strong>
                        <code>
                          {colorMode === "light"
                            ? role.lightValue
                            : role.darkValue}
                        </code>
                      </div>
                      <code>{role.token}</code>
                      <p>{role.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="theme-subheading">Theme roles</p>
              <p className="theme-subheading-copy">
                Indigo, emerald, and orange bring consistent energy to actions
                and emphasis in both modes without overwhelming the foundation.
                Each light and dark value is paired with deliberate content
                colors for clear contrast.
              </p>
              <div className="theme-role-grid">
                {themeRoles.map((role) => (
                  <div className="theme-role-card" key={role.token}>
                    <div
                      className={`theme-role-swatch ${
                        colorMode === "light"
                          ? role.lightClassName
                          : role.darkClassName
                      }`}
                    >
                      <span>Aa</span>
                    </div>
                    <div className="theme-role-content">
                      <div className="color-card-heading">
                        <strong>{role.name}</strong>
                        <code>
                          {colorMode === "light"
                            ? role.lightValue
                            : role.darkValue}
                        </code>
                      </div>
                      <code>{role.token}</code>
                      <p>{role.description}</p>
                      <span className="theme-role-content-value">
                        Content:{" "}
                        {colorMode === "light"
                          ? role.lightContent
                          : role.darkContent}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="theme-subheading">Semantic roles · placeholders</p>
              <p className="theme-subheading-copy">
                These roles will carry interaction states and system feedback in
                both modes once their hues are finalized. They are intentionally
                held back so their eventual colors can be judged as a coherent
                set.
              </p>
              <div className="semantic-color-groups">
                {semanticColorGroups.map((group) => (
                  <div className="semantic-color-group" key={group.name}>
                    <h3>{group.name}</h3>
                    <div className="semantic-color-grid">
                      {group.roles.map(([name, token]) => (
                        <div className="semantic-color-card" key={token}>
                          <div className="semantic-color-swatch" />
                          <div>
                            <strong>{name}</strong>
                            <code>--bb-color-{token}</code>
                          </div>
                          <span>Temporary placeholder</span>
                        </div>
                      ))}
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
