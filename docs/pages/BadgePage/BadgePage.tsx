import { useState } from "react";
import { Badge, badgeColors, badgeSizes, badgeVariants } from "../../../src";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import demoStyles from "../../components/ComponentDemoSection/ComponentDemoSection.module.css";
import pageStyles from "../Page.module.css";
import styles from "./BadgePage.module.css";

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

const badgeSizeLabels = {
  xs: "Extra small (20px)",
  sm: "Small (24px)",
  md: "Medium (28px)",
} as const;

export function BadgePage() {
  const [selectedColor, setSelectedColor] =
    useState<(typeof badgeColors)[number]>("primary");
  const [selectedVariant, setSelectedVariant] =
    useState<(typeof badgeVariants)[number]>("filled");
  const [selectedSize, setSelectedSize] =
    useState<(typeof badgeSizes)[number]>("md");
  const [badgeLabel, setBadgeLabel] = useState("Ready to review");
  const [leftSection, setLeftSection] = useState("•");
  const [rightSection, setRightSection] = useState("");
  const [isConstrained, setIsConstrained] = useState(false);
  const renderedLabel = badgeLabel || "Badge";
  const playgroundProps = [
    `color="${selectedColor}"`,
    `variant="${selectedVariant}"`,
    `size="${selectedSize}"`,
    leftSection && `leftSection={${JSON.stringify(leftSection)}}`,
    rightSection && `rightSection={${JSON.stringify(rightSection)}}`,
    isConstrained && `h={32} maw="100%" miw={160} w={220}`,
  ].filter(Boolean);
  const playgroundCode = `<Badge
${playgroundProps.map((prop) => `  ${prop}`).join("\n")}
>
  ${renderedLabel}
</Badge>`;

  return (
    <section className={pageStyles.componentSection} id="badge">
      <div className={pageStyles.sectionHeading}>
        <div>
          <p className={pageStyles.eyebrow}>Status & metadata</p>
          <h2>Badge</h2>
        </div>
        <code>import {"{ Badge }"} from '@teelur/budget-board-ui';</code>
      </div>
      <p className={pageStyles.sectionCopy}>
        A compact passive label for status, category, and metadata. Use Button
        or ActionIcon when the label needs to perform an action.
      </p>
      <p className={pageStyles.sectionCopy}>
        Badge does not announce itself as a live region. Add the appropriate
        ARIA semantics at the call site when a status update needs announcing.
      </p>

      <ComponentDemoSection
        description="Use filled, light, outline, or ghost treatments to establish the right visual weight."
        id="badge-variants"
        title="Variants"
        code={badgeVariants
          .map(
            (variant) =>
              `<Badge variant="${variant}">${capitalize(variant)}</Badge>`,
          )
          .join("\n")}
      >
        <div className={styles.stack}>
          {badgeVariants.map((variant) => (
            <Badge key={variant} variant={variant}>
              {capitalize(variant)}
            </Badge>
          ))}
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Semantic colors reuse the same theme roles as Button, including feedback, neutral, and contrast colors."
        id="badge-colors"
        title="Colors"
        code={badgeColors
          .map(
            (color) => `<Badge color="${color}">${capitalize(color)}</Badge>`,
          )
          .join("\n")}
      >
        <div className={styles.stack}>
          {badgeColors.map((color) => (
            <Badge color={color} key={color}>
              {capitalize(color)}
            </Badge>
          ))}
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Use the compact size scale to match the density of the surrounding content."
        id="badge-sizes"
        title="Sizes"
        code={badgeSizes
          .map(
            (size) => `<Badge size="${size}">${badgeSizeLabels[size]}</Badge>`,
          )
          .join("\n")}
      >
        <div className={styles.sizeStack}>
          {badgeSizes.map((size) => (
            <div className={styles.sizeItem} key={size}>
              <Badge size={size}>{capitalize(size)}</Badge>
              <span>{badgeSizeLabels[size]}</span>
            </div>
          ))}
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Use sections for small decorative indicators or contextual symbols beside the label."
        id="badge-sections"
        title="Sections"
        code={`<Badge leftSection="•" rightSection="→">
  Ready to review
</Badge>`}
      >
        <div className={styles.stack}>
          <Badge leftSection="•" rightSection="→">
            Ready to review
          </Badge>
          <Badge color="success" leftSection="✓">
            Synced
          </Badge>
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Badge accepts Mantine layout props when its surrounding layout needs constrained dimensions."
        id="badge-dimensions"
        title="Dimensions"
        code={`<Badge h={32} maw="100%" miw={160} w={220}>
  Constrained status
</Badge>`}
      >
        <Badge h={32} maw="100%" miw={160} w={220}>
          Constrained status
        </Badge>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Adjust the public props together and see the resulting passive label immediately."
        id="badge-playground"
        title="Playground"
        code={playgroundCode}
      >
        <div className={styles.playground}>
          <div className={styles.playgroundControls}>
            <div className={styles.controlGrid}>
              <label className={styles.field}>
                <span>Color</span>
                <select
                  onChange={(event) =>
                    setSelectedColor(event.target.value as typeof selectedColor)
                  }
                  value={selectedColor}
                >
                  {badgeColors.map((color) => (
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
                  {badgeVariants.map((variant) => (
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
                  {badgeSizes.map((size) => (
                    <option key={size} value={size}>
                      {capitalize(size)}
                    </option>
                  ))}
                </select>
              </label>
              <label className={styles.field}>
                <span>Label</span>
                <input
                  onChange={(event) => setBadgeLabel(event.target.value)}
                  placeholder="Badge label"
                  type="text"
                  value={badgeLabel}
                />
              </label>
              <label className={styles.field}>
                <span>Left section</span>
                <input
                  aria-label="Left section"
                  onChange={(event) => setLeftSection(event.target.value)}
                  placeholder="Optional"
                  type="text"
                  value={leftSection}
                />
              </label>
              <label className={styles.field}>
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
            <label className={styles.toggle}>
              <input
                checked={isConstrained}
                onChange={(event) => setIsConstrained(event.target.checked)}
                type="checkbox"
              />
              <span>Constrain dimensions</span>
            </label>
          </div>
          <div className={styles.playgroundPreview}>
            <span className={styles.previewLabel}>Rendered result</span>
            <div className={styles.previewStage}>
              <Badge
                color={selectedColor}
                h={isConstrained ? 32 : undefined}
                leftSection={leftSection || undefined}
                maw={isConstrained ? "100%" : undefined}
                miw={isConstrained ? 160 : undefined}
                rightSection={rightSection || undefined}
                size={selectedSize}
                variant={selectedVariant}
                w={isConstrained ? 220 : undefined}
              >
                {renderedLabel}
              </Badge>
            </div>
          </div>
        </div>
      </ComponentDemoSection>

      <section className={pageStyles.componentReferenceSection} id="badge-api">
        <div className={demoStyles.componentDemoHeading}>
          <div>
            <h3>API reference</h3>
            <p>Every public prop, its accepted values, and its default.</p>
          </div>
          <a
            aria-label="Link to API reference section"
            className={demoStyles.componentDemoAnchor}
            href="#badge-api"
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
                  <th>color</th>
                  <td>
                    <code>{badgeColors.join(" | ")}</code>
                  </td>
                  <td>primary</td>
                </tr>
                <tr>
                  <th>variant</th>
                  <td>
                    <code>{badgeVariants.join(" | ")}</code>
                  </td>
                  <td>filled</td>
                </tr>
                <tr>
                  <th>size</th>
                  <td>
                    <code>{badgeSizes.join(" | ")}</code>
                  </td>
                  <td>md</td>
                </tr>
                <tr>
                  <th>leftSection / rightSection</th>
                  <td>
                    <code>ReactNode</code>
                  </td>
                  <td>-</td>
                </tr>
                <tr>
                  <th>Mantine style props</th>
                  <td>
                    <code>BoxProps</code>
                  </td>
                  <td>forwarded to the root span</td>
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
                  <td>merged with component styles</td>
                </tr>
                <tr>
                  <th>native span attributes</th>
                  <td>
                    <code>HTMLAttributes&lt;HTMLSpanElement&gt;</code>
                  </td>
                  <td>forwarded to the root span</td>
                </tr>
              </tbody>
            </table>
          </div>
          <pre className={pageStyles.codeBlock}>
            <code>{`<Badge color="success" variant="light" size="sm">
  Synced
</Badge>`}</code>
          </pre>
        </div>
      </section>
    </section>
  );
}
