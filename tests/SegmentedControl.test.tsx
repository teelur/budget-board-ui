import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MantineProvider } from "@mantine/core";
import { describe, expect, it, vi } from "vitest";
import { SegmentedControl } from "../src/SegmentedControl/SegmentedControl";
import { budgetBoardDarkTheme } from "../src/theme";

const data = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
];

describe("SegmentedControl", () => {
  it("renders a radiogroup with one radio per item, defaulting to the first item", () => {
    render(<SegmentedControl data={data} />);

    const group = screen.getByRole("radiogroup");
    expect(group).toHaveAttribute("data-budget-board-color", "primary");
    expect(group).toHaveAttribute("data-budget-board-variant", "filled");
    expect(group).toHaveAttribute("data-budget-board-size", "md");

    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(3);
    expect(screen.getByRole("radio", { name: "Day" })).toBeChecked();
  });

  it("supports uncontrolled usage via defaultValue", async () => {
    const user = userEvent.setup();
    render(<SegmentedControl data={data} defaultValue="week" />);

    expect(screen.getByRole("radio", { name: "Week" })).toBeChecked();

    await user.click(screen.getByRole("radio", { name: "Month" }));

    expect(screen.getByRole("radio", { name: "Month" })).toBeChecked();
  });

  it("supports controlled usage via value and onChange", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    const { rerender } = render(
      <SegmentedControl data={data} onChange={onChange} value="day" />,
    );

    await user.click(screen.getByRole("radio", { name: "Week" }));

    expect(onChange).toHaveBeenCalledWith("week");
    expect(screen.getByRole("radio", { name: "Day" })).toBeChecked();

    rerender(<SegmentedControl data={data} onChange={onChange} value="week" />);

    expect(screen.getByRole("radio", { name: "Week" })).toBeChecked();
  });

  it("disables every segment when the control is disabled", () => {
    render(<SegmentedControl data={data} disabled />);

    for (const radio of screen.getAllByRole("radio")) {
      expect(radio).toBeDisabled();
    }
  });

  it("disables only the segments marked as disabled", () => {
    render(
      <SegmentedControl
        data={[
          { value: "day", label: "Day" },
          { value: "week", label: "Week", disabled: true },
        ]}
      />,
    );

    expect(screen.getByRole("radio", { name: "Day" })).toBeEnabled();
    expect(screen.getByRole("radio", { name: "Week" })).toBeDisabled();
  });

  it("renders a leftSection alongside the label", () => {
    render(
      <SegmentedControl
        data={[
          {
            value: "day",
            label: "Day",
            leftSection: <span data-testid="icon">*</span>,
          },
        ]}
      />,
    );

    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("supports every public size", () => {
    const sizes = [
      "compact-xs",
      "compact-sm",
      "compact-md",
      "compact-lg",
      "compact-xl",
      "xs",
      "sm",
      "md",
      "lg",
      "xl",
    ] as const;

    render(
      <>
        {sizes.map((size) => (
          <SegmentedControl data={data} key={size} size={size} />
        ))}
      </>,
    );

    const groups = screen.getAllByRole("radiogroup");
    expect(groups).toHaveLength(sizes.length);

    groups.forEach((group, index) => {
      expect(group).toHaveAttribute("data-budget-board-size", sizes[index]);
    });
  });

  it("applies fullWidth styling", () => {
    render(<SegmentedControl data={data} fullWidth />);

    expect(screen.getByRole("radiogroup").className).toContain("fullWidth");
  });

  it("resolves the contrast color from the active color scheme", () => {
    render(<SegmentedControl color="contrast" data={data} />);

    const group = screen.getByRole("radiogroup");

    expect(group.style.getPropertyValue("--bbui-button-bg")).toBe(
      "var(--budget-board-button-contrast-background, var(--bb-color-contrast, #242321))",
    );
  });

  it("resolves the contrast color in dark mode", () => {
    render(
      <MantineProvider forceColorScheme="dark" theme={budgetBoardDarkTheme}>
        <SegmentedControl color="contrast" data={data} />
      </MantineProvider>,
    );

    const group = screen.getByRole("radiogroup");

    expect(group.style.getPropertyValue("--bbui-button-bg")).toBe(
      "var(--budget-board-button-contrast-background, var(--bb-color-contrast, #f2f0eb))",
    );
  });
});
