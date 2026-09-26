import {
  useCallback,
  useContext,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { MantineContext, MantineProvider } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import {
  buttonColors,
  buttonVariants,
  getButtonVariantStyles,
} from "../shared/buttonStyles";
import type { ButtonColor, ButtonVariant } from "../shared/buttonStyles";
import { buttonSizes } from "../Button/Button";
import type { ButtonSize } from "../Button/Button";
import { budgetBoardColors } from "../colors";
import classes from "./SegmentedControl.module.css";

export { buttonColors as segmentedControlColors };
export { buttonVariants as segmentedControlVariants };
export { buttonSizes as segmentedControlSizes };

export interface SegmentedControlItem {
  value: string;
  label: ReactNode;
  disabled?: boolean;
  leftSection?: ReactNode;
}

export interface SegmentedControlProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "color" | "onChange" | "style"
  > {
  data: SegmentedControlItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  name?: string;
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  style?: CSSProperties;
}

export function SegmentedControl({
  className,
  color = "primary",
  data,
  defaultValue,
  disabled,
  fullWidth = false,
  name,
  onChange,
  size = "md",
  style,
  value,
  variant = "filled",
  ...groupProps
}: SegmentedControlProps) {
  const mantineContext = useContext(MantineContext);
  const systemColorScheme = useColorScheme("light");
  const colorScheme =
    mantineContext?.colorScheme === "auto"
      ? systemColorScheme
      : mantineContext?.colorScheme === "dark"
        ? "dark"
        : "light";

  const generatedName = useId();
  const groupName = name ?? generatedName;

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? data[0]?.value,
  );
  const currentValue = isControlled ? value : internalValue;

  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef(new Map<string, HTMLLabelElement>());
  const [indicatorRect, setIndicatorRect] = useState<{
    x: number;
    width: number;
  } | null>(null);

  const updateIndicator = useCallback(() => {
    const container = containerRef.current;
    const activeItem = currentValue
      ? itemRefs.current.get(currentValue)
      : undefined;

    if (!container || !activeItem) {
      setIndicatorRect(null);
      return;
    }

    setIndicatorRect({
      x: activeItem.offsetLeft,
      width: activeItem.offsetWidth,
    });
  }, [currentValue]);

  useLayoutEffect(() => {
    updateIndicator();
  }, [updateIndicator, data]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || typeof ResizeObserver === "undefined") {
      return;
    }

    const observer = new ResizeObserver(() => updateIndicator());
    observer.observe(container);

    return () => observer.disconnect();
  }, [updateIndicator]);

  function handleChange(itemValue: string) {
    if (!isControlled) {
      setInternalValue(itemValue);
    }
    onChange?.(itemValue);
  }

  const control = (
    <div
      {...groupProps}
      className={[
        classes.root,
        classes[size],
        fullWidth && classes.fullWidth,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-budget-board-color={color}
      data-budget-board-size={size}
      data-budget-board-variant={variant}
      ref={containerRef}
      role="radiogroup"
      style={
        {
          ...getButtonVariantStyles(budgetBoardColors[colorScheme], color, variant),
          "--bbui-segmented-track-bg": `var(--bb-color-surface-sunken, ${budgetBoardColors[colorScheme].surfaceSunken})`,
          ...style,
        } as CSSProperties
      }
    >
      <span
        aria-hidden="true"
        className={classes.indicator}
        style={{
          opacity: indicatorRect ? 1 : 0,
          transform: `translateX(${indicatorRect?.x ?? 0}px)`,
          width: indicatorRect ? `${indicatorRect.width}px` : 0,
        }}
      />
      {data.map((item) => {
        const itemDisabled = disabled || item.disabled;

        return (
          <label
            className={classes.item}
            data-disabled={itemDisabled ? "true" : undefined}
            key={item.value}
            ref={(el) => {
              if (el) {
                itemRefs.current.set(item.value, el);
              } else {
                itemRefs.current.delete(item.value);
              }
            }}
          >
            <input
              checked={currentValue === item.value}
              className={classes.input}
              disabled={itemDisabled}
              name={groupName}
              onChange={() => handleChange(item.value)}
              type="radio"
              value={item.value}
            />
            <span className={classes.content}>
              {item.leftSection && (
                <span className={classes.section}>{item.leftSection}</span>
              )}
              {item.label}
            </span>
          </label>
        );
      })}
    </div>
  );

  return mantineContext ? control : <MantineProvider>{control}</MantineProvider>;
}
