import { useState } from "react";
import {
  BodyText,
  Checkbox,
  Combobox,
  HeadingText,
  Select,
  TextInput,
  useCombobox,
} from "../../../src";
import type { ComboboxProps } from "../../../src";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import demoStyles from "../../components/ComponentDemoSection/ComponentDemoSection.module.css";
import pageStyles from "../Page.module.css";

type ComboboxPosition = Extract<
  NonNullable<ComboboxProps["position"]>,
  "bottom" | "top" | "right" | "left"
>;
type ComboboxSize = "xs" | "sm" | "md" | "lg" | "xl";

const positions: ComboboxPosition[] = ["bottom", "top", "right", "left"];
const sizes: ComboboxSize[] = ["xs", "sm", "md", "lg", "xl"];
const suggestions = [
  "@transactions.sum()",
  "@transactions.count()",
  "@budgets.remaining()",
];

interface ComboboxPreviewProps {
  position: ComboboxPosition;
  size: ComboboxSize;
  withinPortal: boolean;
}

function ComboboxPreview({
  position,
  size,
  withinPortal,
}: ComboboxPreviewProps) {
  const store = useCombobox();
  const [value, setValue] = useState("@transactions.");

  return (
    <Combobox
      onOptionSubmit={(nextValue) => {
        setValue(nextValue);
        store.closeDropdown();
      }}
      position={position}
      size={size}
      store={store}
      withinPortal={withinPortal}
      width="target"
    >
      <Combobox.Target>
        <TextInput
          label="Formula"
          placeholder="Enter a formula"
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
          onClick={() => store.openDropdown()}
          onFocus={() => store.openDropdown()}
        />
      </Combobox.Target>
      <Combobox.Dropdown>
        <Combobox.Options mah={180}>
          {suggestions.map((suggestion) => (
            <Combobox.Option key={suggestion} value={suggestion}>
              <BodyText tone="primary" size="sm">
                {suggestion}
              </BodyText>
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

export function ComboboxPage() {
  const [position, setPosition] = useState<ComboboxPosition>("bottom");
  const [size, setSize] = useState<ComboboxSize>("sm");
  const [withinPortal, setWithinPortal] = useState(false);
  const playgroundCode = `const store = useCombobox();

<Combobox
  store={store}
  position="${position}"
  size="${size}"
  withinPortal={${withinPortal}}
  onOptionSubmit={(value) => setFormula(value)}
>
  <Combobox.Target>
    <TextInput
      label="Formula"
      onClick={() => store.openDropdown()}
      onFocus={() => store.openDropdown()}
    />
  </Combobox.Target>
  <Combobox.Dropdown>
    <Combobox.Options>
      <Combobox.Option value="@transactions.sum()">
        @transactions.sum()
      </Combobox.Option>
    </Combobox.Options>
  </Combobox.Dropdown>
</Combobox>`;

  return (
    <section className={pageStyles.componentSection} id="combobox">
      <div className={pageStyles.sectionHeading}>
        <div>
          <BodyText
            className={pageStyles.eyebrow}
            component="p"
            ff="var(--bb-font-data)"
            fz="0.68rem"
            tone="muted"
          >
            Inputs
          </BodyText>
          <HeadingText level={2} tone="heading" lh={1.5}>
            Combobox
          </HeadingText>
        </div>
        <code>import {"{ Combobox, useCombobox }"} from '@teelur/budget-board-ui';</code>
      </div>
      <BodyText
        className={pageStyles.sectionCopy}
        component="p"
        m="1em 0"
        tone="muted"
      >
        Mantine's compound Combobox API with BBUI dropdown and option styling.
        Compose a custom input and suggestion list while keeping Mantine's
        keyboard, focus, and selection behavior.
      </BodyText>

      <ComponentDemoSection
        description="Use the compound parts to build custom suggestion experiences. Click the field to open the list, then choose an option."
        id="combobox-basic"
        title="Basic usage"
        code={`const store = useCombobox();

<Combobox store={store} onOptionSubmit={setFormula}>
  <Combobox.Target>
    <TextInput
      label="Formula"
      onClick={() => store.openDropdown()}
      onFocus={() => store.openDropdown()}
    />
  </Combobox.Target>
  <Combobox.Dropdown>
    <Combobox.Options>
      <Combobox.Option value="@transactions.sum()">
        @transactions.sum()
      </Combobox.Option>
    </Combobox.Options>
  </Combobox.Dropdown>
</Combobox>`}
      >
        <div style={{ maxWidth: "32rem", width: "100%" }}>
          <ComboboxPreview
            position="bottom"
            size="sm"
            withinPortal={false}
          />
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Change the dropdown position, option size, and portal behavior, then open the field to try the result."
        id="combobox-playground"
        title="API playground"
        code={playgroundCode}
      >
        <div style={{ display: "grid", gap: "1rem" }}>
          <div
            style={{
              display: "grid",
              gap: "0.75rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(10rem, 1fr))",
              maxWidth: "32rem",
            }}
          >
            <Select
              data={positions}
              label="Position"
              value={position}
              onChange={(nextPosition) => {
                if (positions.includes(nextPosition as ComboboxPosition)) {
                  setPosition(nextPosition as ComboboxPosition);
                }
              }}
            />
            <Select
              data={sizes}
              label="Size"
              value={size}
              onChange={(nextSize) => {
                if (sizes.includes(nextSize as ComboboxSize)) {
                  setSize(nextSize as ComboboxSize);
                }
              }}
            />
            <Checkbox
              checked={withinPortal}
              label="Render in portal"
              onChange={(event) => setWithinPortal(event.currentTarget.checked)}
            />
          </div>
          <div style={{ maxWidth: "32rem", width: "100%" }}>
            <ComboboxPreview
              position={position}
              size={size}
              withinPortal={withinPortal}
            />
          </div>
        </div>
      </ComponentDemoSection>

      <section
        className={pageStyles.componentReferenceSection}
        id="combobox-api"
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
              Mantine Combobox props and compound components with BBUI dropdown
              and option styles.
            </BodyText>
          </div>
          <a
            aria-label="Link to API reference section"
            className={demoStyles.componentDemoAnchor}
            href="#combobox-api"
          >
            #
          </a>
        </div>
        <div className={pageStyles.referenceGrid}>
          <div>
            <table>
              <tbody>
                <tr>
                  <th>store</th>
                  <td>
                    <code>ComboboxStore</code>
                  </td>
                  <td>
                    Optional state from <code>useCombobox()</code>; Mantine
                    creates an internal store when omitted.
                  </td>
                </tr>
                <tr>
                  <th>onOptionSubmit</th>
                  <td>
                    <code>
                      (value: string, optionProps: ComboboxOptionProps) =&gt;
                      void
                    </code>
                  </td>
                  <td>Called when an option is selected by click or Enter.</td>
                </tr>
                <tr>
                  <th>size / dropdownPadding</th>
                  <td>
                    <code>MantineSize | string</code> /{" "}
                    <code>CSSProperties["padding"]</code>
                  </td>
                  <td>Option density and dropdown padding; defaults to sm and 4.</td>
                </tr>
                <tr>
                  <th>position / withinPortal</th>
                  <td>
                    <code>Mantine Popover props</code>
                  </td>
                  <td>Dropdown positioning and portal behavior.</td>
                </tr>
                <tr>
                  <th>classNames / styles</th>
                  <td>
                    <code>ComboboxStylesNames</code>
                  </td>
                  <td>
                    Mantine styles API; BBUI supplies dropdown and option
                    defaults while preserving consumer overrides.
                  </td>
                </tr>
                <tr>
                  <th>compound components</th>
                  <td>
                    <code>Target, Dropdown, Options, Option, Search, Empty,</code>{" "}
                    and others
                  </td>
                  <td>
                    Mantine's complete compound API is exposed on{" "}
                    <code>Combobox</code>.
                  </td>
                </tr>
                <tr>
                  <th>useCombobox</th>
                  <td>
                    <code>(options?: UseComboboxOptions) =&gt; ComboboxStore</code>
                  </td>
                  <td>
                    BBUI re-exports Mantine's state hook for controlling
                    open/close state and keyboard navigation.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <pre className={pageStyles.codeBlock}>
            <code>{`const store = useCombobox();

<Combobox store={store} onOptionSubmit={handleSubmit}>
  <Combobox.Target>
    <TextInput label="Formula" />
  </Combobox.Target>
  <Combobox.Dropdown>
    <Combobox.Options>
      <Combobox.Option value="sum">Sum</Combobox.Option>
    </Combobox.Options>
  </Combobox.Dropdown>
</Combobox>`}</code>
          </pre>
        </div>
      </section>
    </section>
  );
}
