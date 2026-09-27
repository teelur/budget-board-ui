import {
  defaultStatusWarningThreshold,
  StatusColorType,
  StatusText,
} from "../../../src";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import demoStyles from "../../components/ComponentDemoSection/ComponentDemoSection.module.css";
import pageStyles from "../Page.module.css";
import styles from "./StatusTextPage.module.css";

export function StatusTextPage() {
  return (
    <section className={pageStyles.componentSection} id="status-text">
      <div className={pageStyles.sectionHeading}>
        <div>
          <p className={pageStyles.eyebrow}>Financial semantics</p>
          <h2>StatusText</h2>
        </div>
        <code>import {"{ StatusText }"} from '@teelur/budget-board-ui';</code>
      </div>
      <p className={pageStyles.sectionCopy}>
        A Mantine Text wrapper for consistent income, expense, total, and target
        status colors. The component is provider-independent and accepts every
        Mantine Text prop.
      </p>
      <p className={pageStyles.sectionCopy}>
        Privacy-mode adapters should pass <code>disableStatusColor</code> and
        provide the consumer&apos;s privacy color through Mantine&apos;s{" "}
        <code>c</code> prop when needed.
      </p>

      <ComponentDemoSection
        description="Status colors preserve the financial meaning of each value."
        id="status-text-types"
        title="Status types"
        code={`<StatusText amount={-80} total={100} type={StatusColorType.Expense}>
  $80 spent of $100
</StatusText>`}
      >
        <div className={styles.stack}>
          <StatusText amount={80} total={100} type={StatusColorType.Income}>
            Income below plan
          </StatusText>
          <StatusText amount={-80} total={100} type={StatusColorType.Expense}>
            $80 spent of $100
          </StatusText>
          <StatusText amount={-12} type={StatusColorType.Total}>
            Total is negative
          </StatusText>
          <StatusText amount={90} total={100} type={StatusColorType.Target}>
            Target progress
          </StatusText>
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Disable semantic colors at the adapter boundary when privacy mode hides financial meaning."
        id="status-text-privacy"
        title="Privacy adapter"
        code={`function PrivacyAwareStatusText(props: StatusTextProps) {
  const { isPrivacyModeEnabled } = usePrivacyMode();

  return (
    <StatusText
      {...props}
      c={isPrivacyModeEnabled ? "var(--base-color-text-primary)" : undefined}
      disableStatusColor={isPrivacyModeEnabled}
    />
  );
}`}
      >
        <div className={styles.stack}>
          <StatusText amount={-12} type={StatusColorType.Total}>
            Semantic color enabled
          </StatusText>
          <StatusText
            amount={-12}
            c="var(--base-color-text-primary)"
            disableStatusColor
          >
            Privacy color supplied by adapter
          </StatusText>
        </div>
      </ComponentDemoSection>

      <section
        className={pageStyles.componentReferenceSection}
        id="status-text-api"
      >
        <div className={demoStyles.componentDemoHeading}>
          <div>
            <h3>API reference</h3>
            <p>Financial props plus the complete Mantine TextProps surface.</p>
          </div>
          <a
            aria-label="Link to StatusText API reference section"
            className={demoStyles.componentDemoAnchor}
            href="#status-text-api"
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
                  <td>{defaultStatusWarningThreshold}</td>
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
            <code>{`<StatusText
  amount={-80}
  total={100}
  type={StatusColorType.Expense}
  warningThreshold={105}
>
  $80 spent of $100
</StatusText>`}</code>
          </pre>
        </div>
      </section>
    </section>
  );
}
