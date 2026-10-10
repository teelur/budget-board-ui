import { Card } from "../../../src";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import demoStyles from "../../components/ComponentDemoSection/ComponentDemoSection.module.css";
import pageStyles from "../Page.module.css";
import styles from "./CardPage.module.css";
import { BodyText, HeadingText } from "../../../src";

const plainCardExample = `<Card>
  <p>OCTOBER 2026</p>
  <h3>Available balance</h3>
  <strong>$8,420.50</strong>
</Card>`;

const splitCardExample = `<Card>
  <Card.Header>
    <div>
      <h3>Account balances</h3>
      <p>Updated just now</p>
    </div>
    <span>3 accounts</span>
  </Card.Header>
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
          <BodyText component="p" className={pageStyles.eyebrow}>Content</BodyText>
          <HeadingText level={2}>Card</HeadingText>
        </div>
        <code>import {"{ Card }"} from '@teelur/budget-board-ui';</code>
      </div>
      <BodyText component="p" className={pageStyles.sectionCopy}>
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
            <BodyText component="p" className={styles.eyebrow}>October 2026</BodyText>
            <HeadingText level={3} className={styles.cardTitle}>Available balance</HeadingText>
            <BodyText component="strong" fw={700} className={styles.amount}>$8,420.50</BodyText>
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
        description="Each Card.Header and Card.Section owns its padding and gets an automatic separator. Override p, px, or py per part."
        id="card-sections"
        title="Header and sections"
        code={splitCardExample}
      >
        <div className={styles.preview}>
          <Card className={styles.splitCard}>
            <Card.Header className={styles.cardHeader}>
              <div>
                <HeadingText level={3} className={styles.cardTitle}>Account balances</HeadingText>
                <BodyText component="p" className={styles.cardSubtitle}>Updated just now</BodyText>
              </div>
              <BodyText component="span" className={styles.accountCount}>3 accounts</BodyText>
            </Card.Header>
            <Card.Section>
              <div className={styles.accountRow}>
                <BodyText component="span">Everyday checking</BodyText>
                <BodyText component="strong" fw={700}>$4,218.32</BodyText>
              </div>
            </Card.Section>
            <Card.Section>
              <div className={styles.accountRow}>
                <BodyText component="span">Rainy day savings</BodyText>
                <BodyText component="strong" fw={700}>$4,202.18</BodyText>
              </div>
            </Card.Section>
          </Card>
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="hoverable adds visual hover and focus feedback. Select a native button or link root when the card is interactive."
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
            <BodyText component="span" className={styles.cardSubtitle}>Transactions</BodyText>
            <BodyText component="strong" fw={700}>Review October activity</BodyText>
          </Card>
        </div>
      </ComponentDemoSection>

      <section className={pageStyles.componentReferenceSection} id="card-api">
        <div className={demoStyles.componentDemoHeading}>
          <div>
            <HeadingText level={3}>API reference</HeadingText>
            <BodyText component="p">
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
                    border, and Mantine <code>md</code> padding. Consumer props
                    override these defaults.
                  </td>
                </tr>
                <tr>
                  <th>Card.Header</th>
                  <td>
                    <code>CardHeaderProps</code>
                  </td>
                  <td>
                    Arbitrary React content. Defaults to <code>1rem</code>
                    padding on all four sides. Its separator is on the section
                    edge, and the next part starts with its own full padding.
                    Uses
                    <code>{"inheritPadding={false}"}</code> and adds a
                    <code>border-subtle</code> separator. Override padding with
                    Mantine props such as <code>p</code>, <code>px</code>, or
                    <code>py</code>.
                  </td>
                </tr>
                <tr>
                  <th>Card.Section</th>
                  <td>
                    <code>CardSectionProps</code>
                  </td>
                  <td>
                    Repeat for body sections. Defaults to <code>1rem</code>
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
                    Defaults to <code>false</code>. Adds token-based hover and
                    focus-visible styling only; it does not add click behavior,
                    roles, or keyboard handling. Choose a native button or link
                    root for interactive cards.
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
