import { Card } from "../../../src";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import demoStyles from "../../components/ComponentDemoSection/ComponentDemoSection.module.css";
import pageStyles from "../Page.module.css";
import styles from "./CardPage.module.css";
import { BodyText, DataText, HeadingText } from "../../../src";

const plainCardExample = `<Card>
  <p>OCTOBER 2026</p>
  <h3>Available balance</h3>
  <strong>$8,420.50</strong>
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

const labeledSectionExample = `<Card>
  <Card.Section label="or">Sign in with email</Card.Section>
  <Card.Section>Continue with identity provider</Card.Section>
</Card>`;

const hoverableCardExample = `<Card component="a" href="#card-api" hoverable>
  <span>Transactions</span>
  <strong>Review October activity</strong>
</Card>`;

export function CardPage() {
  return (
    <section className={pageStyles.componentSection} id="card">
      <div className={pageStyles.sectionHeading}>
        <div>
          <BodyText component="p" className={pageStyles.eyebrow} tone="muted" ff="var(--bb-font-data)" fz="0.68rem">Content</BodyText>
          <HeadingText level={2} tone="heading" lh={1.5}>Card</HeadingText>
        </div>
        <code>import {"{ Card }"} from '@teelur/budget-board-ui';</code>
      </div>
      <BodyText component="p" className={pageStyles.sectionCopy} tone="muted" m="1em 0">
        A token-based surface for standalone content and divided header and body
        sections. Header and body separators share the same subtle border.
        Mantine Card props and polymorphic roots are preserved.
      </BodyText>

      <ComponentDemoSection
        description="Use Card directly for a conventional padded surface."
        id="card-basic"
        title="Standard card"
        code={plainCardExample}
      >
        <div className={styles.preview}>
          <Card className={styles.plainCard}>
            <BodyText component="p" className={styles.eyebrow} tone="muted" ff="var(--bb-font-data)" fz="0.72rem" m="0 0 0.55rem">October 2026</BodyText>
            <HeadingText level={3} className={styles.cardTitle} tone="heading" fz="1.05rem" fw={600} m={0} lh={1.5}>Available balance</HeadingText>
            <DataText
              component="strong"
              className={styles.amount}
              fz="1.5rem"
              fw={700}
              lh={1.5}
              tone="heading" m="0.65rem 0 0"
            >
              $8,420.50
            </DataText>
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
              <BodyText component="strong" fw={700}>Sign in with email</BodyText>
            </Card.Section>
            <Card.Section>
              <BodyText component="strong" fw={700}>Continue with identity provider</BodyText>
            </Card.Section>
          </Card>
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Each Card.Section owns its padding and gets an automatic separator. Override p, px, or py per section."
        id="card-sections"
        title="Card sections"
        code={splitCardExample}
      >
        <div className={styles.preview}>
          <Card className={styles.splitCard}>
            <Card.Section className={styles.cardHeader}>
              <div>
                <HeadingText level={3} className={styles.cardTitle} tone="heading" fz="1.05rem" fw={600} m={0} lh={1.5}>Account balances</HeadingText>
                <BodyText component="p" className={styles.cardSubtitle} tone="muted" ff="var(--bb-font-data)" fz="0.72rem" m="0.3rem 0 0">Updated just now</BodyText>
              </div>
              <BodyText component="span" className={styles.accountCount} tone="muted" ff="var(--bb-font-data)" fz="0.72rem">3 accounts</BodyText>
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
            <BodyText component="span" className={styles.cardSubtitle} tone="muted" ff="var(--bb-font-data)" fz="0.72rem" m="0.3rem 0 0">Transactions</BodyText>
            <BodyText component="strong" fw={600}>Review October activity</BodyText>
          </Card>
        </div>
      </ComponentDemoSection>

      <section className={pageStyles.componentReferenceSection} id="card-api">
        <div className={demoStyles.componentDemoHeading}>
          <div>
            <HeadingText level={3} tone="heading" lh={1.5}>API reference</HeadingText>
            <BodyText component="p" tone="secondary" fz="0.82rem" lh={1.55} m="0.45rem 0 0">
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
                    override these defaults.
                  </td>
                </tr>
                <tr>
                  <th>Card.Section</th>
                  <td>
                    <code>CardSectionProps</code>
                  </td>
                  <td>
                    Use for each card content section. Defaults to <code>0.5rem</code>
                    padding on all four sides; adjacent sections do not share or
                    collapse padding. <code>withBorder</code> controls the
                    separator and optional <code>label</code> and
                    <code>labelPosition</code> place content on that border.
                    Override padding with <code>p</code>, <code>px</code>, or
                    <code>py</code>.
                  </td>
                </tr>
                <tr>
                  <th>hoverable</th>
                  <td>boolean</td>
                  <td>
                    Defaults to <code>false</code>. Adds token-based hover,
                    focus-visible, and pointer-cursor styling without adding
                    click behavior, roles, or keyboard handling. Choose a
                    native button or link root for interactive cards.
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
