import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HeadlessMantineProvider } from "@mantine/core";
import { App } from "./App";
import { budgetBoardTheme } from "../src";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HeadlessMantineProvider theme={budgetBoardTheme}>
      <App />
    </HeadlessMantineProvider>
  </StrictMode>,
);
