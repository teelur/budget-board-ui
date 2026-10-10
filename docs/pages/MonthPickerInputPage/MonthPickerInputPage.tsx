import { useState } from "react";
import { MonthPickerInput } from "../../../src";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import demoStyles from "../../components/ComponentDemoSection/ComponentDemoSection.module.css";
import pageStyles from "../Page.module.css";
import styles from "./MonthPickerInputPage.module.css";
import { BodyText, HeadingText } from "../../../src";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export function MonthPickerInputPage() {
  const [month, setMonth] = useState<string | null>("2025-06-01");
  const [months, setMonths] = useState<string[]>(["2025-04-01", "2025-06-01"]);
  const [range, setRange] = useState<[string | null, string | null]>([
    "2025-01-01",
    "2025-03-01",
  ]);

  return (
    <section className={pageStyles.componentSection} id="month-picker-input">
      <div className={pageStyles.sectionHeading}>
        <div>
          <BodyText component="p" className={pageStyles.eyebrow}>Inputs</BodyText>
          <HeadingText level={2}>MonthPickerInput</HeadingText>
        </div>
        <code>
          import {"{ MonthPickerInput }"} from '@teelur/budget-board-ui';
        </code>
      </div>
      <BodyText component="p" className={pageStyles.sectionCopy}>
        Select one month, several months, or a month range with shared BBUI
        field and calendar styling.
      </BodyText>

      <ComponentDemoSection
        description="The selection type determines the value shape. Multiple selection stays open while you choose months."
        id="month-picker-input-modes"
        title="Selection modes"
        code={`const [month, setMonth] = useState<string | null>("2025-06-01");
const [months, setMonths] = useState<string[]>(["2025-04-01", "2025-06-01"]);
const [range, setRange] = useState<[string | null, string | null]>([
  "2025-01-01",
  "2025-03-01",
]);

<MonthPickerInput
  label="Budget month"
  value={month}
  onChange={setMonth}
/>

<MonthPickerInput
  type="multiple"
  label="Recurring months"
  value={months}
  onChange={setMonths}
/>

<MonthPickerInput
  type="range"
  label="Budget period"
  value={range}
  onChange={setRange}
/>`}
      >
        <div className={styles.stack}>
          <MonthPickerInput
            label="Budget month"
            onChange={setMonth}
            value={month}
          />
          <MonthPickerInput
            label="Recurring months"
            onChange={setMonths}
            type="multiple"
            value={months}
          />
          <MonthPickerInput
            label="Budget period"
            onChange={setRange}
            type="range"
            value={range}
          />
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Constrain selectable months, change the dropdown presentation, or use standard field states and sizes."
        id="month-picker-input-options"
        title="Bounds & field states"
        code={`<MonthPickerInput
  label="2025 budget year"
  minDate="2025-01-01"
  maxDate="2025-12-01"
  defaultDate={new Date(2025, 5, 1)}
/>

<MonthPickerInput
  label="Clearable"
  clearable
  defaultValue="2025-06-01"
/>

<MonthPickerInput
  aria-label="Month picker modal"
  dropdownType="modal"
/>

<MonthPickerInput label="Read only" readOnly value="2025-06-01" />
<MonthPickerInput label="Disabled" disabled />`}
      >
        <div className={styles.stack}>
          <MonthPickerInput
            defaultDate={new Date(2025, 5, 1)}
            label="2025 budget year"
            maxDate="2025-12-01"
            minDate="2025-01-01"
          />
          <MonthPickerInput
            clearable
            defaultValue="2025-06-01"
            label="Clearable"
          />
          <MonthPickerInput
            aria-label="Month picker modal"
            dropdownType="modal"
          />
          <MonthPickerInput label="Read only" readOnly value="2025-06-01" />
          <MonthPickerInput aria-label="Disabled month" disabled />
          {sizes.map((size) => (
            <MonthPickerInput
              aria-label={`${size} month picker`}
              key={size}
              placeholder={`${size} size`}
              size={size}
            />
          ))}
        </div>
      </ComponentDemoSection>

      <section
        className={pageStyles.componentReferenceSection}
        id="month-picker-input-api"
      >
        <div className={demoStyles.componentDemoHeading}>
          <div>
            <HeadingText level={3}>API reference</HeadingText>
            <BodyText component="p">BBUI field styling with Mantine MonthPickerInput props.</BodyText>
          </div>
          <a
            aria-label="Link to API reference section"
            className={demoStyles.componentDemoAnchor}
            href="#month-picker-input-api"
          >
            #
          </a>
        </div>
        <div className={pageStyles.referenceGrid}>
          <div>
            <table className={styles.apiTable}>
              <tbody>
                <tr>
                  <th>type</th>
                  <td>
                    <code>default | multiple | range</code>
                  </td>
                  <td>default: default</td>
                </tr>
                <tr>
                  <th>value / defaultValue</th>
                  <td>
                    <code>
                      default: DateStringValue | Date | null; multiple:
                      (DateStringValue | Date | null)[]; range: [DateStringValue
                      | Date | null, DateStringValue | Date | null]
                    </code>
                  </td>
                  <td>
                    DateStringValue uses YYYY-MM-DD; each selected month is
                    represented by its first day.
                  </td>
                </tr>
                <tr>
                  <th>onChange</th>
                  <td>
                    <code>
                      default: (value: DateStringValue | null) =&gt; void;
                      multiple: (value: DateStringValue[]) =&gt; void; range:
                      (value: [DateStringValue | null, DateStringValue | null])
                      =&gt; void
                    </code>
                  </td>
                  <td>callback value shape follows type</td>
                </tr>
                <tr>
                  <th>valueFormat / valueFormatter</th>
                  <td>
                    <code>string / custom formatter</code>
                  </td>
                  <td>valueFormat default: MMMM YYYY</td>
                </tr>
                <tr>
                  <th>minDate / maxDate</th>
                  <td>
                    <code>DateStringValue | Date</code>
                  </td>
                  <td>optional selectable month bounds</td>
                </tr>
                <tr>
                  <th>defaultDate</th>
                  <td>
                    <code>DateStringValue | Date</code>
                  </td>
                  <td>initial displayed month; does not set the value</td>
                </tr>
                <tr>
                  <th>defaultLevel / level / maxLevel</th>
                  <td>
                    <code>month | year | decade</code>
                  </td>
                  <td>opens at year level; maxLevel defaults to decade</td>
                </tr>
                <tr>
                  <th>monthsListFormat / yearsListFormat</th>
                  <td>
                    <code>
                      string | (date: DateStringValue) =&gt; ReactNode
                    </code>
                  </td>
                  <td>defaults: MMM / YYYY</td>
                </tr>
                <tr>
                  <th>closeOnChange / sortDates</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>
                    defaults: true / true; sortDates applies to multiple mode
                  </td>
                </tr>
                <tr>
                  <th>allowDeselect / allowSingleDateInRange</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>applies to default / range modes, respectively</td>
                </tr>
                <tr>
                  <th>dropdownType</th>
                  <td>
                    <code>popover | modal</code>
                  </td>
                  <td>default: popover</td>
                </tr>
                <tr>
                  <th>clearable / disabled / readOnly</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>defaults: false</td>
                </tr>
                <tr>
                  <th>size</th>
                  <td>
                    <code>xs | sm | md | lg | xl</code>
                  </td>
                  <td>default: sm</td>
                </tr>
                <tr>
                  <th>presets</th>
                  <td>
                    <code>MonthPickerPreset&lt;Type&gt;[]</code>
                  </td>
                  <td>labeled preset values follow the selected type</td>
                </tr>
                <tr>
                  <th>locale / labelSeparator</th>
                  <td>
                    <code>string</code>
                  </td>
                  <td>locale defaults to the Mantine DatesProvider setting</td>
                </tr>
                <tr>
                  <th>popoverProps / modalProps</th>
                  <td>
                    <code>Mantine Popover / Modal props</code>
                  </td>
                  <td>configure the selected dropdown presentation</td>
                </tr>
                <tr>
                  <th>className / classNames / styles / vars / attributes</th>
                  <td>
                    <code>Mantine MonthPickerInput styles API</code>
                  </td>
                  <td>
                    consumer classes and styles are merged with BBUI styles
                  </td>
                </tr>
                <tr>
                  <th>wrapperProps</th>
                  <td>
                    <code>Mantine InputWrapper props</code>
                  </td>
                  <td>forwarded with the BBUI color-scheme marker</td>
                </tr>
                <tr>
                  <th>field props</th>
                  <td>
                    <code>
                      label, description, error, placeholder, required
                    </code>
                  </td>
                  <td>standard Mantine field props are forwarded</td>
                </tr>
                <tr>
                  <th>other props</th>
                  <td>
                    <code>MonthPickerInputProps&lt;Type&gt;</code>
                  </td>
                  <td>
                    remaining MonthPicker, calendar, button, and Box props are
                    forwarded
                  </td>
                </tr>
                <tr>
                  <th>field / calendar colors</th>
                  <td>
                    <code>
                      surfaceInput, focusRing, surfaceElevated, primary
                    </code>
                  </td>
                  <td>shared, light/dark theme-aware BBUI tokens</td>
                </tr>
              </tbody>
            </table>
          </div>
          <pre className={pageStyles.codeBlock}>
            <code>{`<MonthPickerInput
  type="range"
  label="Budget period"
  value={range}
  onChange={setRange}
/>`}</code>
          </pre>
        </div>
      </section>
    </section>
  );
}
