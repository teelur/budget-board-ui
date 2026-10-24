import { Card } from "../../../src";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import { ApiPlayground } from "../../components/ApiPlayground/ApiPlayground";
import demoStyles from "../../components/ComponentDemoSection/ComponentDemoSection.module.css";
import pageStyles from "../Page.module.css";
import styles from "./CardPage.module.css";
import { BodyText, DataText, HeadingText } from "../../../src";
import type { CardSurface } from "../../../src";

const plainCardExample = `<Card>
  <p>OCTOBER 2026</p>
  <h3>Available balance</h3>
  <strong>$8,420.50</strong>
</Card>`;

const nestedCardExample = `<Card>
  <strong>Monthly budget</strong>
  <Card surface="elevated">
    <span>Remaining</span>
    <strong>$640.00</strong>
  </Card>
</Card>`;

const outlineCardExample = `<Card surface="outline">
  <strong>Account overview</strong>
  <p>Checking account balance: $4,218.32</p>
</Card>`;

const selectedCardExample = `<Card selected>
  <strong>Primary checking</strong>
  <span>Selected account</span>
</Card>`;

const splitCardExample = `<Card>
  <Card.Section>
    <div>
      <h3>Account balances</h3>
      <p>Updated just now</p>
    </div>
    <span>3 accounts</span>
  </Card.Section>
  <Card.Section>Everyday checking <strong>$4,218.32</strong></Card.Section>
  <Card.Section>Rainy day savings <strong>$4,202.18</strong></Card.Section>
</Card>`;

const thickSeparatorsExample = `<Card>
  <Card.Section>Account balances</Card.Section>
  <Card.Section separatorThickness="thick">
    Everyday checking <strong>$4,218.32</strong>
  </Card.Section>
  <Card.Section>Rainy day savings <strong>$4,202.18</strong></Card.Section>
</Card>`;

const labeledSectionExample = `<Card>
  <Card.Section label="or">Sign in with email</Card.Section>
  <Card.Section>Continue with identity provider</Card.Section>
</Card>`;

const hoverableCardExample = `<Card component="a" href="#card-api" hoverable>
  <span>Transactions</span>
  <strong>Review October activity</strong>
</Card>`;

const hoverableSectionExample = `<Card>
  <Card.Section component="a" href="#card-api" hoverable>Account balances</Card.Section>
  <Card.Section component="a" href="#card-api" hoverable>
    <span>Everyday checking</span>
    <strong>$4,218.32</strong>
  </Card.Section>
  <Card.Section>Rainy day savings</Card.Section>
</Card>`;

export function CardPage() {
  return (
    <section className={pageStyles.componentSection} id="card">
      <div className={pageStyles.sectionHeading}>
        <div>
          <BodyText
            component="p"
            className={pageStyles.eyebrow}
            tone="muted"
            ff="var(--bb-font-data)"
            fz="0.68rem"
          >
            Content
          </BodyText>
          <HeadingText level={2} tone="heading" lh={1.5}>
            Card
          </HeadingText>
        </div>
        <code>import {"{ Card }"} from '@teelur/budget-board-ui';</code>
      </div>
      <BodyText
        component="p"
        className={pageStyles.sectionCopy}
        tone="muted"
        m="1em 0"
      >
        A Card is the bordered surface and padded container. Put ordinary
        content directly inside it; use Card.Section for full-width rows that
        need a separator. Each section has its own padding, while the card
        controls how far sections extend to its edges.
      </BodyText>

      <ComponentDemoSection
        description="Use Card directly for a conventional padded surface."
        id="card-basic"
        title="Standard card"
        code={plainCardExample}
      >
        <div className={styles.preview}>
          <Card className={styles.plainCard}>
            <BodyText
              component="p"
              className={styles.eyebrow}
              tone="muted"
              ff="var(--bb-font-data)"
              fz="0.72rem"
              m="0 0 0.55rem"
            >
              October 2026
            </BodyText>
            <HeadingText
              level={3}
              className={styles.cardTitle}
              tone="heading"
              fz="1.05rem"
              fw={600}
              m={0}
              lh={1.5}
            >
              Available balance
            </HeadingText>
            <DataText
              component="strong"
              className={styles.amount}
              fz="1.5rem"
              fw={700}
              lh={1.5}
              tone="heading"
              m="0.65rem 0 0"
            >
              $8,420.50
            </DataText>
          </Card>
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description={
          'Use surface="elevated" for a card layered above another card.'
        }
        id="card-nested"
        title="Elevated nested card"
        code={nestedCardExample}
      >
        <div className={styles.preview}>
          <Card p="sm">
            <BodyText component="strong" fw={600}>
              Monthly budget
            </BodyText>
            <Card surface="elevated" mt="sm">
              <BodyText component="span" tone="muted">
                Remaining
              </BodyText>
              <DataText component="strong" fz="1.1rem" fw={700} lh={1.5}>
                $640.00
              </DataText>
            </Card>
          </Card>
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description={
          'Use surface="outline" for a card that blends into the app page background while retaining its border.'
        }
        id="card-outline"
        title="Outline surface"
        code={outlineCardExample}
      >
        <div className={styles.preview}>
          <Card surface="outline">
            <BodyText component="strong" fw={600}>
              Account overview
            </BodyText>
            <BodyText component="p" tone="muted" m="0.5rem 0 0">
              Checking account balance: $4,218.32
            </BodyText>
          </Card>
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description='Set separatorThickness="thick" on an individual Card.Section to make its separator 2px instead of 1px. Other sections keep their own thickness.'
        id="card-thick-separators"
        title="Thick section separators"
        code={thickSeparatorsExample}
      >
        <div className={styles.preview}>
          <Card className={styles.splitCard}>
            <Card.Section>Account balances</Card.Section>
            <Card.Section separatorThickness="thick">
              Everyday checking <strong>$4,218.32</strong>
            </Card.Section>
            <Card.Section>
              Rainy day savings <strong>$4,202.18</strong>
            </Card.Section>
          </Card>
        </div>
      </ComponentDemoSection>

      <ApiPlayground
        componentName="Card"
        controls={[
          {
            key: "surface",
            label: "Surface",
            type: "select",
            options: ["default", "elevated", "sunken", "outline"],
          },
          { key: "selected", label: "Selected", type: "toggle" },
          { key: "hoverable", label: "Hoverable", type: "toggle" },
        ]}
        defaultValues={{
          surface: "default",
          selected: false,
          hoverable: false,
        }}
        description="Try the default, elevated, sunken, and outline surfaces and compare selected and hoverable styling."
        id="card-playground"
        childrenCode="Account overview"
        render={(values) => (
          <Card
            hoverable={values.hoverable as boolean}
            selected={values.selected as boolean}
            surface={values.surface as CardSurface}
          >
            <BodyText component="strong" fw={600}>
              Account overview
            </BodyText>
          </Card>
        )}
      />

      <ComponentDemoSection
        description="selected adds token-based visual emphasis. The parent controls the selected state; it does not add interaction behavior."
        id="card-selected"
        title="Selected card"
        code={selectedCardExample}
      >
        <div className={styles.preview}>
          <Card className={styles.plainCard} selected>
            <BodyText component="strong" fw={600}>
              Primary checking
            </BodyText>
            <BodyText component="span" tone="muted">
              Selected account
            </BodyText>
          </Card>
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Put a label directly on a section's border; the section still owns its full padding."
        id="card-section-label"
        title="Labeled section border"
        code={labeledSectionExample}
      >
        <div className={styles.preview}>
          <Card className={styles.authCard}>
            <Card.Section label="or">
              <BodyText component="strong" fw={700}>
                Sign in with email
              </BodyText>
            </Card.Section>
            <Card.Section>
              <BodyText component="strong" fw={700}>
                Continue with identity provider
              </BodyText>
            </Card.Section>
          </Card>
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Card is the outer surface. Each Card.Section extends through the card's inset, then adds its own 0.5rem padding. The card grows to fit section content rather than clipping it at a smaller explicit height. Adjacent sections share one separator; the first and last sections keep the card's outer border clean. Use p, px, or py to change a section's content inset."
        id="card-sections"
        title="Card sections"
        code={splitCardExample}
      >
        <div className={styles.preview}>
          <Card className={styles.splitCard}>
            <Card.Section className={styles.cardHeader}>
              <div>
                <HeadingText
                  level={3}
                  className={styles.cardTitle}
                  tone="heading"
                  fz="1.05rem"
                  fw={600}
                  m={0}
                  lh={1.5}
                >
                  Account balances
                </HeadingText>
                <BodyText
                  component="p"
                  className={styles.cardSubtitle}
                  tone="muted"
                  ff="var(--bb-font-data)"
                  fz="0.72rem"
                  m="0.3rem 0 0"
                >
                  Updated just now
                </BodyText>
              </div>
              <BodyText
                component="span"
                className={styles.accountCount}
                tone="muted"
                ff="var(--bb-font-data)"
                fz="0.72rem"
              >
                3 accounts
              </BodyText>
            </Card.Section>
            <Card.Section>
              <div className={styles.accountRow}>
                <BodyText component="span">Everyday checking</BodyText>
                <DataText component="strong" fz="0.85rem" fw={700} lh={1.5}>
                  $4,218.32
                </DataText>
              </div>
            </Card.Section>
            <Card.Section>
              <div className={styles.accountRow}>
                <BodyText component="span">Rainy day savings</BodyText>
                <DataText component="strong" fz="0.85rem" fw={700} lh={1.5}>
                  $4,202.18
                </DataText>
              </div>
            </Card.Section>
          </Card>
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Make a section a native link with component and href. Hover, press, and keyboard focus use subtle surface-color feedback."
        id="card-hoverable-section"
        title="Hoverable section"
        code={hoverableSectionExample}
      >
        <div className={styles.preview}>
          <Card className={styles.splitCard}>
            <Card.Section component="a" href="#card-api" hoverable>
              Account balances
            </Card.Section>
            <Card.Section component="a" href="#card-api" hoverable>
              <div className={styles.accountRow}>
                <BodyText component="span">Everyday checking</BodyText>
                <DataText component="strong" fz="0.85rem" fw={700} lh={1.5}>
                  $4,218.32
                </DataText>
              </div>
            </Card.Section>
            <Card.Section>Rainy day savings</Card.Section>
          </Card>
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="hoverable adds visual hover and focus feedback with a pointer cursor. Select a native button or link root when the card is interactive."
        id="card-hoverable"
        title="Hoverable link"
        code={hoverableCardExample}
      >
        <div className={styles.preview}>
          <Card
            className={styles.linkCard}
            component="a"
            href="#card-api"
            hoverable
          >
            <BodyText
              component="span"
              className={styles.cardSubtitle}
              tone="muted"
              ff="var(--bb-font-data)"
              fz="0.72rem"
              m="0.3rem 0 0"
            >
              Transactions
            </BodyText>
            <BodyText component="strong" fw={600}>
              Review October activity
            </BodyText>
          </Card>
        </div>
      </ComponentDemoSection>

      <section className={pageStyles.componentReferenceSection} id="card-api">
        <div className={demoStyles.componentDemoHeading}>
          <div>
            <HeadingText level={3} tone="heading" lh={1.5}>
              API reference
            </HeadingText>
            <BodyText
              component="p"
              tone="secondary"
              fz="0.82rem"
              lh={1.55}
              m="0.45rem 0 0"
            >
              Mantine Card and Card.Section props are forwarded; BBUI adds
              semantic surface defaults and compound section styling.
            </BodyText>
          </div>
          <a
            aria-label="Link to Card API reference"
            className={demoStyles.componentDemoAnchor}
            href="#card-api"
          >
            #
          </a>
        </div>
        <div className={pageStyles.referenceGrid}>
          <div>
            <table>
              <tbody>
                <tr>
                  <th>Card</th>
                  <td>
                    <code>CardProps</code>
                  </td>
                  <td>
                    Mantine Card props and polymorphic roots. Defaults to a
                    <code>surface</code> background, <code>border-subtle</code>
                    border, and <code>0.5rem</code> padding. Consumer props
                    override these defaults. The <code>padding</code> prop also
                    controls the inset that sections extend through; scalar{" "}
                    <code>p</code> values keep that inset aligned.
                  </td>
                </tr>
                <tr>
                  <th>surface</th>
                  <td>
                    <code>CardSurface</code>
                  </td>
                  <td>
                    Defaults to <code>default</code>, which uses the standard
                    surface. Use <code>elevated</code> for cards layered above
                    other cards; it uses the <code>surface-elevated</code>{" "}
                    token in light and dark modes. Use <code>sunken</code> for
                    recessed surfaces; it uses the <code>surface-sunken</code>{" "}
                    token. Use <code>outline</code> to match the app page
                    background while retaining the subtle border.
                  </td>
                </tr>
                <tr>
                  <th>Card.Section</th>
                  <td>
                    <code>CardSectionProps</code>
                  </td>
                  <td>
                    Use for each card content section. Defaults to{" "}
                    <code>0.5rem</code>
                    padding on all four sides. Sections extend to the card's
                    edges so their separators span the full width; each
                    section's content remains inset by its own padding. The
                    card's minimum height follows its content, so sections
                    remain inside it even when a smaller height is specified.
                    <code>withBorder</code> controls the separator. Set
                    <code>separatorThickness</code> on a section to configure
                    only its own separator and labeled divider. Optional{" "}
                    <code>label</code> and <code>labelPosition</code>
                    place content on that border. Override padding with
                    <code>p</code>, <code>px</code>, or <code>py</code>. Set
                    <code>hoverable</code> for a pointer cursor and subtle
                    surface-color feedback on hover, press, and keyboard focus;
                    <code>onClick</code> is forwarded for click handling. Set
                    <code>component="a"</code> and <code>href</code> to make a
                    hoverable section a native link.
                  </td>
                </tr>
                <tr>
                  <th>separatorThickness</th>
                  <td>
                    <code>CardSeparatorThickness</code>
                  </td>
                  <td>
                    A <code>Card.Section</code> prop. Defaults to{" "}
                    <code>default</code> (1px); set to <code>thick</code> (2px)
                    to change only that section's separator and labeled divider.
                  </td>
                </tr>
                <tr>
                  <th>selected</th>
                  <td>boolean</td>
                  <td>
                    Defaults to <code>false</code>. Applies token-based selected
                    surface and border styling when true; this is a visual state
                    only and does not add interaction or ARIA semantics.
                  </td>
                </tr>
                <tr>
                  <th>hoverable</th>
                  <td>boolean</td>
                  <td>
                    Defaults to <code>false</code>. Adds token-based hover,
                    focus-visible, and pointer-cursor styling without adding
                    click behavior, roles, or keyboard handling. Choose a native
                    button or link root for interactive cards.
                  </td>
                </tr>
                <tr>
                  <th>className, style, withBorder</th>
                  <td>Mantine Card props</td>
                  <td>
                    Forwarded to the root. <code>withBorder</code> defaults to
                    <code>true</code>; consumer styling can override BBUI
                    surface and border defaults.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <pre className={pageStyles.codeBlock}>
            <code>{splitCardExample}</code>
          </pre>
        </div>
      </section>
    </section>
  );
}
