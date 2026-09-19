import { budgetBoardTypography } from "../../src";

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
    <section className="component-section" id="typography">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Type foundations</p>
          <h2>Typography</h2>
        </div>
        <code>3 roles · 2 families</code>
      </div>
      <p className="section-copy">
        A small type system keeps the interface warm and readable while giving
        financial values a precise, aligned rhythm.
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
  );
}
