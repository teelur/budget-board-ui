import { ArrowLeftRight, Home, Wallet } from "lucide-react";
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar,
  AppShellSection,
  NavbarLink,
} from "../../../src";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import demoStyles from "../../components/ComponentDemoSection/ComponentDemoSection.module.css";
import pageStyles from "../Page.module.css";
import styles from "./AppShellPage.module.css";
import { BodyText, HeadingText } from "../../../src";

const shellExample = `<AppShell
  header={{ height: 52 }}
  h={300}
  mode="static"
  navbar={{ width: 184, breakpoint: "sm", collapsed: { mobile: true } }}
  withBorder
>
  <AppShellHeader>Budget Board</AppShellHeader>
  <AppShellNavbar>
    <AppShellSection grow>
      <NavbarLink icon={<Home />} label="Overview" showLabel />
      <NavbarLink icon={<ArrowLeftRight />} label="Transactions" showLabel />
      <NavbarLink icon={<Wallet />} label="Accounts" showLabel />
    </AppShellSection>
  </AppShellNavbar>
  <AppShellMain p="md">Page content</AppShellMain>
</AppShell>`;

export function AppShellPage() {
  return (
    <section className={pageStyles.componentSection} id="app-shell">
      <div className={pageStyles.sectionHeading}>
        <div>
          <BodyText component="p" className={pageStyles.eyebrow}>Layout</BodyText>
          <HeadingText level={2}>AppShell</HeadingText>
        </div>
        <code>import {"{ AppShell }"} from '@teelur/budget-board-ui';</code>
      </div>
      <BodyText component="p" className={pageStyles.sectionCopy}>
        Mantine AppShell primitives with Budget Board semantic surfaces. Layout,
        responsive breakpoints, and collapsed state remain controlled by the
        consuming application.
      </BodyText>

      <ComponentDemoSection
        description="Compose the shell from Mantine-compatible primitives. The navigation collapses below the configured breakpoint."
        id="app-shell-composition"
        title="Responsive composition"
        code={shellExample}
      >
        <div className={styles.preview}>
          <AppShell
            aria-label="AppShell example"
            h={300}
            header={{ height: 52 }}
            mode="static"
            navbar={{
              breakpoint: "sm",
              collapsed: { mobile: true },
              width: 184,
            }}
            withBorder
          >
            <AppShellHeader>
              <div className={styles.header}>
                <BodyText component="strong" fw={700}>Budget Board</BodyText>
                <BodyText component="span">October 2026</BodyText>
              </div>
            </AppShellHeader>
            <AppShellNavbar>
              <AppShellSection className={styles.navigation} grow>
                <NavbarLink
                  active
                  icon={<Home aria-hidden="true" />}
                  label="Overview"
                  showLabel
                />
                <NavbarLink
                  icon={<ArrowLeftRight aria-hidden="true" />}
                  label="Transactions"
                  showLabel
                />
                <NavbarLink
                  icon={<Wallet aria-hidden="true" />}
                  label="Accounts"
                  showLabel
                />
              </AppShellSection>
            </AppShellNavbar>
            <AppShellMain className={styles.main} p="md">
              <BodyText component="span" className={styles.eyebrow}>Overview</BodyText>
              <BodyText component="strong" fw={700}>Monthly budget</BodyText>
              <BodyText component="span">Income and spending at a glance.</BodyText>
            </AppShellMain>
          </AppShell>
        </div>
      </ComponentDemoSection>

      <section
        className={pageStyles.componentReferenceSection}
        id="app-shell-api"
      >
        <div className={demoStyles.componentDemoHeading}>
          <div>
            <HeadingText level={3}>API reference</HeadingText>
            <BodyText component="p">
              Mantine props and styles APIs are forwarded; BBUI adds semantic
              surface defaults.
            </BodyText>
          </div>
          <a
            aria-label="Link to AppShell API reference"
            className={demoStyles.componentDemoAnchor}
            href="#app-shell-api"
          >
            #
          </a>
        </div>
        <div className={pageStyles.referenceGrid}>
          <div>
            <table>
              <tbody>
                <tr>
                  <th>AppShell</th>
                  <td>
                    <code>AppShellProps</code>
                  </td>
                  <td>
                    All Mantine 9 AppShell props and root attributes; Mantine
                    defaults. Uses the <code>page</code> background and
                    <code>text-primary</code> foreground tokens.
                  </td>
                </tr>
                <tr>
                  <th>AppShellHeader</th>
                  <td>
                    <code>AppShellHeaderProps</code>
                  </td>
                  <td>
                    Mantine defaults. Uses the <code>surface-sunken</code> and
                    <code>border-subtle</code> tokens.
                  </td>
                </tr>
                <tr>
                  <th>AppShellAside / Footer</th>
                  <td>
                    <code>AppShellAsideProps</code>,{" "}
                    <code>AppShellFooterProps</code>
                  </td>
                  <td>
                    Mantine defaults. Use the <code>surface</code> and
                    <code>border-subtle</code> tokens.
                  </td>
                </tr>
                <tr>
                  <th>AppShellNavbar</th>
                  <td>
                    <code>AppShellNavbarProps</code>
                  </td>
                  <td>
                    Mantine defaults. Uses the <code>navigation</code> and
                    <code>border-subtle</code> tokens.
                  </td>
                </tr>
                <tr>
                  <th>AppShellMain</th>
                  <td>
                    <code>AppShellMainProps</code>
                  </td>
                  <td>
                    Mantine defaults. Uses the <code>page</code> and
                    <code>text-primary</code> tokens.
                  </td>
                </tr>
                <tr>
                  <th>AppShellSection</th>
                  <td>
                    <code>AppShellSectionProps</code>
                  </td>
                  <td>
                    Mantine defaults; <code>grow</code> defaults to false.
                    Inherits foreground from the shell.
                  </td>
                </tr>
                <tr>
                  <th>
                    className, style, styles, classNames, other attributes
                  </th>
                  <td>Mantine AppShell prop types</td>
                  <td>
                    Forwarded to their corresponding Mantine primitive; consumer
                    styles override BBUI defaults.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <pre className={pageStyles.codeBlock}>
            <code>{shellExample}</code>
          </pre>
        </div>
      </section>
    </section>
  );
}
