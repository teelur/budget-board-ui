import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Moon, Sun } from "lucide-react";
import { Button, budgetBoardColors, budgetBoardTypography } from "../src";
import type { ColorMode } from "./components/color/colorCardTypes";
import { ButtonPage } from "./pages/ButtonPage/ButtonPage";
import { ColorThemePage } from "./pages/ColorThemePage/ColorThemePage";
import { TypographyPage } from "./pages/TypographyPage/TypographyPage";
import styles from "./App.module.css";

function toCssName(name: string) {
  return name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

function getThemeStyle(colorMode: ColorMode): CSSProperties {
  const colors = budgetBoardColors[colorMode];
  const colorVariables = Object.fromEntries(
    Object.entries(colors).map(([name, value]) => [
      `--bb-color-${toCssName(name)}`,
      value,
    ]),
  );
  const fontVariables = Object.fromEntries(
    Object.entries(budgetBoardTypography).map(([name, value]) => [
      `--bb-font-${toCssName(name)}`,
      value,
    ]),
  );

  return {
    ...colorVariables,
    ...fontVariables,
    "--bb-color-text": colors.textPrimary,
    "--ink": colors.textPrimary,
    "--muted": colors.textMuted,
    "--line": colors.border,
    "--paper": colors.surface,
    "--data": budgetBoardTypography.data,
  } as CSSProperties;
}

export function App() {
  const [colorMode, setColorMode] = useState<ColorMode>("light");
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;

    if (!header) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsHeaderVisible(entry?.isIntersecting ?? false),
      { threshold: 0 },
    );

    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`${styles.siteShell}${isHeaderVisible ? "" : ` ${styles.headerHidden}`}`}
      data-color-mode={colorMode}
      style={getThemeStyle(colorMode)}
    >
      <header className={styles.siteHeader} ref={headerRef}>
        <div className={styles.brandMark}>BB</div>
        <div>
          <p className={styles.eyebrow}>Component library</p>
          <h1>Budget Board UI</h1>
        </div>
        <div className={styles.headerActions}>
          <Button
            className={styles.modeToggle}
            color="neutral"
            onClick={() =>
              setColorMode((mode) => (mode === "light" ? "dark" : "light"))
            }
            aria-label={`Current mode: ${colorMode}`}
            size="compact-md"
            title={`Current mode: ${colorMode}`}
            type="button"
            variant="ghost"
          >
            {colorMode === "light" ? <Sun size={17} /> : <Moon size={17} />}
          </Button>
          <a
            className={styles.sourceLink}
            href="https://github.com/teelur/budget-board-ui"
          >
            GitHub
          </a>
        </div>
      </header>

      <div className={styles.contentLayout}>
        <aside className={styles.sideNav} aria-label="Documentation navigation">
          <p className={styles.navHeading}>On this page</p>
          <a href="#overview">Overview</a>
          <a href="#color-theme">Color theme</a>
          <a href="#typography">Typography</a>
          <a href="#button">Button</a>
          <p className={`${styles.navHeading} ${styles.navHeadingSpaced}`}>
            Package
          </p>
          <code>@teelur/budget-board-ui</code>
        </aside>

        <main className={styles.mainContent}>
          <section className={styles.intro} id="overview">
            <p className={styles.eyebrow}>Budget Board UI</p>
            <h2>The building blocks behind Budget Board.</h2>
            <p className={styles.introCopy}>
              A reference for the components shipped by Budget Board UI. Browse
              the examples and public API in one place.
            </p>
            <div className={styles.introMeta}>
              <span>React 19</span>
              <span>Mantine 9</span>
              <span>TypeScript</span>
            </div>
          </section>

          <ColorThemePage colorMode={colorMode} />
          <TypographyPage />
          <ButtonPage />

          <footer className={styles.siteFooter}>
            @teelur/budget-board-ui · built for Budget Board
          </footer>
        </main>
      </div>
    </div>
  );
}
