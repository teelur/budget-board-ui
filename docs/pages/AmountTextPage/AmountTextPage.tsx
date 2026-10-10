import { AmountText, StatusColorType } from "../../../src";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import demoStyles from "../../components/ComponentDemoSection/ComponentDemoSection.module.css";
import pageStyles from "../Page.module.css";
import styles from "./AmountTextPage.module.css";
import { BodyText, HeadingText } from "../../../src";

export function AmountTextPage() {
  return (
    <section className={pageStyles.componentSection} id="amount-text">
      <div className={pageStyles.sectionHeading}>
        <div>
          <BodyText component="p" className={pageStyles.eyebrow}>Financial semantics</BodyText>
          <HeadingText level={2}>AmountText</HeadingText>
        </div>
        <code>import {"{ AmountText }"} from '@teelur/budget-board-ui';</code>
      </div>
      <BodyText component="p" className={pageStyles.sectionCopy}>
        Amount-aware colors, formatting, and privacy masking.
      </BodyText>

      <ComponentDemoSection
        description="Status colors preserve the financial meaning of each value."
        id="amount-text-types"
        title="Status types"
        code={`<AmountText amount={-80} total={100} type={StatusColorType.Expense}>
  $80 spent of $100
</AmountText>`}
      >
        <div className={styles.stack}>
          <AmountText amount={80} total={100} type={StatusColorType.Income}>
            Income below plan
          </AmountText>
          <AmountText amount={-80} total={100} type={StatusColorType.Expense}>
            $80 spent of $100
          </AmountText>
          <AmountText amount={-12} type={StatusColorType.Total}>
            Total is negative
          </AmountText>
          <AmountText amount={90} total={100} type={StatusColorType.Target}>
            Target progress
          </AmountText>
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Built-in Intl formatting handles currency, locale, precision, and sign direction."
        id="amount-text-formatting"
        title="Formatting"
        code={`<AmountText
  amount={-1234.5}
  currency="USD"
  decimalPlaces={2}
  locale="en-US"
  invertSign
/>`}
      >
        <div className={styles.stack}>
          <AmountText
            amount={-1234.5}
            currency="USD"
            decimalPlaces={2}
            locale="en-US"
            invertSign
          />
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Disable semantic color without hiding the amount."
        id="amount-text-color"
        title="Color control"
        code={`<AmountText amount={-12} disableStatusColor>
  $12.00
</AmountText>`}
      >
        <div className={styles.stack}>
          <AmountText amount={-12} disableStatusColor>
            $12.00
          </AmountText>
          <AmountText amount={-12} c="var(--bb-color-text)">
            Explicit color
          </AmountText>
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="isSensitive replaces children or formatted content with sensitiveText."
        id="amount-text-privacy"
        title="Privacy-aware amount"
        code={`function PrivacyAwareAmountText(props: AmountTextProps) {
  const { isPrivacyModeEnabled } = usePrivacyMode();

  return (
    <AmountText
      {...props}
      isSensitive={isPrivacyModeEnabled}
    />
  );
}`}
      >
        <div className={styles.stack}>
          <AmountText amount={-12} type={StatusColorType.Total}>
            Semantic color enabled
          </AmountText>
          <AmountText amount={-12} isSensitive>
            $12.00
          </AmountText>
          <AmountText amount={-12} isSensitive sensitiveText="Hidden">
            $12.00
          </AmountText>
        </div>
      </ComponentDemoSection>

      <section
        className={pageStyles.componentReferenceSection}
        id="amount-text-api"
      >
        <div className={demoStyles.componentDemoHeading}>
          <div>
            <HeadingText level={3}>API reference</HeadingText>
            <BodyText component="p">Financial props plus the complete Mantine TextProps surface.</BodyText>
          </div>
          <a
            aria-label="Link to AmountText API reference section"
            className={demoStyles.componentDemoAnchor}
            href="#amount-text-api"
          >
            #
          </a>
        </div>
        <div className={pageStyles.referenceGrid}>
          <div>
            <table>
              <tbody>
                <tr>
                  <th>amount</th>
                  <td>
                    <code>number</code>
                  </td>
                  <td>required</td>
                </tr>
                <tr>
                  <th>total</th>
                  <td>
                    <code>number</code>
                  </td>
                  <td>0</td>
                </tr>
                <tr>
                  <th>type</th>
                  <td>
                    <code>StatusColorType</code>
                  </td>
                  <td>Total; controls semantic color rules</td>
                </tr>
                <tr>
                  <th>warningThreshold</th>
                  <td>
                    <code>number</code>
                  </td>
                  <td>undefined; warning is opt-in</td>
                </tr>
                <tr>
                  <th>isSensitive</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>
                    false; renders sensitiveText and disables semantic color
                  </td>
                </tr>
                <tr>
                  <th>sensitiveText</th>
                  <td>
                    <code>ReactNode</code>
                  </td>
                  <td>••••</td>
                </tr>
                <tr>
                  <th>locale</th>
                  <td>
                    <code>string</code>
                  </td>
                  <td>runtime default</td>
                </tr>
                <tr>
                  <th>currency</th>
                  <td>
                    <code>string</code>
                  </td>
                  <td>undefined; uses decimal formatting when omitted</td>
                </tr>
                <tr>
                  <th>decimalPlaces</th>
                  <td>
                    <code>number</code>
                  </td>
                  <td>runtime default</td>
                </tr>
                <tr>
                  <th>signDisplay</th>
                  <td>
                    <code>Intl.NumberFormatOptions["signDisplay"]</code>
                  </td>
                  <td>runtime default</td>
                </tr>
                <tr>
                  <th>invertSign</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>
                    false; formats the opposite sign without changing status
                    color
                  </td>
                </tr>
                <tr>
                  <th>disableStatusColor</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>false; keeps visible content but removes status color</td>
                </tr>
                <tr>
                  <th>children</th>
                  <td>
                    <code>ReactNode</code>
                  </td>
                  <td>optional content override</td>
                </tr>
                <tr>
                  <th>Mantine TextProps</th>
                  <td>
                    <code>TextProps</code>
                  </td>
                  <td>
                    forwarded to the root text element; fw defaults to 600
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <pre className={pageStyles.codeBlock}>
            <code>{`<AmountText
  amount={-80}
  total={100}
  type={StatusColorType.Expense}
  isSensitive={isPrivacyModeEnabled}
>
  $80 spent of $100
</AmountText>`}</code>
          </pre>
        </div>
      </section>
    </section>
  );
}
