import { useState } from "react";
import { Check, ChevronRight, Download, Pencil, Settings } from "lucide-react";
import {
  BodyText,
  Button,
  HeadingText,
  Menu,
} from "../../../src";
import type { MenuProps } from "../../../src";
import { ApiPlayground } from "../../components/ApiPlayground/ApiPlayground";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import demoStyles from "../../components/ComponentDemoSection/ComponentDemoSection.module.css";
import pageStyles from "../Page.module.css";
import styles from "./MenuPage.module.css";

type MenuPosition = Extract<
  NonNullable<MenuProps["position"]>,
  "bottom-start" | "top-start" | "right-start" | "left-start"
>;

const positions = [
  "bottom-start",
  "top-start",
  "right-start",
  "left-start",
] as const;

const basicMenuExample = `<Menu width={220}>
  <Menu.Target>
    <Button variant="outline">Account actions</Button>
  </Menu.Target>
  <Menu.Dropdown>
    <Menu.Label>Account</Menu.Label>
    <Menu.Item leftSection={<Pencil size={16} />}>Edit</Menu.Item>
    <Menu.Item leftSection={<Download size={16} />}>Export</Menu.Item>
    <Menu.Divider />
    <Menu.Item disabled>Archive</Menu.Item>
  </Menu.Dropdown>
</Menu>`;

export function MenuPage() {
  const [lastAction, setLastAction] = useState("None");
  const [visibleColumns, setVisibleColumns] = useState(["merchant", "amount"]);
  const [sortOrder, setSortOrder] = useState("date");

  return (
    <section className={pageStyles.componentSection} id="menu">
      <div className={pageStyles.sectionHeading}>
        <div>
          <BodyText
            className={pageStyles.eyebrow}
            component="p"
            ff="var(--bb-font-data)"
            fz="0.68rem"
            tone="muted"
          >
            Overlays
          </BodyText>
          <HeadingText level={2} lh={1.5} tone="heading">
            Menu
          </HeadingText>
        </div>
        <code>import {"{ Menu }"} from '@teelur/budget-board-ui';</code>
      </div>
      <BodyText
        className={pageStyles.sectionCopy}
        component="p"
        m="1em 0"
        tone="muted"
      >
        A theme-aware compound menu built on Mantine Menu. It preserves
        Mantine&apos;s keyboard, focus, selection, and submenu behavior while
        applying BBUI surfaces, semantic text and border colors, hover states,
        and typography.
      </BodyText>

      <ComponentDemoSection
        description="Compose a target, label, actions, and dividers. Menu items close the menu after activation by default."
        id="menu-basic"
        title="Action menu"
        code={basicMenuExample}
      >
        <div className={styles.preview}>
          <Menu width={220} withinPortal={false}>
            <Menu.Target>
              <Button variant="outline">Account actions</Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Account</Menu.Label>
              <Menu.Item
                leftSection={<Pencil size={16} />}
                onClick={() => setLastAction("Edit")}
              >
                Edit
              </Menu.Item>
              <Menu.Item
                leftSection={<Download size={16} />}
                onClick={() => setLastAction("Export")}
              >
                Export
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item disabled leftSection={<Settings size={16} />}>
                Archive
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <BodyText component="span" tone="secondary">
            Last action: {lastAction}
          </BodyText>
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Checkbox and radio groups keep their Mantine selection behavior and use check indicators without a separate selected-row highlight."
        id="menu-selectable"
        title="Selectable items"
        code={`<Menu>
  <Menu.Target><Button variant="outline">View settings</Button></Menu.Target>
  <Menu.Dropdown>
    <Menu.Label>Visible columns</Menu.Label>
    <Menu.CheckboxGroup value={visibleColumns} onChange={setVisibleColumns}>
      <Menu.CheckboxItem value="merchant">Merchant</Menu.CheckboxItem>
      <Menu.CheckboxItem value="amount">Amount</Menu.CheckboxItem>
    </Menu.CheckboxGroup>
    <Menu.Divider />
    <Menu.RadioGroup value={sortOrder} onChange={setSortOrder}>
      <Menu.RadioItem value="date">Date</Menu.RadioItem>
      <Menu.RadioItem value="amount">Amount</Menu.RadioItem>
    </Menu.RadioGroup>
  </Menu.Dropdown>
</Menu>`}
      >
        <div className={styles.preview}>
          <Menu width={230} withinPortal={false}>
            <Menu.Target>
              <Button variant="outline">View settings</Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Visible columns</Menu.Label>
              <Menu.CheckboxGroup
                onChange={setVisibleColumns}
                value={visibleColumns}
              >
                <Menu.CheckboxItem value="merchant">
                  Merchant
                </Menu.CheckboxItem>
                <Menu.CheckboxItem value="amount">Amount</Menu.CheckboxItem>
              </Menu.CheckboxGroup>
              <Menu.Divider />
              <Menu.RadioGroup onChange={setSortOrder} value={sortOrder}>
                <Menu.RadioItem value="date">Date</Menu.RadioItem>
                <Menu.RadioItem value="amount">Amount</Menu.RadioItem>
              </Menu.RadioGroup>
            </Menu.Dropdown>
          </Menu>
          <div className={styles.selectionSummary}>
            <BodyText component="span" tone="secondary">
              Columns: {visibleColumns.join(", ")}
            </BodyText>
            <BodyText component="span" tone="secondary">
              Sort: {sortOrder}
            </BodyText>
          </div>
        </div>
      </ComponentDemoSection>

      <ApiPlayground
        componentName="Menu"
        controls={[
          {
            key: "position",
            label: "Position",
            type: "select",
            options: positions,
          },
          { key: "withArrow", label: "Show arrow", type: "toggle" },
        ]}
        defaultValues={{ position: "bottom-start", withArrow: true }}
        description="Change the placement and arrow while previewing the themed dropdown, labels, icons, and hover states."
        id="menu-playground"
        staticCodeProps={[
          "opened",
          "width={220}",
          "withinPortal={false}",
        ]}
        childrenCode={`<Menu.Target>
    <Button variant="outline">Preview menu</Button>
  </Menu.Target>
  <Menu.Dropdown>
    <Menu.Label>Actions</Menu.Label>
    <Menu.Item leftSection={<Check size={16} />}>Confirm</Menu.Item>
    <Menu.Item rightSection={<ChevronRight size={16} />}>More options</Menu.Item>
  </Menu.Dropdown>`}
        previewStyle={(values) => ({
          alignItems: "flex-start",
          minHeight: "13rem",
          paddingTop: values.position === "top-start" ? "8rem" : "1.25rem",
        })}
        render={(values) => (
          <Menu
            opened
            position={values.position as MenuPosition}
            width={220}
            withArrow={values.withArrow as boolean}
            withinPortal={false}
          >
            <Menu.Target>
              <Button variant="outline">Preview menu</Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Actions</Menu.Label>
              <Menu.Item leftSection={<Check size={16} />}>Confirm</Menu.Item>
              <Menu.Item rightSection={<ChevronRight size={16} />}>
                More options
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        )}
      />

      <section className={pageStyles.componentReferenceSection} id="menu-api">
        <div className={demoStyles.componentDemoHeading}>
          <div>
            <HeadingText level={3} lh={1.5} tone="heading">
              API reference
            </HeadingText>
            <BodyText
              component="p"
              fz="0.82rem"
              lh={1.55}
              m="0.45rem 0 0"
              tone="secondary"
            >
              Menu forwards the Mantine Menu API and preserves every compound
              component as a static member.
            </BodyText>
          </div>
          <a
            aria-label="Link to Menu API reference"
            className={demoStyles.componentDemoAnchor}
            href="#menu-api"
          >
            #
          </a>
        </div>
        <div className={pageStyles.referenceGrid}>
          <div>
            <table>
              <tbody>
                <tr>
                  <th>MenuProps</th>
                  <td>Mantine Menu props</td>
                  <td>
                    Open state, positioning, portal, arrow, focus, loop, and
                    click-to-close behavior are forwarded without changing
                    Mantine defaults.
                  </td>
                </tr>
                <tr>
                  <th>Menu.Target / Menu.Dropdown</th>
                  <td>compound components</td>
                  <td>
                    Wrap the trigger and floating menu content. The target must
                    accept a ref, as required by Mantine.
                  </td>
                </tr>
                <tr>
                  <th>Menu.Item / Menu.Label / Menu.Divider</th>
                  <td>compound components</td>
                  <td>
                    Build action groups with optional left and right sections,
                    semantic labels, and separators.
                  </td>
                </tr>
                <tr>
                  <th>Selectable items</th>
                  <td>checkbox and radio components</td>
                  <td>
                    <code>Menu.CheckboxItem</code>,{" "}
                    <code>Menu.CheckboxGroup</code>, <code>Menu.RadioItem</code>,
                    and <code>Menu.RadioGroup</code> use Mantine state handling.
                  </td>
                </tr>
                <tr>
                  <th>Menu.Search / Menu.Sub</th>
                  <td>compound components</td>
                  <td>
                    Add searchable items or nested menus, including submenu
                    target, item, and dropdown parts.
                  </td>
                </tr>
                <tr>
                  <th>Menu.ContextMenu</th>
                  <td>compound component</td>
                  <td>
                    The Mantine context-menu trigger is forwarded unchanged.
                  </td>
                </tr>
                <tr>
                  <th>background / hover / focus / indicators</th>
                  <td>BBUI semantic styles</td>
                  <td>
                    Menus use elevated surfaces, subtle borders, primary and
                    secondary text, neutral hover, and BBUI focus rings in light
                    and dark modes. Checked items use Mantine check indicators
                    without a separate row highlight.
                  </td>
                </tr>
                <tr>
                  <th>classNames / styles</th>
                  <td>Mantine styles API</td>
                  <td>
                    Consumer classes and styles are merged with BBUI defaults;
                    consumer values take precedence.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </section>
  );
}
