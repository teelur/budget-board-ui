import { useState } from "react";
import { DateInput } from "../../../src";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import demoStyles from "../../components/ComponentDemoSection/ComponentDemoSection.module.css";
import pageStyles from "../Page.module.css";
import styles from "./DateInputPage.module.css";
import { BodyText, HeadingText } from "../../../src";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export function DateInputPage() {
  const [date, setDate] = useState<string | null>("2025-06-15");

  return (
    <section className={pageStyles.componentSection} id="date-input">
      <div className={pageStyles.sectionHeading}>
        <div>
          <BodyText component="p" className={pageStyles.eyebrow} tone="muted" ff="var(--bb-font-data)" fz="0.68rem">Inputs</BodyText>
          <HeadingText level={2} tone="heading" lh={1.5}>DateInput</HeadingText>
        </div>
        <code>import {"{ DateInput }"} from '@teelur/budget-board-ui';</code>
      </div>
      <BodyText component="p" className={pageStyles.sectionCopy} tone="muted" m="1em 0">
        Free-form date entry with a calendar dropdown and the shared BBUI field
        treatment.
      </BodyText>

      <ComponentDemoSection
        description="Type a date directly or choose it from the calendar. Values use Mantine's date string API."
        id="date-input-basic"
        title="Basic usage"
        code={`const [date, setDate] = useState<string | null>("2025-06-15");

<DateInput
  label="Transaction date"
  value={date}
  onChange={setDate}
  valueFormat="YYYY-MM-DD"
/>`}
      >
        <div className={styles.stack}>
          <DateInput
            label="Transaction date"
            onChange={setDate}
            value={date}
            valueFormat="YYYY-MM-DD"
          />
          <DateInput
            clearable
            defaultValue="2025-06-15"
            label="Uncontrolled date"
            placeholder="Choose a date"
          />
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Mantine sizes and native disabled or read-only behavior remain available."
        id="date-input-sizes-states"
        title="Sizes & states"
        code={`<DateInput label="Small" size="sm" />
<DateInput label="Read only" readOnly value="2025-06-15" />
<DateInput label="Disabled" disabled />`}
      >
        <div className={styles.stack}>
          {sizes.map((size) => (
            <DateInput
              aria-label={`${size} date`}
              key={size}
              placeholder={size}
              size={size}
            />
          ))}
          <DateInput
            aria-label="Read only date"
            readOnly
            value="2025-06-15"
            valueFormat="YYYY-MM-DD"
          />
          <DateInput aria-label="Disabled date" disabled />
        </div>
      </ComponentDemoSection>

      <section
        className={pageStyles.componentReferenceSection}
        id="date-input-api"
      >
        <div className={demoStyles.componentDemoHeading}>
          <div>
            <HeadingText level={3} tone="heading" lh={1.5}>API reference</HeadingText>
            <BodyText component="p" tone="secondary" fz="0.82rem" lh={1.55} m="0.45rem 0 0">BBUI field styling with Mantine DateInput props.</BodyText>
          </div>
          <a
            aria-label="Link to API reference section"
            className={demoStyles.componentDemoAnchor}
            href="#date-input-api"
          >
            #
          </a>
        </div>
        <div className={pageStyles.referenceGrid}>
          <div>
            <table>
              <tbody>
                <tr>
                  <th>value / defaultValue</th>
                  <td>
                    <code>DateStringValue | Date | null</code>
                  </td>
                  <td>controlled value / uncontrolled initial value</td>
                </tr>
                <tr>
                  <th>onChange</th>
                  <td>
                    <code>(value: DateStringValue | null) =&gt; void</code>
                  </td>
                  <td>called when the parsed date changes</td>
                </tr>
                <tr>
                  <th>valueFormat</th>
                  <td>
                    <code>string | (date: DateStringValue) =&gt; string</code>
                  </td>
                  <td>display and parse format; default: MMMM D, YYYY</td>
                </tr>
                <tr>
                  <th>dateParser</th>
                  <td>
                    <code>
                      (input: string) =&gt; DateStringValue | Date | null
                    </code>
                  </td>
                  <td>custom parser for typed input</td>
                </tr>
                <tr>
                  <th>minDate / maxDate</th>
                  <td>
                    <code>DateStringValue | Date</code>
                  </td>
                  <td>optional selectable date bounds</td>
                </tr>
                <tr>
                  <th>clearable</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>false</td>
                </tr>
                <tr>
                  <th>size</th>
                  <td>
                    <code>xs | sm | md | lg | xl</code>
                  </td>
                  <td>Mantine default: sm</td>
                </tr>
                <tr>
                  <th>className / classNames / styles</th>
                  <td>
                    <code>Mantine DateInput styles API</code>
                  </td>
                  <td>consumer classes and styles are preserved</td>
                </tr>
                <tr>
                  <th>other props</th>
                  <td>
                    <code>DateInputProps</code>
                  </td>
                  <td>Mantine date picker and native input props</td>
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
            <code>{`<DateInput
  label="Transaction date"
  value={date}
  onChange={setDate}
  valueFormat="YYYY-MM-DD"
/>`}</code>
          </pre>
        </div>
      </section>
    </section>
  );
}
