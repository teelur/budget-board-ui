import { useState } from "react";
import {
  BodyText,
  Button,
  Checkbox,
  HeadingText,
  SegmentedControl,
  Stepper,
} from "../../../src";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import demoStyles from "../../components/ComponentDemoSection/ComponentDemoSection.module.css";
import pageStyles from "../Page.module.css";
import styles from "./StepperPage.module.css";

const stepItems = [
  {
    description: "Create your account",
    label: "Account",
    content: "Enter the details needed to set up your account.",
  },
  {
    description: "Add your preferences",
    label: "Preferences",
    content: "Choose how you want your budget organized.",
  },
  {
    description: "Review your setup",
    label: "Review",
    content: "Check your choices before finishing setup.",
  },
] as const;

type StepperOrientation = "horizontal" | "vertical";

const orientations: { label: string; value: StepperOrientation }[] = [
  { label: "Horizontal", value: "horizontal" },
  { label: "Vertical", value: "vertical" },
];

const stepperSizes = ["xs", "sm", "md", "lg", "xl"] as const;

type StepperSize = (typeof stepperSizes)[number];

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function getStepContents() {
  return [
    ...stepItems.map((step) => (
      <Stepper.Step
        description={step.description}
        key={step.label}
        label={step.label}
      >
        {step.content}
      </Stepper.Step>
    )),
    <Stepper.Completed key="completed">
      <BodyText component="p" tone="secondary">
        Setup is complete. You can now start using your budget.
      </BodyText>
    </Stepper.Completed>,
  ];
}

export function StepperPage() {
  const [basicActive, setBasicActive] = useState(0);
  const [playgroundActive, setPlaygroundActive] = useState(1);
  const [orientation, setOrientation] =
    useState<StepperOrientation>("horizontal");
  const [size, setSize] = useState<StepperSize>("md");
  const [allowNextStepsSelect, setAllowNextStepsSelect] = useState(true);

  const playgroundCode = `<Stepper
  active={${playgroundActive}}
  allowNextStepsSelect={${allowNextStepsSelect}}
  onStepClick={setPlaygroundActive}
  orientation="${orientation}"
  size="${size}"
>
  <Stepper.Step label="Account" description="Create your account">
    Account details
  </Stepper.Step>
  <Stepper.Step label="Preferences" description="Add your preferences">
    Budget preferences
  </Stepper.Step>
  <Stepper.Step label="Review" description="Review your setup">
    Review your choices
  </Stepper.Step>
  <Stepper.Completed>Setup is complete</Stepper.Completed>
</Stepper>`;

  return (
    <section className={pageStyles.componentSection} id="stepper">
      <div className={pageStyles.sectionHeading}>
        <div>
          <BodyText
            className={pageStyles.eyebrow}
            component="p"
            fz="0.68rem"
            ff="var(--bb-font-data)"
            tone="muted"
          >
            Navigation
          </BodyText>
          <HeadingText level={2} lh={1.5} tone="heading">
            Stepper
          </HeadingText>
        </div>
        <code>import {"{ Stepper }"} from '@teelur/budget-board-ui';</code>
      </div>
      <BodyText
        className={pageStyles.sectionCopy}
        component="p"
        m="1em 0"
        tone="muted"
      >
        A themed Mantine stepper for multi-stage flows. The compound
        Stepper.Step and Stepper.Completed components, navigation behavior, and
        layout props are preserved.
      </BodyText>

      <ComponentDemoSection
        description="Control the active step with state and render a completion view after the last step."
        id="stepper-basic"
        title="Basic usage"
        code={`const [active, setActive] = useState(0);

<Stepper active={active} onStepClick={setActive}>
  <Stepper.Step label="Account" description="Create your account">
    Account details
  </Stepper.Step>
  <Stepper.Step label="Preferences" description="Add your preferences">
    Budget preferences
  </Stepper.Step>
  <Stepper.Step label="Review" description="Review your setup">
    Review your choices
  </Stepper.Step>
  <Stepper.Completed>Setup is complete</Stepper.Completed>
</Stepper>`}
      >
        <div className={styles.stepperStack}>
          <Stepper active={basicActive} onStepClick={setBasicActive} w="100%">
            {getStepContents()}
          </Stepper>
          <div className={styles.actions}>
            <Button
              disabled={basicActive === 0}
              onClick={() => setBasicActive((active) => active - 1)}
              variant="outline"
            >
              Back
            </Button>
            <Button
              disabled={basicActive > stepItems.length - 1}
              onClick={() => setBasicActive((active) => active + 1)}
            >
              {basicActive === stepItems.length - 1 ? "Finish" : "Next"}
            </Button>
          </div>
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Choose horizontal or vertical layout to match the available space and flow."
        id="stepper-orientations"
        title="Orientations"
        code={`<Stepper active={1}>
  <Stepper.Step label="Account" description="Create your account">
    Account details
  </Stepper.Step>
  <Stepper.Step label="Preferences" description="Add your preferences">
    Budget preferences
  </Stepper.Step>
</Stepper>

<Stepper active={1} orientation="vertical">...</Stepper>`}
      >
        <div className={styles.orientationGrid}>
          {orientations.map(({ label, value }) => (
            <div className={styles.orientationCard} key={value}>
              <BodyText
                className={styles.orientationLabel}
                component="p"
                tone="secondary"
              >
                {label}
              </BodyText>
              <Stepper active={1} orientation={value} size="sm">
                <Stepper.Step
                  description="Create your account"
                  label="Account"
                >
                  Account details
                </Stepper.Step>
                <Stepper.Step
                  description="Add your preferences"
                  label="Preferences"
                >
                  Budget preferences
                </Stepper.Step>
                <Stepper.Step description="Review your setup" label="Review">
                  Review your choices
                </Stepper.Step>
              </Stepper>
            </div>
          ))}
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Adjust the orientation, size, and step selection behavior to inspect the public API."
        id="stepper-playground"
        title="Playground"
        code={playgroundCode}
      >
        <div className={styles.playground}>
          <div className={styles.controls}>
            <div className={styles.field}>
              <BodyText component="span" tone="secondary">
                Orientation
              </BodyText>
              <SegmentedControl
                aria-label="Stepper orientation"
                data={orientations}
                onChange={(value) =>
                  setOrientation(value as StepperOrientation)
                }
                value={orientation}
              />
            </div>
            <label className={styles.field}>
              <BodyText component="span" tone="secondary">
                Size
              </BodyText>
              <select
                onChange={(event) =>
                  setSize(event.target.value as StepperSize)
                }
                value={size}
              >
                {stepperSizes.map((stepperSize) => (
                  <option key={stepperSize} value={stepperSize}>
                    {capitalize(stepperSize)}
                  </option>
                ))}
              </select>
            </label>
            <Checkbox
              checked={allowNextStepsSelect}
              label="Allow selecting upcoming steps"
              onChange={(event) =>
                setAllowNextStepsSelect(event.currentTarget.checked)
              }
              size="xs"
            />
          </div>
          <div className={styles.preview}>
            <Stepper
              active={playgroundActive}
              allowNextStepsSelect={allowNextStepsSelect}
              onStepClick={setPlaygroundActive}
              orientation={orientation}
              size={size}
              w="100%"
            >
              {getStepContents()}
            </Stepper>
          </div>
        </div>
      </ComponentDemoSection>

      <section
        className={pageStyles.componentReferenceSection}
        id="stepper-api"
      >
        <div className={demoStyles.componentDemoHeading}>
          <div>
            <HeadingText level={3} lh={1.5} tone="heading">
              API reference
            </HeadingText>
            <BodyText
              component="p"
              fz="0.82rem"
              lh={1.55}
              m="0.45rem 0 0"
              tone="secondary"
            >
              Mantine Stepper props are forwarded; the listed defaults describe
              this wrapper.
            </BodyText>
          </div>
          <a
            aria-label="Link to API reference section"
            className={demoStyles.componentDemoAnchor}
            href="#stepper-api"
          >
            #
          </a>
        </div>
        <div className={pageStyles.referenceGrid}>
          <div>
            <table>
              <tbody>
                {[
                  ["active", "number", "required; zero-based active step"],
                  ["children", "ReactNode", "Stepper.Step and optional Completed"],
                  ["onStepClick", "(stepIndex: number) => void", "-"],
                  ["allowNextStepsSelect", "boolean", "true"],
                  ["orientation", '"horizontal" | "vertical"', "horizontal"],
                  ["labelPosition", '"right" | "bottom"', "right"],
                  ["iconPosition", '"left" | "right"', "left"],
                  ["size", "MantineSize", "md"],
                  [
                    "color",
                    "Mantine theme color or CSS color",
                    "BBUI primary palette color",
                  ],
                  ["icon", "ReactNode | (step) => ReactNode", "step index + 1"],
                  ["progressIcon", "ReactNode | (step) => ReactNode", "step index + 1"],
                  ["completedIcon", "ReactNode | (step) => ReactNode", "check icon"],
                  ["iconSize", "number | string", "inferred from size"],
                  ["contentPadding", "MantineSpacing | CSS value", "md"],
                  ["radius", "MantineRadius | CSS value", "xl"],
                  ["wrap", "boolean", "true"],
                  ["autoContrast", "boolean", "false"],
                  ["keepMounted", "boolean", "false"],
                  ["className", "string", "-"],
                  ["classNames", "StepperStylesNames mapping", "-; merged with BBUI classes"],
                  ["styles", "StepperStylesNames mapping", "-; merged with BBUI styles"],
                  ["style", "CSSProperties", "forwarded to the root"],
                ].map(([name, type, defaultValue]) => (
                  <tr key={name}>
                    <th>{name}</th>
                    <td>
                      <code>{type}</code>
                    </td>
                    <td>{defaultValue}</td>
                  </tr>
                ))}
                <tr>
                  <th>Stepper.Step</th>
                  <td>
                    <code>StepperStepProps</code>
                  </td>
                  <td>
                    Supports label, description, children, icon,
                    completedIcon, progressIcon, color, withIcon, loading,
                    allowStepClick, and allowStepSelect. Step and state are set
                    by Stepper.
                  </td>
                </tr>
                <tr>
                  <th>Stepper.Completed</th>
                  <td>
                    <code>children: ReactNode</code>
                  </td>
                  <td>Rendered when active is past the final step</td>
                </tr>
              </tbody>
            </table>
          </div>
          <pre className={pageStyles.codeBlock}>
            <code>{`<Stepper active={active} onStepClick={setActive}>
  <Stepper.Step label="Account" description="Create your account">
    Account details
  </Stepper.Step>
  <Stepper.Completed>Setup is complete</Stepper.Completed>
</Stepper>`}</code>
          </pre>
        </div>
      </section>
    </section>
  );
}
