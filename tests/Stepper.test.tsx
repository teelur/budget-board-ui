import { createRef } from "react";
import { MantineProvider, Stepper as MantineStepper } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Stepper } from "../src/Stepper/Stepper";
import classes from "../src/Stepper/Stepper.module.css";
import { budgetBoardDarkTheme } from "../src/theme";

describe("Stepper", () => {
  it("exposes Mantine compound components and renders BBUI styling", () => {
    render(
      <MantineProvider env="test">
        <Stepper active={0} data-testid="stepper">
          <Stepper.Step description="Set up your profile" label="Account">
            Account details
          </Stepper.Step>
          <Stepper.Step label="Review">Review details</Stepper.Step>
          <Stepper.Completed>All steps complete</Stepper.Completed>
        </Stepper>
      </MantineProvider>,
    );

    const root = screen.getByTestId("stepper");

    expect(Stepper.Step).toBe(MantineStepper.Step);
    expect(Stepper.Completed).toBe(MantineStepper.Completed);
    expect(root).toHaveClass(classes.root);
    expect(root.style.getPropertyValue("--stepper-color")).toBe(
      "var(--bb-color-primary, #4263eb)",
    );
    expect(root.style.getPropertyValue("--stepper-outline-color")).toBe(
      "var(--bbui-stepper-border)",
    );
    expect(root.style.getPropertyValue("--bbui-stepper-border")).toBe(
      "var(--bb-color-border-subtle, #d8d5ce)",
    );
    expect(root.style.getPropertyValue("--bbui-stepper-text")).toBe(
      "var(--bb-color-text-primary, #3a3834)",
    );
    expect(screen.getByRole("button", { name: /Account/ })).toHaveClass(
      classes.step,
    );
    expect(screen.getByText("Account details")).toBeInTheDocument();
  });

  it("uses the dark palette for its fallback colors", () => {
    render(
      <MantineProvider
        env="test"
        forceColorScheme="dark"
        theme={budgetBoardDarkTheme}
      >
        <Stepper active={0} data-testid="dark-stepper">
          <Stepper.Step label="Account">Account details</Stepper.Step>
        </Stepper>
      </MantineProvider>,
    );

    const root = screen.getByTestId("dark-stepper");

    expect(root.style.getPropertyValue("--stepper-color")).toBe(
      "var(--bb-color-primary, #91a7ff)",
    );
    expect(root.style.getPropertyValue("--stepper-icon-color")).toBe(
      "var(--bb-color-primary-content, #1e2450)",
    );
    expect(root.style.getPropertyValue("--stepper-outline-color")).toBe(
      "var(--bbui-stepper-border)",
    );
    expect(root.style.getPropertyValue("--bbui-stepper-border")).toBe(
      "var(--bb-color-border-subtle, #3a3d42)",
    );
    expect(root.style.getPropertyValue("--bbui-stepper-text")).toBe(
      "var(--bb-color-text-primary, #d8d5ce)",
    );
  });

  it("forwards its root ref and renders the completion panel", () => {
    const ref = createRef<HTMLDivElement>();

    render(
      <Stepper active={1} data-testid="completed-stepper" ref={ref}>
        <Stepper.Step label="Account">Account details</Stepper.Step>
        <Stepper.Completed>All steps complete</Stepper.Completed>
      </Stepper>,
    );

    expect(ref.current).toBe(screen.getByTestId("completed-stepper"));
    expect(screen.getByText("All steps complete")).toBeInTheDocument();
  });

  it("preserves consumer class names and styles while merging BBUI defaults", () => {
    const classNames = vi.fn(() => ({
      root: "consumer-root",
      step: "consumer-step",
    }));
    const styles = vi.fn(() => ({
      root: { opacity: 0.8 },
    }));

    render(
      <MantineProvider env="test">
        <Stepper
          active={0}
          classNames={classNames}
          data-testid="custom-stepper"
          styles={styles}
        >
          <Stepper.Step label="Account">Account details</Stepper.Step>
        </Stepper>
      </MantineProvider>,
    );

    const root = screen.getByTestId("custom-stepper");

    expect(classNames).toHaveBeenCalled();
    expect(styles).toHaveBeenCalled();
    expect(root).toHaveClass(classes.root, "consumer-root");
    expect(root).toHaveStyle({ opacity: "0.8" });
    expect(root.style.getPropertyValue("--stepper-color")).toBe(
      "var(--bb-color-primary, #4263eb)",
    );
    expect(
      screen.getByRole("button", { name: /Account/ }),
    ).toHaveClass(classes.step, "consumer-step");
  });

  it("preserves Mantine color overrides and controlled step selection", async () => {
    const user = userEvent.setup();
    const onStepClick = vi.fn();

    render(
      <MantineProvider env="test">
        <Stepper
          active={0}
          color="tomato"
          data-testid="custom-color-stepper"
          onStepClick={onStepClick}
        >
          <Stepper.Step label="Account">Account details</Stepper.Step>
          <Stepper.Step label="Review">Review details</Stepper.Step>
        </Stepper>
      </MantineProvider>,
    );

    expect(
      screen
        .getByTestId("custom-color-stepper")
        .style.getPropertyValue("--stepper-color"),
    ).toBe("tomato");

    await user.click(screen.getByRole("button", { name: /Review/ }));

    expect(onStepClick).toHaveBeenCalledWith(1);
    expect(screen.getByText("Account details")).toBeInTheDocument();
  });
});
