import {
  Button,
  Card,
  SegmentedControl,
  budgetBoardTypography,
} from "../../../src";
import pageStyles from "../Page.module.css";
import styles from "./TypographyPage.module.css";
import { BodyText, CaptionText, DataText, HeadingText } from "../../../src";

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
          <BodyText component="p" className={pageStyles.eyebrow} tone="muted" ff="var(--bb-font-data)" fz="0.68rem">Type foundations</BodyText>
          <HeadingText level={2} tone="heading" lh={1.5}>Typography</HeadingText>
        </div>
        <code>3 roles · 2 families</code>
      </div>
      <BodyText component="p" className={pageStyles.sectionCopy} tone="muted" m="1em 0">
        A small type system keeps the interface warm and readable while giving
        financial values a precise, aligned rhythm. See the{" "}
        <a href="#text-components">text components and API</a> for reusable
        hierarchy roles.
      </BodyText>

      <div className={styles.typographyGrid}>
        {typographyRoles.map((role) => (
          <Card
            className={styles.typographyCard}
            display="grid"
            key={role.token}
            p="lg"
          >
            <BodyText component="span" className={`${pageStyles.demoLabel} ${styles.demoLabel}`} tone="muted" ff="var(--bb-font-data)" fz="0.68rem" m="0 0 0.5rem">
              {role.name}
            </BodyText>
            <BodyText component="strong"
              className={
                styles[`typography${role.name}` as keyof typeof styles]
              } fw={700} tone="heading" ff={role.name === "Display" ? "var(--bb-font-display)" : role.name === "Data" ? "var(--bb-font-data)" : "var(--bb-font-body)"} fz="1.6rem" lh={1.1}
            >
              {role.name === "Data" ? "$12,480.00" : "Budget Board"}
            </BodyText>
            <code>{role.token}</code>
            <BodyText component="p" tone="muted" fz="0.8rem" m={0}>{role.family}</BodyText>
            <CaptionText component="small" tone="muted" ff="var(--bb-font-data)" fz="0.68rem">{role.description}</CaptionText>
          </Card>
        ))}
      </div>

      <Card className={styles.typographyTransaction} display="flex" p="lg">
        <div>
          <BodyText component="strong" fw={700}>Neighborhood Market and Household Supplies</BodyText>
          <DataText component="span" tone="muted" fz="0.8rem" lh={1.5}>
            Sep 19, 2026 · Groceries
          </DataText>
        </div>
        <DataText
          component="strong"
          className={`${styles.typographyData} ${styles.typographyAmount}`}
          fw={700}
          lh={1.5}
          tone="heading"
        >
          -$1,284.50
        </DataText>
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
        <BodyText component="p" tone="muted" fz="0.8rem" m={0}>
          Interactive control labels (buttons, segmented control items, and
          similar) render at <code>font-weight: 600</code> within the Body role,
          so they read as firmer and more tappable than surrounding copy.
        </BodyText>
      </Card>
    </section>
  );
}
