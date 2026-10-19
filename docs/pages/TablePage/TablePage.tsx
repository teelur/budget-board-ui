import { ApiPlayground } from "../../components/ApiPlayground/ApiPlayground";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import { BodyText, HeadingText, Table } from "../../../src";
import pageStyles from "../Page.module.css";
import styles from "./TablePage.module.css";

const budgetRows = [
  { category: "Housing", budget: "$1,250", actual: "$1,200" },
  { category: "Groceries", budget: "$500", actual: "$462" },
  { category: "Transportation", budget: "$250", actual: "$284" },
];

interface BudgetTableProps {
  striped: false | "odd" | "even";
  highlightOnHover: boolean;
  withTableBorder: boolean;
  withColumnBorders: boolean;
}

function BudgetTable({
  striped,
  highlightOnHover,
  withTableBorder,
  withColumnBorders,
}: BudgetTableProps) {
  return (
    <div className={styles.tableSurface}>
      <Table.ScrollContainer minWidth="32rem" type="native">
        <Table
          aria-label="Monthly category budget"
          highlightOnHover={highlightOnHover}
          striped={striped}
          withColumnBorders={withColumnBorders}
          withTableBorder={withTableBorder}
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th scope="col">Category</Table.Th>
              <Table.Th scope="col">Budget</Table.Th>
              <Table.Th scope="col">Actual</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {budgetRows.map((row) => (
              <Table.Tr key={row.category}>
                <Table.Td>{row.category}</Table.Td>
                <Table.Td>{row.budget}</Table.Td>
                <Table.Td>{row.actual}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
          <Table.Tfoot>
            <Table.Tr>
              <Table.Th scope="row">Total</Table.Th>
              <Table.Th scope="row">$2,000</Table.Th>
              <Table.Th scope="row">$1,946</Table.Th>
            </Table.Tr>
          </Table.Tfoot>
          <Table.Caption>Monthly category budgets and spending</Table.Caption>
        </Table>
      </Table.ScrollContainer>
    </div>
  );
}

export function TablePage() {
  return (
    <section className={pageStyles.componentSection} id="table">
      <div className={pageStyles.sectionHeading}>
        <div>
          <BodyText
            component="p"
            className={pageStyles.eyebrow}
            tone="muted"
            ff="var(--bb-font-data)"
            fz="0.68rem"
          >
            Data display
          </BodyText>
          <HeadingText level={2} tone="heading" lh={1.5}>
            Table
          </HeadingText>
        </div>
        <code>import {"{ Table }"} from '@teelur/budget-board-ui';</code>
      </div>
      <BodyText
        component="p"
        className={pageStyles.sectionCopy}
        tone="muted"
        m="1em 0"
      >
        Table wraps Mantine&apos;s compound table API with BBUI semantic text,
        border, stripe, and hover colors. Its sections, cells, data renderer,
        and responsive scroll container remain available on the exported
        component.
      </BodyText>

      <ComponentDemoSection
        description="Build accessible tables with Mantine's compound sections. The scroll container keeps wide tables usable on narrow screens."
        id="table-basic"
        title="Budget summary"
        code={`<Table.ScrollContainer minWidth="32rem" type="native">
  <Table aria-label="Monthly category budget" highlightOnHover striped>
    <Table.Thead>
      <Table.Tr>
        <Table.Th scope="col">Category</Table.Th>
        <Table.Th scope="col">Budget</Table.Th>
        <Table.Th scope="col">Actual</Table.Th>
      </Table.Tr>
    </Table.Thead>
    <Table.Tbody>{/* Table.Tr and Table.Td rows */}</Table.Tbody>
    <Table.Caption>Monthly category budgets and spending</Table.Caption>
  </Table>
</Table.ScrollContainer>`}
      >
        <BudgetTable
          highlightOnHover
          striped="odd"
          withColumnBorders={false}
          withTableBorder
        />
      </ComponentDemoSection>

      <ApiPlayground
        componentName="Table"
        controls={[
          {
            key: "striped",
            label: "Striped rows",
            type: "select",
            options: ["none", "odd", "even"],
            formatCode: (value) =>
              value === "none" ? null : `striped=${JSON.stringify(value)}`,
          },
          {
            key: "highlightOnHover",
            label: "Highlight on hover",
            type: "toggle",
          },
          { key: "withTableBorder", label: "Table border", type: "toggle" },
          { key: "withColumnBorders", label: "Column borders", type: "toggle" },
        ]}
        defaultValues={{
          highlightOnHover: true,
          striped: "odd",
          withColumnBorders: false,
          withTableBorder: true,
        }}
        description="Choose striped rows, hover feedback, and border treatments. BBUI semantic colors follow the active theme."
        id="table-playground"
        render={(values) => (
          <BudgetTable
            highlightOnHover={Boolean(values.highlightOnHover)}
            striped={
              values.striped === "none"
                ? false
                : values.striped === "even"
                  ? "even"
                  : "odd"
            }
            withColumnBorders={Boolean(values.withColumnBorders)}
            withTableBorder={Boolean(values.withTableBorder)}
          />
        )}
        staticCodeProps={['aria-label="Monthly category budget"']}
        childrenCode={`<Table.Thead>
  <Table.Tr>
    <Table.Th scope="col">Category</Table.Th>
    <Table.Th scope="col">Budget</Table.Th>
    <Table.Th scope="col">Actual</Table.Th>
  </Table.Tr>
</Table.Thead>
<Table.Tbody>{/* Table.Tr and Table.Td rows */}</Table.Tbody>
<Table.Caption>Monthly category budgets and spending</Table.Caption>`}
      />

      <section className={pageStyles.componentReferenceSection} id="table-api">
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
            Table forwards Mantine Table props and preserves its compound
            components while applying BBUI semantic defaults.
          </BodyText>
        </div>
        <div className={pageStyles.referenceGrid}>
          <div>
            <table>
              <tbody>
                <tr>
                  <th>TableProps</th>
                  <td>
                    <code>Mantine TableProps</code>
                  </td>
                  <td>
                    Supports Mantine&apos;s <code>data</code> renderer, layout,
                    spacing, sticky headers, and border options. All remaining
                    props and HTML table attributes are forwarded.
                  </td>
                </tr>
                <tr>
                  <th>TableData</th>
                  <td>
                    <code>head, body, foot, caption</code>
                  </td>
                  <td>
                    Data shape accepted by the Mantine <code>data</code> prop
                    and exported by BBUI.
                  </td>
                </tr>
                <tr>
                  <th>striped</th>
                  <td>
                    <code>false | true | &quot;odd&quot; | &quot;even&quot;</code>
                  </td>
                  <td>false; striped rows use BBUI <code>surface-sunken</code>.</td>
                </tr>
                <tr>
                  <th>highlightOnHover</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>
                    false; hovered rows use BBUI <code>surface-hover</code>.
                  </td>
                </tr>
                <tr>
                  <th>borderColor</th>
                  <td>
                    <code>MantineColor</code>
                  </td>
                  <td>
                    Defaults to BBUI <code>border-subtle</code>; also controls
                    row and column dividers.
                  </td>
                </tr>
                <tr>
                  <th>stripedColor / highlightOnHoverColor</th>
                  <td>
                    <code>MantineColor</code>
                  </td>
                  <td>
                    Default to BBUI <code>surface-sunken</code> and{" "}
                    <code>surface-hover</code>; pass Mantine colors to override.
                  </td>
                </tr>
                <tr>
                  <th>compound components</th>
                  <td>
                    <code>Table.Thead, Tbody, Tfoot, Tr, Th, Td, Caption</code>
                  </td>
                  <td>
                    Mantine components are exposed on <code>Table</code>, along
                    with <code>ScrollContainer</code> and{" "}
                    <code>DataRenderer</code>.
                  </td>
                </tr>
                <tr>
                  <th>text, className, style</th>
                  <td>
                    <code>BBUI semantic styles and Mantine props</code>
                  </td>
                  <td>
                    Body text, headings, and captions use BBUI typography and
                    color tokens. Consumer styles and refs are preserved.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <pre className={pageStyles.codeBlock}>
            <code>{`<Table striped highlightOnHover>
  <Table.Thead>
    <Table.Tr>
      <Table.Th scope="col">Category</Table.Th>
    </Table.Tr>
  </Table.Thead>
  <Table.Tbody>
    <Table.Tr>
      <Table.Td>Groceries</Table.Td>
    </Table.Tr>
  </Table.Tbody>
</Table>`}</code>
          </pre>
        </div>
      </section>
    </section>
  );
}
