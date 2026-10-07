import { ArrowLeftRight, Home, Wallet } from "lucide-react";
import { NavbarLink } from "../../../src";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import demoStyles from "../../components/ComponentDemoSection/ComponentDemoSection.module.css";
import pageStyles from "../Page.module.css";
import styles from "./NavbarLinkPage.module.css";

const navbarLinkExample = `<NavbarLink
  active
  icon={<ArrowLeftRight aria-hidden="true" />}
  label="Transactions"
  showLabel
/>`;

export function NavbarLinkPage() {
  return (
    <section className={pageStyles.componentSection} id="navbar-link">
      <div className={pageStyles.sectionHeading}>
        <div>
          <p className={pageStyles.eyebrow}>Navigation</p>
          <h2>NavbarLink</h2>
        </div>
        <code>import {"{ NavbarLink }"} from '@teelur/budget-board-ui';</code>
      </div>
      <p className={pageStyles.sectionCopy}>
        An accessible icon-and-label action for application navigation. The
        consuming application controls routing, selection, and whether labels
        are visible.
      </p>

      <ComponentDemoSection
        description="Expanded links show their text labels. Collapsed links keep an accessible name and reveal the label in a tooltip. Hover uses a neutral surface; active items keep the primary-tinted selection surface."
        id="navbar-link-states"
        title="States"
        code={navbarLinkExample}
      >
        <div className={styles.examples}>
          <div className={styles.example}>
            <span className={styles.caption}>Expanded</span>
            <div className={styles.expanded}>
              <NavbarLink
                icon={<Home aria-hidden="true" />}
                label="Overview"
                showLabel
              />
              <NavbarLink
                active
                icon={<ArrowLeftRight aria-hidden="true" />}
                label="Transactions"
                showLabel
              />
              <NavbarLink
                compact
                icon={<Wallet aria-hidden="true" />}
                label="Accounts"
                showLabel
              />
              <NavbarLink
                disabled
                icon={<Home aria-hidden="true" />}
                label="Disabled"
                showLabel
              />
            </div>
          </div>
          <div className={styles.example}>
            <span className={styles.caption}>Collapsed</span>
            <div className={styles.collapsed}>
              <NavbarLink icon={<Home aria-hidden="true" />} label="Overview" />
              <NavbarLink
                active
                icon={<ArrowLeftRight aria-hidden="true" />}
                label="Transactions"
              />
              <NavbarLink
                icon={<Wallet aria-hidden="true" />}
                label="Accounts"
              />
            </div>
          </div>
        </div>
      </ComponentDemoSection>

      <section
        className={pageStyles.componentReferenceSection}
        id="navbar-link-api"
      >
        <div className={demoStyles.componentDemoHeading}>
          <div>
            <h3>API reference</h3>
            <p>Component props, defaults, and forwarded button attributes.</p>
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
                  <th>icon</th>
                  <td>
                    <code>ReactNode</code>
                  </td>
                    <td>Required; callers should mark decorative icons aria-hidden.</td>
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
