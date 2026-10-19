import { useState } from "react";
import { BodyText, HeadingText, MonthToolcards } from "../../../src";
import type { MonthToolcardStatus } from "../../../src";
import { ApiPlayground } from "../../components/ApiPlayground/ApiPlayground";
import demoStyles from "../../components/ComponentDemoSection/ComponentDemoSection.module.css";
import pageStyles from "../Page.module.css";

interface MonthToolcardsPreviewProps {
  allowSelectMultiple: boolean;
  allowFutureMonths: boolean;
  isPending: boolean;
  locale: string;
}

function getDemoMonthStatus(date: Date): MonthToolcardStatus {
  switch (date.getMonth() % 3) {
    case 0:
      return "positive";
    case 1:
      return "negative";
    default:
      return "neutral";
  }
}

function MonthToolcardsPreview({
  allowSelectMultiple,
  allowFutureMonths,
  isPending,
  locale,
}: MonthToolcardsPreviewProps) {
  const [selectedDates, setSelectedDates] = useState<Date[]>(() => {
    const date = new Date();
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
    return [date];
  });

  return (
    <MonthToolcards
      allowFutureMonths={allowFutureMonths}
      allowSelectMultiple={allowSelectMultiple}
      getMonthStatus={getDemoMonthStatus}
      isPending={isPending}
      locale={locale}
      selectedDates={selectedDates}
      setSelectedDates={setSelectedDates}
    />
  );
}

export function MonthToolcardsPage() {
  return (
    <section className={pageStyles.componentSection} id="month-toolcards">
      <div className={pageStyles.sectionHeading}>
        <div>
          <BodyText
            component="p"
            className={pageStyles.eyebrow}
            tone="muted"
            ff="var(--bb-font-data)"
            fz="0.68rem"
          >
            Navigation
          </BodyText>
          <HeadingText level={2} tone="heading" lh={1.5}>
            MonthToolcards
          </HeadingText>
        </div>
        <code>
          import {"{ MonthToolcards }"} from '@teelur/budget-board-ui';
        </code>
      </div>
      <BodyText
        component="p"
        className={pageStyles.sectionCopy}
        tone="muted"
        m="1em 0"
      >
        A responsive month selector with controlled single or multiple
        selection, previous and future month navigation, and positive, neutral,
        negative, and pending states. The status strip uses BBUI semantic
        success, error, and sunken-surface colors.
      </BodyText>

      <ApiPlayground
        componentName="MonthToolcards"
        controls={[
          { key: "allowSelectMultiple", label: "Multiple selection", type: "toggle" },
          { key: "allowFutureMonths", label: "Allow future months", type: "toggle" },
          { key: "isPending", label: "Pending", type: "toggle" },
          {
            key: "locale",
            label: "Locale",
            options: ["en-US", "de-DE", "fr-FR"],
            type: "select",
          },
        ]}
        defaultValues={{
          allowSelectMultiple: true,
          allowFutureMonths: false,
          isPending: false,
          locale: "en-US",
        }}
        description="Try selection modes, pending data, future navigation, and localized month labels."
        id="month-toolcards-playground"
        staticCodeProps={[
          "selectedDates={selectedDates}",
          "setSelectedDates={setSelectedDates}",
          "getMonthStatus={getMonthStatus}",
        ]}
        render={(values) => (
          <MonthToolcardsPreview
            allowFutureMonths={values.allowFutureMonths as boolean}
            allowSelectMultiple={values.allowSelectMultiple as boolean}
            isPending={values.isPending as boolean}
            locale={values.locale as string}
          />
        )}
      />

      <section
        className={pageStyles.componentReferenceSection}
        id="month-toolcards-api"
      >
        <div className={demoStyles.componentDemoHeading}>
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
              Selection state is controlled by the caller. Status colors map
              to the shared BBUI palette and follow the active color scheme.
            </BodyText>
          </div>
          <a
            aria-label="Link to MonthToolcards API reference"
            className={demoStyles.componentDemoAnchor}
            href="#month-toolcards-api"
          >
            #
          </a>
        </div>
        <div className={pageStyles.referenceGrid}>
          <div>
            <table>
              <tbody>
                <tr>
                  <th>selectedDates</th>
                  <td>
                    <code>Date[]</code>
                  </td>
                  <td>Selected month dates; compare by exact timestamp.</td>
                </tr>
                <tr>
                  <th>setSelectedDates</th>
                  <td>
                    <code>Dispatch&lt;SetStateAction&lt;Date[]&gt;&gt;</code>
                  </td>
                  <td>Required controlled selection setter.</td>
                </tr>
                <tr>
                  <th>getMonthStatus</th>
                  <td>
                    <code>(date: Date) =&gt; MonthToolcardStatus</code>
                  </td>
                  <td>
                    Returns <code>positive</code>, <code>neutral</code>, or{" "}
                    <code>negative</code>. Positive and negative use the
                    semantic success and error tokens; neutral uses the sunken
                    surface token.
                  </td>
                </tr>
                <tr>
                  <th>isPending</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>
                    When true, status strips use the sunken surface and status
                    lookup is skipped.
                  </td>
                </tr>
                <tr>
                  <th>allowSelectMultiple</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>
                    Adds or removes a date from the selection; otherwise each
                    selection replaces the previous one.
                  </td>
                </tr>
                <tr>
                  <th>allowFutureMonths</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>
                    Enables navigation toward future months. Defaults to{" "}
                    <code>false</code>.
                  </td>
                </tr>
                <tr>
                  <th>locale</th>
                  <td>
                    <code>string</code>
                  </td>
                  <td>
                    Locale passed to <code>Intl.DateTimeFormat</code> for month
                    labels; defaults to the browser locale.
                  </td>
                </tr>
                <tr>
                  <th>olderMonthsLabel / newerMonthsLabel</th>
                  <td>
                    <code>string</code>
                  </td>
                  <td>
                    Accessible labels for the navigation buttons. Defaults to
                    “Show older months” and “Show newer months”.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <pre className={pageStyles.codeBlock}>
            <code>{`const [selectedDates, setSelectedDates] = useState<Date[]>([]);

<MonthToolcards
  selectedDates={selectedDates}
  setSelectedDates={setSelectedDates}
  getMonthStatus={(date) => getStatusForMonth(date)}
  isPending={false}
  allowSelectMultiple
/>`}</code>
          </pre>
        </div>
      </section>
    </section>
  );
}
