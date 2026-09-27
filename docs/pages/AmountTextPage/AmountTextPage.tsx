import { AmountText, StatusColorType } from "../../../src";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import demoStyles from "../../components/ComponentDemoSection/ComponentDemoSection.module.css";
import pageStyles from "../Page.module.css";
import styles from "./AmountTextPage.module.css";

export function AmountTextPage() {
  return (
    <section className={pageStyles.componentSection} id="amount-text">
      <div className={pageStyles.sectionHeading}>
        <div>
          <p className={pageStyles.eyebrow}>Financial semantics</p>
          <h2>AmountText</h2>
        </div>
        <code>import {"{ AmountText }"} from '@teelur/budget-board-ui';</code>
      </div>
      <p className={pageStyles.sectionCopy}>
        A Mantine Text wrapper for amount-aware semantic colors and privacy
        masking. The component is provider-independent and accepts every
        Mantine Text prop.
      </p>
      <p className={pageStyles.sectionCopy}>
        Pass <code>isSensitive</code> when the amount should be masked. This
        also suppresses semantic color while preserving an explicit{" "}
        <code>c</code> prop.
      </p>
      <p className={pageStyles.sectionCopy}>
        Expense warning colors are opt-in: pass <code>warningThreshold</code>
        explicitly when a warning band is desired.
      </p>

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
        description="Mask the rendered value and suppress financial color when privacy mode hides financial meaning."
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
        </div>
      </ComponentDemoSection>

      <section
        className={pageStyles.componentReferenceSection}
        id="amount-text-api"
      >
        <div className={demoStyles.componentDemoHeading}>
          <div>
            <h3>API reference</h3>
            <p>Financial props plus the complete Mantine TextProps surface.</p>
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
                  <td>Total</td>
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
                  <td>false; masks content and disables semantic color</td>
                </tr>
                <tr>
                  <th>sensitiveText</th>
                  <td>
                    <code>ReactNode</code>
                  </td>
                  <td>••••</td>
                </tr>
                <tr>
                  <th>disableStatusColor</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>false</td>
                </tr>
                <tr>
                  <th>children</th>
                  <td>
                    <code>ReactNode</code>
                  </td>
                  <td>-</td>
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
