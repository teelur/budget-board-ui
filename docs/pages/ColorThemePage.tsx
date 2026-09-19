import { ColorCard } from "../components/color/ColorCard";
import type { ColorMode } from "../components/color/colorCardTypes";
import { RoleCard } from "../components/color/RoleCard";
import { SemanticColorGroup } from "../components/color/SemanticColorGroup";
import { SurfaceRoleCard } from "../components/color/SurfaceRoleCard";
import { TextRoleCard } from "../components/color/TextRoleCard";

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
] as const;

const semanticColorGroups = [
  {
    name: "Structural roles",
    roles: [
      {
        name: "Subtle border",
        token: "--bb-color-border-subtle",
        lightValue: "#D8D5CE",
        darkValue: "#3A3D42",
        lightContent: null,
        darkContent: null,
        lightClassName: "semantic-role-light-subtle-border",
        darkClassName: "semantic-role-dark-subtle-border",
        description:
          "Quiet dividers and low-contrast boundaries between related regions.",
      },
      {
        name: "Strong border",
        token: "--bb-color-border-strong",
        lightValue: "#AAA69E",
        darkValue: "#686B70",
        lightContent: null,
        darkContent: null,
        lightClassName: "semantic-role-light-strong-border",
        darkClassName: "semantic-role-dark-strong-border",
        description:
          "Clear boundaries for cards, controls, and important separation.",
      },
    ],
  },
  {
    name: "Interaction states",
    roles: [
      {
        name: "Focus ring",
        token: "--bb-color-focus-ring",
        lightValue: "#4C6EF5",
        darkValue: "#91A7FF",
        lightContent: null,
        darkContent: null,
        lightClassName: "semantic-role-light-focus-ring",
        darkClassName: "semantic-role-dark-focus-ring",
        description:
          "Keyboard focus indicator with enough contrast to remain visible on every surface.",
      },
      {
        name: "Selection",
        token: "--bb-color-selection",
        lightValue: "#DBE4FF",
        darkValue: "#1E2450",
        lightContent: null,
        darkContent: null,
        lightClassName: "semantic-role-light-selection",
        darkClassName: "semantic-role-dark-selection",
        description:
          "Selected rows, fields, and active regions without overpowering their content.",
      },
    ],
  },
  {
    name: "Feedback states",
    roles: [
      {
        name: "Info",
        token: "--bb-color-info",
        lightValue: "#1971C2",
        darkValue: "#74C0FC",
        lightContent: "#E7F5FF",
        darkContent: "#1864AB",
        lightClassName: "semantic-role-light-info",
        darkClassName: "semantic-role-dark-info",
        description:
          "Neutral system messages, guidance, and informational status.",
      },
      {
        name: "Success",
        token: "--bb-color-success",
        lightValue: "#2F9E44",
        darkValue: "#69DB7C",
        lightContent: "#EBFBEE",
        darkContent: "#2B8A3E",
        lightClassName: "semantic-role-light-success",
        darkClassName: "semantic-role-dark-success",
        description:
          "Positive confirmation for completed actions and healthy states.",
      },
      {
        name: "Warning",
        token: "--bb-color-warning",
        lightValue: "#FCC419",
        darkValue: "#FFD43B",
        lightContent: "#5F3B00",
        darkContent: "#5F3B00",
        lightClassName: "semantic-role-light-warning",
        darkClassName: "semantic-role-dark-warning",
        description: "Cautions that need attention without implying failure.",
      },
      {
        name: "Error",
        token: "--bb-color-error",
        lightValue: "#C92A2A",
        darkValue: "#FF6B6B",
        lightContent: "#FFF5F5",
        darkContent: "#4A0C0C",
        lightClassName: "semantic-role-light-error",
        darkClassName: "semantic-role-dark-error",
        description:
          "Failures, destructive outcomes, and actions that need correction.",
      },
    ],
  },
] as const;

export function ColorThemePage({ colorMode }: { colorMode: ColorMode }) {
  const colors = colorMode === "light" ? lightColors : darkColors;

  return (
    <section className="component-section" id="color-theme">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Color foundations</p>
          <h2>Color theme</h2>
        </div>
        <code>{colorMode} mode</code>
      </div>
      <p className="section-copy">
        A restrained background system keeps the canvas, working surfaces, and
        application chrome distinct without relying on heavy shadows. Surfaces,
        text, and theme roles establish the visual foundation for the rest of
        the interface.
      </p>
      <div className="color-theme-section">
        <p className="theme-subheading">Surfaces</p>
        <p className="theme-subheading-copy">
          Light and dark surfaces use the same quiet, grounded hierarchy while
          adapting their values to the surrounding mode. Small shifts in value
          create depth without depending on heavy shadows.
        </p>
        <div className="color-grid">
          {colors.map((color) => (
            <ColorCard color={color} key={color.token} />
          ))}
        </div>

        <div className="surface-role-grid">
          {surfaceRoles.map((role) => (
            <SurfaceRoleCard
              colorMode={colorMode}
              key={role.token}
              role={role}
            />
          ))}
        </div>

        <p className="theme-subheading">Text roles</p>
        <p className="theme-subheading-copy">
          Both modes use a measured neutral scale to keep financial information
          readable at a glance. Stronger values establish hierarchy while muted
          roles recede when attention should move elsewhere.
        </p>
        <div className="text-role-grid">
          {textRoles.map((role) => (
            <TextRoleCard colorMode={colorMode} key={role.token} role={role} />
          ))}
        </div>

        <p className="theme-subheading">Theme roles</p>
        <p className="theme-subheading-copy">
          Indigo, emerald, and orange bring consistent energy to actions and
          emphasis in both modes without overwhelming the foundation. Each light
          and dark value is paired with deliberate content colors for clear
          contrast.
        </p>
        <div className="theme-role-grid">
          {themeRoles.map((role) => (
            <RoleCard
              cardClassName="theme-role-card"
              colorMode={colorMode}
              contentClassName="color-role-content"
              contentValueClassName="color-role-content-value"
              key={role.token}
              role={role}
              swatchClassName="theme-role-swatch"
            />
          ))}
        </div>

        <p className="theme-subheading">Semantic roles</p>
        <p className="theme-subheading-copy">
          Structural roles establish separation, interaction states guide
          attention and input, and feedback states communicate system status
          with neighboring hues that stay harmonious with the theme roles.
          Content pairings keep each role readable in both modes.
        </p>
        <div className="semantic-color-groups">
          {semanticColorGroups.map((group) => (
            <SemanticColorGroup
              colorMode={colorMode}
              group={group}
              key={group.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
