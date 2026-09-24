import { useState } from "react";
import { MoreHorizontal, Pencil, Pin, Settings, Trash2 } from "lucide-react";
import {
  ActionIcon,
  actionIconSizes,
  buttonColors,
  buttonVariants,
} from "../../../src";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import demoStyles from "../../components/ComponentDemoSection/ComponentDemoSection.module.css";
import pageStyles from "../Page.module.css";
import styles from "./ActionIconPage.module.css";

const actionIconSizeLabels = {
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

const actionIconIcons = {
  more: MoreHorizontal,
  pencil: Pencil,
  pin: Pin,
  settings: Settings,
} as const;
type ActionIconIcon = keyof typeof actionIconIcons;

const actionIconIconLabels: Record<ActionIconIcon, string> = {
  more: "More horizontal",
  pencil: "Pencil",
  pin: "Pin",
  settings: "Settings",
};

export function ActionIconPage() {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedVariant, setSelectedVariant] =
    useState<(typeof buttonVariants)[number]>("filled");
  const [selectedColor, setSelectedColor] =
    useState<(typeof buttonColors)[number]>("primary");
  const [selectedSize, setSelectedSize] =
    useState<(typeof actionIconSizes)[number]>("md");
  const [selectedIcon, setSelectedIcon] = useState<ActionIconIcon>("settings");
  const [isPlaygroundLoading, setIsPlaygroundLoading] = useState(false);
  const [isPlaygroundDisabled, setIsPlaygroundDisabled] = useState(false);
  const [isPlaygroundSelected, setIsPlaygroundSelected] = useState(false);
  const PlaygroundIcon = actionIconIcons[selectedIcon];
  const playgroundProps = [
    `aria-label="${actionIconIconLabels[selectedIcon]} action"`,
    `color="${selectedColor}"`,
    `size="${selectedSize}"`,
    `variant="${selectedVariant}"`,
    isPlaygroundLoading && "loading",
    isPlaygroundDisabled && "disabled",
    isPlaygroundSelected && "selected",
  ].filter(Boolean);
  const playgroundCode = `<ActionIcon
${playgroundProps.map((prop) => `  ${prop}`).join("\n")}
>
  <${PlaygroundIcon.displayName ?? actionIconIconLabels[selectedIcon].replaceAll(" ", "")} size={16} />
</ActionIcon>`;

  return (
    <section className={pageStyles.componentSection} id="action-icon">
      <div className={pageStyles.sectionHeading}>
        <div>
          <p className={pageStyles.eyebrow}>Actions</p>
          <h2>ActionIcon</h2>
        </div>
        <code>import {"{ ActionIcon }"} from '@teelur/budget-board-ui';</code>
      </div>
      <p className={pageStyles.sectionCopy}>
        A square icon-only action with the same semantic colors, variants, and
        interaction states as Button.
      </p>
      <p className={pageStyles.sectionCopy}>
        Icon-only controls must provide an accessible name, usually with
        <code>aria-label</code>.
      </p>

      <ComponentDemoSection
        description="Use the same visual variants as Button while keeping the control square."
        id="action-icon-variants"
        title="Variants"
        code={buttonVariants
          .map(
            (variant) =>
              `<ActionIcon aria-label="Settings" variant="${variant}">
  <Settings size={16} />
</ActionIcon>`,
          )
          .join("\n")}
      >
        <div className={styles.actionIconStack}>
          {buttonVariants.map((variant) => (
            <ActionIcon
              aria-label={`${variant} settings`}
              key={variant}
              variant={variant}
            >
              <Settings size={16} />
            </ActionIcon>
          ))}
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Semantic colors communicate intent; contrast provides a theme-aware black or white icon action."
        id="action-icon-colors"
        title="Colors"
        code={buttonColors
          .map(
            (color) =>
              `<ActionIcon aria-label="${color} action" color="${color}">
  <Pencil size={16} />
</ActionIcon>`,
          )
          .join("\n")}
      >
        <div className={styles.actionIconStack}>
          {buttonColors.map((color) => (
            <ActionIcon
              aria-label={`${color} action`}
              color={color}
              key={color}
            >
              <Pencil size={16} />
            </ActionIcon>
          ))}
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Preset sizes match Button; use any CSS size value for custom dimensions. Numbers are interpreted as pixels."
        id="action-icon-sizes"
        title="Sizes"
        code={[
          ...actionIconSizes.map(
            (size) =>
              `<ActionIcon aria-label="${actionIconSizeLabels[size]} action" size="${size}">
  <MoreHorizontal />
</ActionIcon>`,
          ),
          `<ActionIcon aria-label="48 pixel action" size={48}>
  <MoreHorizontal />
</ActionIcon>`,
          `<ActionIcon aria-label="2.5 rem action" size="2.5rem">
  <MoreHorizontal />
</ActionIcon>`,
        ].join("\n")}
      >
        <div className={styles.actionIconSizeStack}>
          {actionIconSizes.map((size) => (
            <div className={styles.actionIconSizeItem} key={size}>
              <ActionIcon
                aria-label={`${actionIconSizeLabels[size]} action`}
                size={size}
              >
                <MoreHorizontal size={16} />
              </ActionIcon>
              <span>{actionIconSizeLabels[size]}</span>
            </div>
          ))}
          <div className={styles.actionIconSizeItem}>
            <ActionIcon aria-label="48 pixel action" size={48}>
              <MoreHorizontal size={16} />
            </ActionIcon>
            <span>Custom: 48px</span>
          </div>
          <div className={styles.actionIconSizeItem}>
            <ActionIcon aria-label="2.5 rem action" size="2.5rem">
              <MoreHorizontal size={16} />
            </ActionIcon>
            <span>Custom: 2.5rem</span>
          </div>
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="For filled icons, selected=true is the solid on state and selected=false is the outlined off state; loading and disabled states preserve accessible button behavior."
        id="action-icon-states"
        title="States"
        code={`const [selected, setSelected] = useState(false);

<ActionIcon
  aria-label="Pin transaction"
  selected={selected}
  onClick={() => setSelected((current) => !current)}
>
  <Pin size={16} />
</ActionIcon>
<ActionIcon aria-label="Saving" loading>
  <Settings size={16} />
</ActionIcon>
<ActionIcon aria-label="Unavailable" disabled>
  <Trash2 size={16} />
</ActionIcon>`}
      >
        <div
          className={`${styles.actionIconStack} ${styles.actionIconStateDemo}`}
        >
          <ActionIcon
            aria-label="Pin transaction"
            onClick={() => setIsSelected((current) => !current)}
            selected={isSelected}
          >
            <Pin size={16} />
          </ActionIcon>
          <ActionIcon aria-label="Saving" loading>
            <Settings size={16} />
          </ActionIcon>
          <ActionIcon aria-label="Unavailable" disabled>
            <Trash2 size={16} />
          </ActionIcon>
          <span aria-live="polite">{isSelected ? "Pinned" : "Not pinned"}</span>
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Adjust the public props together and see the resulting icon action immediately."
        id="action-icon-playground"
        title="Playground"
        code={playgroundCode}
      >
        <div className={styles.actionIconPlayground}>
          <div className={styles.actionIconPlaygroundControls}>
            <div className={styles.actionIconControlGroup}>
              <div>
                <p className={styles.actionIconControlHeading}>Appearance</p>
                <p className={styles.actionIconControlCopy}>
                  Tune the visual treatment and scale.
                </p>
              </div>
              <div className={styles.actionIconControlGrid}>
                <label className={styles.actionIconField}>
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
                        {variant}
                      </option>
                    ))}
                  </select>
                </label>
                <label className={styles.actionIconField}>
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
                        {color}
                      </option>
                    ))}
                  </select>
                </label>
                <label className={styles.actionIconField}>
                  <span>Size</span>
                  <select
                    value={selectedSize}
                    onChange={(event) =>
                      setSelectedSize(event.target.value as typeof selectedSize)
                    }
                  >
                    {actionIconSizes.map((size) => (
                      <option key={size} value={size}>
                        {actionIconSizeLabels[size]}
                      </option>
                    ))}
                  </select>
                </label>
                <label className={styles.actionIconField}>
                  <span>Icon</span>
                  <select
                    value={selectedIcon}
                    onChange={(event) =>
                      setSelectedIcon(event.target.value as ActionIconIcon)
                    }
                  >
                    {Object.entries(actionIconIconLabels).map(
                      ([icon, label]) => (
                        <option key={icon} value={icon}>
                          {label}
                        </option>
                      ),
                    )}
                  </select>
                </label>
              </div>
            </div>

            <div className={styles.actionIconControlGroup}>
              <div>
                <p className={styles.actionIconControlHeading}>Behavior</p>
                <p className={styles.actionIconControlCopy}>
                  Test availability and selection states.
                </p>
              </div>
              <div className={styles.actionIconToggleGrid}>
                <label className={styles.actionIconToggle}>
                  <input
                    checked={isPlaygroundLoading}
                    onChange={(event) =>
                      setIsPlaygroundLoading(event.target.checked)
                    }
                    type="checkbox"
                  />
                  <span>Loading</span>
                </label>
                <label className={styles.actionIconToggle}>
                  <input
                    checked={isPlaygroundDisabled}
                    onChange={(event) =>
                      setIsPlaygroundDisabled(event.target.checked)
                    }
                    type="checkbox"
                  />
                  <span>Disabled</span>
                </label>
                <label className={styles.actionIconToggle}>
                  <input
                    checked={isPlaygroundSelected}
                    onChange={(event) =>
                      setIsPlaygroundSelected(event.target.checked)
                    }
                    type="checkbox"
                  />
                  <span>Selected</span>
                </label>
              </div>
            </div>
          </div>

          <div className={styles.actionIconPlaygroundPreview}>
            <span className={styles.actionIconPreviewLabel}>
              Rendered result
            </span>
            <div className={styles.actionIconPreviewStage}>
              <ActionIcon
                aria-label={`${actionIconIconLabels[selectedIcon]} action`}
                color={selectedColor}
                disabled={isPlaygroundDisabled}
                loading={isPlaygroundLoading}
                selected={isPlaygroundSelected}
                size={selectedSize}
                variant={selectedVariant}
              >
                <PlaygroundIcon size={16} />
              </ActionIcon>
            </div>
          </div>
        </div>
      </ComponentDemoSection>

      <section
        className={pageStyles.componentReferenceSection}
        id="action-icon-api"
      >
        <div className={demoStyles.componentDemoHeading}>
          <div>
            <h3>API reference</h3>
            <p>Every public prop, its accepted values, and its default.</p>
          </div>
          <a
            aria-label="Link to ActionIcon API reference section"
            className={demoStyles.componentDemoAnchor}
            href="#action-icon-api"
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
                  <td>Icon content</td>
                </tr>
                <tr>
                  <th>aria-label</th>
                  <td>
                    <code>string</code>
                  </td>
                  <td>Required for icon-only accessible naming</td>
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
                  <th>loading</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>false</td>
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
                    <code>{actionIconSizes.join(" | ")} | string | number</code>
                  </td>
                  <td>md; numbers use pixels</td>
                </tr>
                <tr>
                  <th>variant</th>
                  <td>
                    <code>{buttonVariants.join(" | ")}</code>
                  </td>
                  <td>filled</td>
                </tr>
                <tr>
                  <th>native button attributes</th>
                  <td>
                    <code>ButtonHTMLAttributes&lt;HTMLButtonElement&gt;</code>
                  </td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>Mantine dimension and style props</th>
                  <td>
                    <code>StyleProp&lt;string | number&gt;</code>
                  </td>
                  <td>
                    <code>w, miw, maw, h, mih, mah, style</code>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <pre className={pageStyles.codeBlock}>
            <code>{`<ActionIcon
  aria-label="Edit transaction"
  color="primary"
  size="md"
>
  <Pencil size={16} />
</ActionIcon>`}</code>
          </pre>
        </div>
      </section>
    </section>
  );
}
