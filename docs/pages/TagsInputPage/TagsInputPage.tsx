import { TagsInput } from "../../../src";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import demoStyles from "../../components/ComponentDemoSection/ComponentDemoSection.module.css";
import pageStyles from "../Page.module.css";
import { BodyText, HeadingText } from "../../../src";

const suggestedTags = ["Home", "Food", "Transport", "Utilities"];

export function TagsInputPage() {
  return (
    <section className={pageStyles.componentSection} id="tags-input">
      <div className={pageStyles.sectionHeading}>
        <div>
          <BodyText component="p" className={pageStyles.eyebrow}>Inputs</BodyText>
          <HeadingText level={2}>TagsInput</HeadingText>
        </div>
        <code>import {"{ TagsInput }"} from '@teelur/budget-board-ui';</code>
      </div>
      <BodyText component="p" className={pageStyles.sectionCopy}>
        Enter free-form tags or select from suggested values.
      </BodyText>

      <ComponentDemoSection
        description="Type a value and press Enter to add a tag."
        id="tags-input-free-form"
        title="Free-form tags"
        code={`<TagsInput label="Tags" placeholder="Add a tag" />`}
      >
        <div style={{ maxWidth: "30rem", width: "100%" }}>
          <TagsInput label="Tags" placeholder="Add a tag" />
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Choose a suggested value or enter a new one."
        id="tags-input-suggestions"
        title="Suggestions"
        code={`<TagsInput
  data={["Home", "Food", "Transport", "Utilities"]}
  label="Categories"
  placeholder="Add a category"
/>`}
      >
        <div style={{ maxWidth: "30rem", width: "100%" }}>
          <TagsInput
            data={suggestedTags}
            label="Categories"
            placeholder="Add a category"
          />
        </div>
      </ComponentDemoSection>

      <section
        className={pageStyles.componentReferenceSection}
        id="tags-input-api"
      >
        <div className={demoStyles.componentDemoHeading}>
          <div>
            <HeadingText level={3}>API reference</HeadingText>
            <BodyText component="p">BBUI styling with Mantine TagsInput props and behavior.</BodyText>
          </div>
          <a
            aria-label="Link to API reference section"
            className={demoStyles.componentDemoAnchor}
            href="#tags-input-api"
          >
            #
          </a>
        </div>
        <div className={pageStyles.referenceGrid}>
          <div>
            <table>
              <tbody>
                <tr>
                  <th>data</th>
                  <td>
<code>ComboboxData</code>
                  </td>
                  <td>
                    suggested values; Mantine option and group data also work
                  </td>
                </tr>
                <tr>
                  <th>value / defaultValue</th>
                  <td>
                    <code>string[]</code>
                  </td>
                  <td>controlled / uncontrolled tags</td>
                </tr>
                <tr>
                  <th>onChange</th>
                  <td>
                    <code>(value: string[]) =&gt; void</code>
                  </td>
                  <td>called when tags change</td>
                </tr>
                <tr>
                  <th>splitChars</th>
                  <td>
                    <code>string[]</code>
                  </td>
                  <td>
                    characters that submit the current tag; defaults to comma
                  </td>
                </tr>
                <tr>
                  <th>acceptValueOnBlur</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>accept a typed value on blur; defaults to true</td>
                </tr>
                <tr>
                  <th>maxTags / allowDuplicates</th>
                  <td>
                    <code>number / boolean</code>
                  </td>
                  <td>limit tag count and allow duplicate values</td>
                </tr>
                <tr>
                  <th>onRemove / onClear / onMaxTags / onDuplicate</th>
                  <td>
                    <code>callbacks</code>
                  </td>
                  <td>
                    respond to tag removal, clearing, limits, and duplicates
                  </td>
                </tr>
                <tr>
                  <th>className / classNames / styles / comboboxProps</th>
                  <td>
                    <code>Mantine styles API</code>
                  </td>
                  <td>consumer classes and component or dropdown styles</td>
                </tr>
              </tbody>
            </table>
          </div>
          <pre className={pageStyles.codeBlock}>
            <code>{`<TagsInput
  data={["Home", "Food"]}
  label="Categories"
  placeholder="Add a category"
/>`}</code>
          </pre>
        </div>
      </section>
    </section>
  );
}
