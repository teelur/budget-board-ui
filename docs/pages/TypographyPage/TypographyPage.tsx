import {
  Button,
  Card,
  SegmentedControl,
  budgetBoardTypography,
} from "../../../src";
import pageStyles from "../Page.module.css";
import styles from "./TypographyPage.module.css";

const typographyRoles = [
  {
    name: "Display",
    token: "--bb-font-display",
    family: budgetBoardTypography.display,
    description: "Brand moments and major page or section headings.",
    className: "typography-display",
  },
  {
    name: "Body",
    token: "--bb-font-body",
    family: budgetBoardTypography.body,
    description: "Navigation, controls, labels, and supporting copy.",
    className: "typography-body",
  },
  {
    name: "Data",
    token: "--bb-font-data",
    family: `${budgetBoardTypography.data} · tabular numerals`,
    description: "Balances, amounts, dates, and compact financial metadata.",
    className: "typography-data",
  },
] as const;

export function TypographyPage() {
  return (
    <section className={pageStyles.componentSection} id="typography">
      <div className={pageStyles.sectionHeading}>
        <div>
          <p className={pageStyles.eyebrow}>Type foundations</p>
          <h2>Typography</h2>
        </div>
        <code>3 roles · 2 families</code>
      </div>
      <p className={pageStyles.sectionCopy}>
        A small type system keeps the interface warm and readable while giving
        financial values a precise, aligned rhythm. See the{" "}
        <a href="#text-components">text components and API</a> for reusable
        hierarchy roles.
      </p>

      <div className={styles.typographyGrid}>
        {typographyRoles.map((role) => (
          <Card
            className={styles.typographyCard}
            display="grid"
            key={role.token}
            p="lg"
          >
            <span className={`${pageStyles.demoLabel} ${styles.demoLabel}`}>
              {role.name}
            </span>
            <strong
              className={
                styles[`typography${role.name}` as keyof typeof styles]
              }
            >
              {role.name === "Data" ? "$12,480.00" : "Budget Board"}
            </strong>
            <code>{role.token}</code>
            <p>{role.family}</p>
            <small>{role.description}</small>
          </Card>
        ))}
      </div>

      <Card className={styles.typographyTransaction} display="flex" p="lg">
        <div>
          <strong>Neighborhood Market and Household Supplies</strong>
          <span>Sep 19, 2026 · Groceries</span>
        </div>
        <strong
          className={`${styles.typographyData} ${styles.typographyAmount}`}
        >
          -$1,284.50
        </strong>
      </Card>

      <Card className={styles.typographyControls} display="grid" p="lg">
        <div>
          <Button size="compact-md">Save changes</Button>
          <SegmentedControl
            data={[
              { value: "day", label: "Day" },
              { value: "week", label: "Week" },
            ]}
            defaultValue="week"
            size="compact-md"
            aria-label="Period"
          />
        </div>
        <p>
          Interactive control labels (buttons, segmented control items, and
          similar) render at <code>font-weight: 600</code> within the Body role,
          so they read as firmer and more tappable than surrounding copy.
        </p>
      </Card>
    </section>
  );
}
