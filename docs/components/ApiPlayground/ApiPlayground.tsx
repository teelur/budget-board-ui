import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { Checkbox, NumberInput, Select, TextInput } from "../../../src";
import { ComponentDemoSection } from "../ComponentDemoSection/ComponentDemoSection";
import styles from "./ApiPlayground.module.css";

type PlaygroundValue = string | number | boolean;
type PlaygroundValues = Record<string, PlaygroundValue>;

interface ApiPlaygroundControlBase {
  key: string;
  label: string;
  codeProp?: string;
  formatCode?: (value: PlaygroundValue) => string | null;
}

type ApiPlaygroundControl =
  | (ApiPlaygroundControlBase & {
      type: "select";
      options: readonly string[];
    })
  | (ApiPlaygroundControlBase & {
      type: "toggle";
    })
  | (ApiPlaygroundControlBase & {
      type: "text";
      placeholder?: string;
    })
  | (ApiPlaygroundControlBase & {
      type: "number" | "range";
      min?: number;
      max?: number;
      step?: number;
    });

interface ApiPlaygroundProps {
  id: string;
  description: string;
  componentName: string | ((values: PlaygroundValues) => string);
  controls: readonly ApiPlaygroundControl[];
  defaultValues: PlaygroundValues;
  staticCodeProps?: readonly string[];
  childrenCode?: string;
  previewStyle?: (values: PlaygroundValues) => CSSProperties | undefined;
  render: (values: PlaygroundValues) => ReactNode;
}

function formatCode(
  componentName: string,
  controls: readonly ApiPlaygroundControl[],
  values: PlaygroundValues,
  staticCodeProps: readonly string[],
  childrenCode?: string,
) {
  const controlProps = controls.flatMap((control) => {
    const value = values[control.key];

    if (value === undefined) {
      return [];
    }

    if (control.formatCode) {
      const formatted = control.formatCode(value);
      return formatted === null ? [] : [formatted];
    }

    const propName = control.codeProp ?? control.key;

    if (control.type === "toggle") {
      return value ? [propName] : [];
    }

    if (control.type === "number" || control.type === "range") {
      return [`${propName}={${value}}`];
    }

    return [`${propName}=${JSON.stringify(value)}`];
  });
  const props = [...staticCodeProps, ...controlProps];
  const openingTag =
    props.length === 0
      ? `<${componentName}`
      : `<${componentName}\n${props.map((prop) => `  ${prop}`).join("\n")}`;

  return childrenCode
    ? `${openingTag}>\n  ${childrenCode}\n</${componentName}>`
    : `${openingTag} />`;
}

export function ApiPlayground({
  id,
  description,
  componentName,
  controls,
  defaultValues,
  staticCodeProps = [],
  childrenCode,
  previewStyle,
  render,
}: ApiPlaygroundProps) {
  const [values, setValues] = useState(defaultValues);
  const currentComponentName =
    typeof componentName === "function" ? componentName(values) : componentName;
  const code = formatCode(
    currentComponentName,
    controls,
    values,
    staticCodeProps,
    childrenCode,
  );
  const currentPreviewStyle = previewStyle?.(values);

  return (
    <ComponentDemoSection
      description={description}
      id={id}
      title="API playground"
      code={code}
    >
      <div className={styles.playground}>
        <div className={styles.controls}>
          {controls.map((control) => {
            const value = values[control.key];

            if (value === undefined) {
              return null;
            }

            const update = (nextValue: PlaygroundValue) =>
              setValues((current) => ({
                ...current,
                [control.key]: nextValue,
              }));

            if (control.type === "toggle") {
              return (
                <Checkbox
                  checked={Boolean(value)}
                  key={control.key}
                  label={control.label}
                  onChange={(event) =>
                    update(event.currentTarget.checked)
                  }
                  size="xs"
                />
              );
            }

            if (control.type === "select") {
              return (
                <Select
                  data={control.options.map((option) => ({
                    label: option,
                    value: option,
                  }))}
                  key={control.key}
                  label={control.label}
                  onChange={(nextValue) => {
                    if (nextValue !== null) {
                      update(nextValue);
                    }
                  }}
                  size="xs"
                  value={String(value)}
                />
              );
            }

            if (control.type === "text") {
              return (
                <TextInput
                  key={control.key}
                  label={control.label}
                  onChange={(event) => update(event.currentTarget.value)}
                  placeholder={control.placeholder}
                  size="xs"
                  value={String(value)}
                />
              );
            }

            if (control.type === "number") {
              return (
                <NumberInput<number>
                  key={control.key}
                  label={control.label}
                  {...(control.max === undefined ? {} : { max: control.max })}
                  {...(control.min === undefined ? {} : { min: control.min })}
                  onChange={update}
                  size="xs"
                  {...(control.step === undefined
                    ? {}
                    : { step: control.step })}
                  value={Number(value)}
                />
              );
            }

            return (
              <label className={styles.field} key={control.key}>
                <span>{control.label}</span>
                <>
                  <input
                    aria-label={control.label}
                    max={control.max}
                    min={control.min}
                    onChange={(event) =>
                      update(Number(event.currentTarget.value))
                    }
                    step={control.step}
                    type="range"
                    value={String(value)}
                  />
                  <output>{value}</output>
                </>
              </label>
            );
          })}
        </div>
        <div className={styles.preview} style={currentPreviewStyle}>
          {render(values)}
        </div>
      </div>
    </ComponentDemoSection>
  );
}
