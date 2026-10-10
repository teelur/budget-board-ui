import { useState } from "react";
import { DatePickerInput } from "../../../src";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import demoStyles from "../../components/ComponentDemoSection/ComponentDemoSection.module.css";
import pageStyles from "../Page.module.css";
import styles from "./DatePickerInputPage.module.css";
import { BodyText, HeadingText } from "../../../src";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export function DatePickerInputPage() {
  const [date, setDate] = useState<string | null>("2025-06-15");
  const [range, setRange] = useState<[string | null, string | null]>([
    null,
    null,
  ]);

  return (
    <section className={pageStyles.componentSection} id="date-picker-input">
      <div className={pageStyles.sectionHeading}>
        <div>
          <BodyText component="p" className={pageStyles.eyebrow}>Inputs</BodyText>
          <HeadingText level={2}>DatePickerInput</HeadingText>
        </div>
        <code>
          import {"{ DatePickerInput }"} from '@teelur/budget-board-ui';
        </code>
      </div>
      <BodyText component="p" className={pageStyles.sectionCopy}>
        Calendar-first date selection with single, multiple, and range modes.
      </BodyText>

      <ComponentDemoSection
        description="Use the picker trigger for a single date or choose a range without giving up the shared BBUI field styling."
        id="date-picker-input-basic"
        title="Basic usage"
        code={`const [date, setDate] = useState<string | null>("2025-06-15");
const [range, setRange] = useState<[string | null, string | null]>([null, null]);

<DatePickerInput
  label="Statement date"
  value={date}
  onChange={setDate}
/>

<DatePickerInput
  type="range"
  label="Statement period"
  value={range}
  onChange={setRange}
/>`}
      >
        <div className={styles.stack}>
          <DatePickerInput
            label="Statement date"
            onChange={setDate}
            value={date}
            valueFormat="YYYY-MM-DD"
          />
          <DatePickerInput
            label="Statement period"
            onChange={setRange}
            type="range"
            value={range}
            valueFormat="YYYY-MM-DD"
          />
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Mantine sizes and disabled or read-only states remain available."
        id="date-picker-input-sizes-states"
        title="Sizes & states"
        code={`<DatePickerInput label="Small" size="sm" />
<DatePickerInput label="Read only" readOnly value="2025-06-15" />
<DatePickerInput label="Disabled" disabled />`}
      >
        <div className={styles.stack}>
          {sizes.map((size) => (
            <DatePickerInput
              aria-label={`${size} date`}
              key={size}
              placeholder={`${size} date`}
              size={size}
            />
          ))}
          <DatePickerInput
            aria-label="Read only date"
            readOnly
            value="2025-06-15"
            valueFormat="YYYY-MM-DD"
          />
          <DatePickerInput aria-label="Disabled date" disabled />
        </div>
      </ComponentDemoSection>

      <section
        className={pageStyles.componentReferenceSection}
        id="date-picker-input-api"
      >
        <div className={demoStyles.componentDemoHeading}>
          <div>
            <HeadingText level={3}>API reference</HeadingText>
            <BodyText component="p">BBUI field styling with Mantine DatePickerInput props.</BodyText>
          </div>
          <a
            aria-label="Link to API reference section"
            className={demoStyles.componentDemoAnchor}
            href="#date-picker-input-api"
          >
            #
          </a>
        </div>
        <div className={pageStyles.referenceGrid}>
          <div>
            <table>
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
                      string | Date | string[] | [string | null, string | null]
                    </code>
                  </td>
                  <td>shape depends on the selected type</td>
                </tr>
                <tr>
                  <th>onChange</th>
                  <td>
                    <code>type-specific date value callback</code>
                  </td>
                  <td>called when a date selection changes</td>
                </tr>
                <tr>
                  <th>valueFormat</th>
                  <td>
                    <code>string</code>
                  </td>
                  <td>display format; default: MMMM D, YYYY</td>
                </tr>
                <tr>
                  <th>dropdownType</th>
                  <td>
                    <code>popover | modal</code>
                  </td>
                  <td>default: popover</td>
                </tr>
                <tr>
                  <th>closeOnChange</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>true; not applicable to multiple mode</td>
                </tr>
                <tr>
                  <th>clearable / disabled / readOnly</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>false</td>
                </tr>
                <tr>
                  <th>className / classNames / styles</th>
                  <td>
                    <code>Mantine DatePickerInput styles API</code>
                  </td>
                  <td>consumer classes and styles are preserved</td>
                </tr>
                <tr>
                  <th>other props</th>
                  <td>
                    <code>DatePickerInputProps&lt;Type&gt;</code>
                  </td>
                  <td>Mantine picker and input props are forwarded</td>
                </tr>
                <tr>
                  <th>field background / focus</th>
                  <td>
                    <code>surfaceInput / focusRing</code>
                  </td>
                  <td>shared, theme-aware BBUI field tokens</td>
                </tr>
              </tbody>
            </table>
          </div>
          <pre className={pageStyles.codeBlock}>
            <code>{`<DatePickerInput
  type="range"
  label="Statement period"
  value={range}
  onChange={setRange}
/>`}</code>
          </pre>
        </div>
      </section>
    </section>
  );
}
