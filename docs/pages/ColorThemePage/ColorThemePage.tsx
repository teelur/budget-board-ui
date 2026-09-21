import { budgetBoardColors } from "../../../src";
import { ColorCard } from "../../components/color/ColorCard/ColorCard";
import type { ColorMode } from "../../components/color/colorCardTypes";
import { RoleCard } from "../../components/color/RoleCard/RoleCard";
import { SemanticColorGroup } from "../../components/color/SemanticColorGroup/SemanticColorGroup";
import { SurfaceRoleCard } from "../../components/color/SurfaceRoleCard/SurfaceRoleCard";
import { TextRoleCard } from "../../components/color/TextRoleCard/TextRoleCard";
import pageStyles from "../Page.module.css";
import styles from "./ColorThemePage.module.css";

const lightColors = [
  {
    name: "Canvas",
    token: "--bb-color-page",
    value: budgetBoardColors.light.page.toUpperCase(),
    description:
      "The main application background behind every page and layout region.",
    className: "color-light-canvas",
  },
  {
    name: "Primary surface",
    token: "--bb-color-surface",
    value: budgetBoardColors.light.surface.toUpperCase(),
    description:
      "The default surface for cards, content panels, and focused work areas.",
    className: "color-light-surface",
  },
  {
    name: "Elevated surface",
    token: "--bb-color-surface-elevated",
    value: budgetBoardColors.light.surfaceElevated.toUpperCase(),
    description:
      "A gently lifted layer for menus, controls, dialogs, and temporary focus.",
    className: "color-light-elevated",
  },
  {
    name: "Navigation",
    token: "--bb-color-navigation",
    value: budgetBoardColors.light.navigation.toUpperCase(),
    description:
      "The distinct shell surface used by navigation and app-level chrome.",
    className: "color-light-navigation",
  },
] as const;

const darkColors = [
  {
    name: "Canvas",
    token: "--bb-color-page",
    value: budgetBoardColors.dark.page.toUpperCase(),
    description:
      "The main application background behind every page and layout region.",
    className: "color-dark-canvas",
  },
  {
    name: "Primary surface",
    token: "--bb-color-surface",
    value: budgetBoardColors.dark.surface.toUpperCase(),
    description:
      "The default surface for cards, content panels, and focused work areas.",
    className: "color-dark-surface",
  },
  {
    name: "Elevated surface",
    token: "--bb-color-surface-elevated",
    value: budgetBoardColors.dark.surfaceElevated.toUpperCase(),
    description:
      "A lighter layer for menus, controls, dialogs, and temporary focus.",
    className: "color-dark-elevated",
  },
  {
    name: "Navigation",
    token: "--bb-color-navigation",
    value: budgetBoardColors.dark.navigation.toUpperCase(),
    description:
      "The distinct shell surface used by navigation and app-level chrome.",
    className: "color-dark-navigation",
  },
] as const;

const surfaceRoles = [
  {
    name: "Sunken surface",
    token: "--bb-color-surface-sunken",
    lightValue: budgetBoardColors.light.surfaceSunken.toUpperCase(),
    darkValue: budgetBoardColors.dark.surfaceSunken.toUpperCase(),
    description: "A recessed layer for wells, inactive regions, and depth.",
    lightClassName: "color-light-sunken",
    darkClassName: "color-dark-sunken",
  },
  {
    name: "Overlay surface",
    token: "--bb-color-surface-overlay",
    lightValue: budgetBoardColors.light.surfaceOverlay.toUpperCase(),
    darkValue: budgetBoardColors.dark.surfaceOverlay.toUpperCase(),
    description: "A focused layer for overlays, popovers, and temporary work.",
    lightClassName: "color-light-overlay",
    darkClassName: "color-dark-overlay",
  },
] as const;

const textRoles = [
  {
    name: "Heading",
    token: "--bb-color-text-heading",
    lightValue: budgetBoardColors.light.textHeading.toUpperCase(),
    darkValue: budgetBoardColors.dark.textHeading.toUpperCase(),
    className: "text-role-heading",
    description:
      "Page, section, and card headings. Strongest neutral text role.",
  },
  {
    name: "Primary",
    token: "--bb-color-text-primary",
    lightValue: budgetBoardColors.light.textPrimary.toUpperCase(),
    darkValue: budgetBoardColors.dark.textPrimary.toUpperCase(),
    className: "text-role-primary",
    description: "Main transaction text, amounts, and important labels.",
  },
  {
    name: "Secondary",
    token: "--bb-color-text-secondary",
    lightValue: budgetBoardColors.light.textSecondary.toUpperCase(),
    darkValue: budgetBoardColors.dark.textSecondary.toUpperCase(),
    className: "text-role-secondary",
    description: "Supporting descriptions and helper copy.",
  },
  {
    name: "Metadata",
    token: "--bb-color-text-metadata",
    lightValue: budgetBoardColors.light.textMetadata.toUpperCase(),
    darkValue: budgetBoardColors.dark.textMetadata.toUpperCase(),
    className: "text-role-metadata",
    description:
      "Dates, categories, timestamps, and compact transaction details.",
  },
  {
    name: "Muted",
    token: "--bb-color-text-muted",
    lightValue: budgetBoardColors.light.textMuted.toUpperCase(),
    darkValue: budgetBoardColors.dark.textMuted.toUpperCase(),
    className: "text-role-muted",
    description: "Inactive navigation and low-priority labels.",
  },
  {
    name: "Disabled",
    token: "--bb-color-text-disabled",
    lightValue: budgetBoardColors.light.textDisabled.toUpperCase(),
    darkValue: budgetBoardColors.dark.textDisabled.toUpperCase(),
    className: "text-role-disabled",
    description: "Unavailable controls and disabled content.",
  },
  {
    name: "Inverse",
    token: "--bb-color-text-inverse",
    lightValue: budgetBoardColors.light.textInverse.toUpperCase(),
    darkValue: budgetBoardColors.dark.textInverse.toUpperCase(),
    className: "text-role-inverse",
    description:
      "High-contrast text for dark surfaces in light mode and light surfaces in dark mode.",
  },
] as const;

const themeRoles = [
  {
    name: "Primary",
    token: "--bb-color-primary",
    lightValue: budgetBoardColors.light.primary.toUpperCase(),
    darkValue: budgetBoardColors.dark.primary.toUpperCase(),
    lightContent: budgetBoardColors.light.primaryContent.toUpperCase(),
    darkContent: budgetBoardColors.dark.primaryContent.toUpperCase(),
    description:
      "Primary actions, active states, and the clearest call to action.",
    lightClassName: "theme-role-light-primary",
    darkClassName: "theme-role-dark-primary",
  },
  {
    name: "Secondary",
    token: "--bb-color-secondary",
    lightValue: budgetBoardColors.light.secondary.toUpperCase(),
    darkValue: budgetBoardColors.dark.secondary.toUpperCase(),
    lightContent: budgetBoardColors.light.secondaryContent.toUpperCase(),
    darkContent: budgetBoardColors.dark.secondaryContent.toUpperCase(),
    description: "Supporting actions and complementary control surfaces.",
    lightClassName: "theme-role-light-secondary",
    darkClassName: "theme-role-dark-secondary",
  },
  {
    name: "Accent",
    token: "--bb-color-accent",
    lightValue: budgetBoardColors.light.accent.toUpperCase(),
    darkValue: budgetBoardColors.dark.accent.toUpperCase(),
    lightContent: budgetBoardColors.light.accentContent.toUpperCase(),
    darkContent: budgetBoardColors.dark.accentContent.toUpperCase(),
    description:
      "Focused emphasis for highlights, attention, and memorable moments.",
    lightClassName: "theme-role-light-accent",
    darkClassName: "theme-role-dark-accent",
  },
  {
    name: "Muted",
    token: "--bb-color-muted",
    lightValue: budgetBoardColors.light.muted.toUpperCase(),
    darkValue: budgetBoardColors.dark.muted.toUpperCase(),
    lightContent: budgetBoardColors.light.mutedContent.toUpperCase(),
    darkContent: budgetBoardColors.dark.mutedContent.toUpperCase(),
    description: "Quiet secondary actions such as cancel and go back.",
    lightClassName: "theme-role-light-muted",
    darkClassName: "theme-role-dark-muted",
  },
  {
    name: "Neutral",
    token: "--bb-color-neutral",
    lightValue: budgetBoardColors.light.neutral.toUpperCase(),
    darkValue: budgetBoardColors.dark.neutral.toUpperCase(),
    lightContent: budgetBoardColors.light.neutralContent.toUpperCase(),
    darkContent: budgetBoardColors.dark.neutralContent.toUpperCase(),
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
        lightValue: budgetBoardColors.light.borderSubtle.toUpperCase(),
        darkValue: budgetBoardColors.dark.borderSubtle.toUpperCase(),
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
        lightValue: budgetBoardColors.light.borderStrong.toUpperCase(),
        darkValue: budgetBoardColors.dark.borderStrong.toUpperCase(),
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
        lightValue: budgetBoardColors.light.focusRing.toUpperCase(),
        darkValue: budgetBoardColors.dark.focusRing.toUpperCase(),
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
        lightValue: budgetBoardColors.light.selection.toUpperCase(),
        darkValue: budgetBoardColors.dark.selection.toUpperCase(),
        lightContent: null,
        darkContent: null,
        lightClassName: "semantic-role-light-selection",
        darkClassName: "semantic-role-dark-selection",
        description:
          "Selected rows, fields, and active regions without overpowering their content.",
      },
      {
        name: "Button hover border",
        token: "--bb-color-button-hover-border",
        lightValue: budgetBoardColors.light.buttonHoverBorder.toUpperCase(),
        darkValue: budgetBoardColors.dark.buttonHoverBorder.toUpperCase(),
        lightContent: null,
        darkContent: null,
        lightClassName: "semantic-role-light-button-hover-border",
        darkClassName: "semantic-role-dark-button-hover-border",
        description:
          "Interactive button border shown on hover while preserving each button's background treatment.",
      },
    ],
  },
  {
    name: "Feedback states",
    roles: [
      {
        name: "Info",
        token: "--bb-color-info",
        lightValue: budgetBoardColors.light.info.toUpperCase(),
        darkValue: budgetBoardColors.dark.info.toUpperCase(),
        lightContent: budgetBoardColors.light.infoContent.toUpperCase(),
        darkContent: budgetBoardColors.dark.infoContent.toUpperCase(),
        lightClassName: "semantic-role-light-info",
        darkClassName: "semantic-role-dark-info",
        description:
          "Neutral system messages, guidance, and informational status.",
      },
      {
        name: "Success",
        token: "--bb-color-success",
        lightValue: budgetBoardColors.light.success.toUpperCase(),
        darkValue: budgetBoardColors.dark.success.toUpperCase(),
        lightContent: budgetBoardColors.light.successContent.toUpperCase(),
        darkContent: budgetBoardColors.dark.successContent.toUpperCase(),
        lightClassName: "semantic-role-light-success",
        darkClassName: "semantic-role-dark-success",
        description:
          "Positive confirmation for completed actions and healthy states.",
      },
      {
        name: "Warning",
        token: "--bb-color-warning",
        lightValue: budgetBoardColors.light.warning.toUpperCase(),
        darkValue: budgetBoardColors.dark.warning.toUpperCase(),
        lightContent: budgetBoardColors.light.warningContent.toUpperCase(),
        darkContent: budgetBoardColors.dark.warningContent.toUpperCase(),
        lightClassName: "semantic-role-light-warning",
        darkClassName: "semantic-role-dark-warning",
        description: "Cautions that need attention without implying failure.",
      },
      {
        name: "Error",
        token: "--bb-color-error",
        lightValue: budgetBoardColors.light.error.toUpperCase(),
        darkValue: budgetBoardColors.dark.error.toUpperCase(),
        lightContent: budgetBoardColors.light.errorContent.toUpperCase(),
        darkContent: budgetBoardColors.dark.errorContent.toUpperCase(),
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
    <section className={pageStyles.componentSection} id="color-theme">
      <div className={pageStyles.sectionHeading}>
        <div>
          <p className={pageStyles.eyebrow}>Color foundations</p>
          <h2>Color theme</h2>
        </div>
        <code>{colorMode} mode</code>
      </div>
      <p className={pageStyles.sectionCopy}>
        A restrained background system keeps the canvas, working surfaces, and
        application chrome distinct without relying on heavy shadows. Surfaces,
        text, and theme roles establish the visual foundation for the rest of
        the interface. Toggle the mode control in the header to preview both
        palettes.
      </p>
      <div className={styles.colorThemeSection}>
        <p className={styles.themeSubheading}>Surfaces</p>
        <p className={styles.themeSubheadingCopy}>
          Light and dark surfaces use the same quiet, grounded hierarchy while
          adapting their values to the surrounding mode. Small shifts in value
          create depth without depending on heavy shadows.
        </p>
        <div className={styles.colorGrid}>
          {colors.map((color) => (
            <ColorCard color={color} key={color.token} />
          ))}
        </div>

        <div className={styles.surfaceRoleGrid}>
          {surfaceRoles.map((role) => (
            <SurfaceRoleCard
              colorMode={colorMode}
              key={role.token}
              role={role}
            />
          ))}
        </div>

        <p className={styles.themeSubheading}>Text roles</p>
        <p className={styles.themeSubheadingCopy}>
          Both modes use a measured neutral scale to keep financial information
          readable at a glance. Stronger values establish hierarchy while muted
          roles recede when attention should move elsewhere.
        </p>
        <div className={styles.textRoleGrid}>
          {textRoles.map((role) => (
            <TextRoleCard colorMode={colorMode} key={role.token} role={role} />
          ))}
        </div>

        <p className={styles.themeSubheading}>Theme roles</p>
        <p className={styles.themeSubheadingCopy}>
          Indigo, emerald, and orange bring consistent energy to actions and
          emphasis in both modes without overwhelming the foundation. Each light
          and dark value is paired with deliberate content colors for clear
          contrast.
        </p>
        <div className={styles.themeRoleGrid}>
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

        <p className={styles.themeSubheading}>Semantic roles</p>
        <p className={styles.themeSubheadingCopy}>
          Structural roles establish separation, interaction states guide
          attention and input, and feedback states communicate system status
          with neighboring hues that stay harmonious with the theme roles.
          Content pairings keep each role readable in both modes.
        </p>
        <div className={styles.semanticColorGroups}>
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
