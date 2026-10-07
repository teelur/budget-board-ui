import { createElement, useContext } from "react";
import type { ReactElement } from "react";
import { MantineContext, MantineProvider } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import { budgetBoardColors } from "../colors";
import { budgetBoardDarkTheme, budgetBoardTheme } from "../theme";

export function useBBUITheme() {
  const mantineContext = useContext(MantineContext);
  const systemColorScheme = useColorScheme("light");
  const colorScheme =
    mantineContext?.colorScheme === "auto"
      ? systemColorScheme
      : mantineContext?.colorScheme === "dark"
        ? "dark"
        : "light";

  return {
    colorScheme,
    colors: budgetBoardColors[colorScheme],
    hasMantineContext: mantineContext !== null,
  };
}

export function ensureBBUIMantineProvider(
  element: ReactElement,
  hasMantineContext: boolean,
  colorScheme: "light" | "dark",
): ReactElement {
  return hasMantineContext
    ? element
    : createElement(
        MantineProvider,
        {
          forceColorScheme: colorScheme,
          theme:
            colorScheme === "dark" ? budgetBoardDarkTheme : budgetBoardTheme,
        },
        element,
      );
}
