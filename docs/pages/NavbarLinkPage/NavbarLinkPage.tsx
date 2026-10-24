import {
  ArrowLeftRight,
  ArrowRightLeftIcon,
  Goal,
  Home,
  LineChartIcon,
  TagsIcon,
  Wallet,
} from "lucide-react";
import { NavbarLink } from "../../../src";
import { ApiPlayground } from "../../components/ApiPlayground/ApiPlayground";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import demoStyles from "../../components/ComponentDemoSection/ComponentDemoSection.module.css";
import pageStyles from "../Page.module.css";
import styles from "./NavbarLinkPage.module.css";
import { BodyText, HeadingText } from "../../../src";

const navbarLinkExample = `<NavbarLink
  icon={<ArrowLeftRight aria-hidden="true" />}
  mode="selection"
  label="Transactions"
  showLabel
  onClick={() => navigate("/transactions")}
  defaultExpanded
  items={[
    {
      id: "categories",
      label: "Categories",
      active: true,
      onClick: () => navigate("/transactions/settings/categories"),
    },
    {
      id: "rules",
      label: "Automatic rules",
      onClick: () => navigate("/transactions/settings/rules"),
    },
  ]}
/>`;

const trendsChartSelectionExample = `<Stack w={200} gap={4}>
  <NavbarLink
    active
    icon={<LineChartIcon aria-hidden="true" />}
    label="Spending"
    mode="selection"
    onClick={() => navigate("spending")}
    showLabel
  />
  <NavbarLink
    icon={<TagsIcon aria-hidden="true" />}
    label="Spending categories"
    mode="selection"
    onClick={() => navigate("spending-categories")}
    showLabel
  />
  <NavbarLink
    icon={<ArrowRightLeftIcon aria-hidden="true" />}
    label="Net cash flow"
    mode="selection"
    onClick={() => navigate("net-cash-flow")}
    showLabel
  />
</Stack>`;

export function NavbarLinkPage() {
  return (
    <section className={pageStyles.componentSection} id="navbar-link">
      <div className={pageStyles.sectionHeading}>
        <div>
          <BodyText component="p" className={pageStyles.eyebrow} tone="muted" ff="var(--bb-font-data)" fz="0.68rem">Navigation</BodyText>
          <HeadingText level={2} tone="heading" lh={1.5}>NavbarLink</HeadingText>
        </div>
        <code>import {"{ NavbarLink }"} from '@teelur/budget-board-ui';</code>
      </div>
      <BodyText component="p" className={pageStyles.sectionCopy} tone="muted" m="1em 0">
        An accessible icon-and-label action for application navigation, with
        optional collapsible child links. The default navigation mode uses
        app-shell colors; selection mode uses page-surface colors for in-page
        selectors, such as Trends chart choices.
      </BodyText>

      <ApiPlayground
        componentName="NavbarLink"
        controls={[
          { key: "showLabel", label: "Show label", type: "toggle" },
          { key: "active", label: "Active", type: "toggle" },
          { key: "disabled", label: "Disabled", type: "toggle" },
        ]}
        defaultValues={{ showLabel: true, active: true, disabled: false }}
        description="Compare expanded and collapsed selection styling, active feedback, and disabled state on a page surface."
        id="navbar-link-playground"
        staticCodeProps={[
          'icon={<ArrowLeftRight aria-hidden="true" />}',
          'mode="selection"',
          'label="Transactions"',
          "onClick={() => {}}",
        ]}
        render={(values) => (
          <div className={styles.expanded}>
            <NavbarLink
              active={values.active as boolean}
              disabled={values.disabled as boolean}
              icon={<ArrowLeftRight aria-hidden="true" />}
              label="Transactions"
              mode="selection"
              onClick={() => {}}
              showLabel={values.showLabel as boolean}
            />
          </div>
        )}
      />

      <ComponentDemoSection
        description="These examples use selection mode for links on a page surface. Expanded links can contain a collapsible child list, while collapsed links keep an accessible name and reveal the parent label in a tooltip."
        id="navbar-link-states"
        title="States"
        code={navbarLinkExample}
      >
        <div className={styles.examples}>
          <div className={styles.example}>
            <BodyText component="span" className={styles.caption} tone="secondary" ff="var(--bb-font-data)" fz="0.64rem" m="0 0 0.6rem">Expanded</BodyText>
            <div className={styles.expanded}>
              <NavbarLink
                icon={<Home aria-hidden="true" />}
                label="Overview"
                mode="selection"
                showLabel
              />
              <NavbarLink
                active
                icon={<ArrowLeftRight aria-hidden="true" />}
                label="Transactions"
                mode="selection"
                showLabel
              />
              <NavbarLink
                icon={<Goal aria-hidden="true" />}
                label="Goals"
                mode="selection"
                showLabel
              />
              <NavbarLink
                defaultExpanded
                icon={<Wallet aria-hidden="true" />}
                items={[
                  {
                    id: "account-types",
                    label: "Account types",
                    active: true,
                    onClick: () => {},
                  },
                  {
                    id: "deleted-accounts",
                    label: "Deleted accounts",
                    onClick: () => {},
                  },
                ]}
                label="Accounts"
                mode="selection"
                onClick={() => {}}
                showLabel
              />
              <NavbarLink
                disabled
                icon={<Home aria-hidden="true" />}
                label="Disabled"
                mode="selection"
                showLabel
              />
            </div>
          </div>
          <div className={styles.example}>
            <BodyText component="span" className={styles.caption} tone="secondary" ff="var(--bb-font-data)" fz="0.64rem" m="0 0 0.6rem">Collapsed</BodyText>
            <div className={styles.collapsed}>
              <NavbarLink
                icon={<Home aria-hidden="true" />}
                label="Overview"
                mode="selection"
              />
              <NavbarLink
                active
                icon={<ArrowLeftRight aria-hidden="true" />}
                label="Transactions"
                mode="selection"
              />
              <NavbarLink
                icon={<Wallet aria-hidden="true" />}
                label="Accounts"
                mode="selection"
              />
            </div>
          </div>
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="This mirrors the Trends page chart selector: one chart view is active, and the consuming app handles navigation. Selection mode uses page-surface colors instead of AppShell navigation colors."
        id="navbar-link-trends-selection"
        title="Trends chart selection"
        code={trendsChartSelectionExample}
      >
        <div className={styles.trendSelector}>
          <NavbarLink
            active
            icon={<LineChartIcon aria-hidden="true" />}
            label="Spending"
            mode="selection"
            onClick={() => {}}
            showLabel
          />
          <NavbarLink
            icon={<TagsIcon aria-hidden="true" />}
            label="Spending categories"
            mode="selection"
            onClick={() => {}}
            showLabel
          />
          <NavbarLink
            icon={<ArrowRightLeftIcon aria-hidden="true" />}
            label="Net cash flow"
            mode="selection"
            onClick={() => {}}
            showLabel
          />
        </div>
      </ComponentDemoSection>

      <section
        className={pageStyles.componentReferenceSection}
        id="navbar-link-api"
      >
        <div className={demoStyles.componentDemoHeading}>
          <div>
            <HeadingText level={3} tone="heading" lh={1.5}>API reference</HeadingText>
            <BodyText component="p" tone="secondary" fz="0.82rem" lh={1.55} m="0.45rem 0 0">Component props, defaults, and forwarded button attributes.</BodyText>
          </div>
          <a
            aria-label="Link to NavbarLink API reference"
            className={demoStyles.componentDemoAnchor}
            href="#navbar-link-api"
          >
            #
          </a>
        </div>
        <div className={pageStyles.referenceGrid}>
          <div>
            <table>
              <tbody>
                <tr>
                  <th>mode</th>
                  <td>
                    <code>"navigation" | "selection"</code>
                  </td>
                  <td>
                    navigation; use selection for page-surface selectors such
                    as chart choices.
                  </td>
                </tr>
                <tr>
                  <th>icon</th>
                  <td>
                    <code>ReactNode</code>
                  </td>
                  <td>
                    Required; callers should mark decorative icons aria-hidden.
                  </td>
                </tr>
                <tr>
                  <th>label</th>
                  <td>
                    <code>string</code>
                  </td>
                  <td>
                    Required; used as visible text or the collapsed tooltip and
                    accessible name.
                  </td>
                </tr>
                <tr>
                  <th>active</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>false; applies the semantic selection surface.</td>
                </tr>
                <tr>
                  <th>showLabel</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>
                    false; shows the text and disables the tooltip when true.
                  </td>
                </tr>
                <tr>
                  <th>labelSize</th>
                  <td>
                    <code>"sm" | "xs"</code>
                  </td>
                  <td>sm; Mantine Text size used for the expanded label.</td>
                </tr>
                <tr>
                  <th>compact</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>
                    false; reduces the minimum height and horizontal padding.
                  </td>
                </tr>
                <tr>
                  <th>items</th>
                  <td>
                    <code>array</code>
                  </td>
                  <td>
                    Optional readonly array of <code>NavbarLinkItem</code>{" "}
                    values. Each item requires an <code>id</code>, a visible{" "}
                    <code>label</code>, and an <code>onClick</code> callback.{" "}
                    <code>active</code> and <code>disabled</code> are optional.
                    Items render only when <code>showLabel</code> is true.
                  </td>
                </tr>
                <tr>
                  <th>expanded</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>
                    Optional controlled expansion state. When omitted, the
                    component manages expansion internally.
                  </td>
                </tr>
                <tr>
                  <th>defaultExpanded</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>
                    false; initial expansion state when <code>expanded</code> is
                    uncontrolled.
                  </td>
                </tr>
                <tr>
                  <th>onExpandedChange</th>
                  <td>
                    <code>(expanded: boolean) =&gt; void</code>
                  </td>
                  <td>Called when the disclosure control is toggled.</td>
                </tr>
                <tr>
                  <th>expandLabel / collapseLabel</th>
                  <td>
                    <code>string</code>
                  </td>
                  <td>
                    Optional localized accessible names for the disclosure
                    control. Defaults to “Expand” or “Collapse” followed by the
                    parent label.
                  </td>
                </tr>
                <tr>
                  <th>
                    onClick, disabled, type, className, style, aria/data
                    attributes
                  </th>
                  <td>
                    <code>ButtonHTMLAttributes&lt;HTMLButtonElement&gt;</code>
                  </td>
                  <td>
                    Forwarded to the button; <code>type</code> defaults to
                    button. Consumer styles override BBUI token defaults.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <pre className={pageStyles.codeBlock}>
            <code>{navbarLinkExample}</code>
          </pre>
        </div>
      </section>
    </section>
  );
}
