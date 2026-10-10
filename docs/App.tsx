import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { MantineProvider } from "@mantine/core";
import { Moon, Sun } from "lucide-react";
import {
  Button,
  budgetBoardColors,
  budgetBoardDarkTheme,
  budgetBoardTheme,
  budgetBoardTypography,
} from "../src";
import type { ColorMode } from "./components/color/colorCardTypes";
import { ActionIconPage } from "./pages/ActionIconPage/ActionIconPage";
import { AmountTextPage } from "./pages/AmountTextPage/AmountTextPage";
import { AppShellPage } from "./pages/AppShellPage/AppShellPage";
import { AutocompletePage } from "./pages/AutocompletePage/AutocompletePage";
import { BadgePage } from "./pages/BadgePage/BadgePage";
import { ButtonPage } from "./pages/ButtonPage/ButtonPage";
import { CardPage } from "./pages/CardPage/CardPage";
import { CheckboxPage } from "./pages/CheckboxPage/CheckboxPage";
import { CategorySelectPage } from "./pages/CategorySelectPage/CategorySelectPage";
import { ColorThemePage } from "./pages/ColorThemePage/ColorThemePage";
import { DateInputPage } from "./pages/DateInputPage/DateInputPage";
import { DatePickerInputPage } from "./pages/DatePickerInputPage/DatePickerInputPage";
import { FileInputPage } from "./pages/FileInputPage/FileInputPage";
import { MonthPickerInputPage } from "./pages/MonthPickerInputPage/MonthPickerInputPage";
import { MultiSelectPage } from "./pages/MultiSelectPage/MultiSelectPage";
import { NavbarLinkPage } from "./pages/NavbarLinkPage/NavbarLinkPage";
import { NumberInputPage } from "./pages/NumberInputPage/NumberInputPage";
import { PasswordInputPage } from "./pages/PasswordInputPage/PasswordInputPage";
import { PinInputPage } from "./pages/PinInputPage/PinInputPage";
import { ProgressPage } from "./pages/ProgressPage/ProgressPage";
import { SegmentedControlPage } from "./pages/SegmentedControlPage/SegmentedControlPage";
import { SelectPage } from "./pages/SelectPage/SelectPage";
import { TextInputPage } from "./pages/TextInputPage/TextInputPage";
import { TextareaPage } from "./pages/TextareaPage/TextareaPage";
import { TagsInputPage } from "./pages/TagsInputPage/TagsInputPage";
import { TextComponentsPage } from "./pages/TextComponentsPage/TextComponentsPage";
import { TypographyPage } from "./pages/TypographyPage/TypographyPage";
import styles from "./App.module.css";
import { BodyText, HeadingText } from "../src";

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
    <MantineProvider
      forceColorScheme={colorMode}
      theme={colorMode === "dark" ? budgetBoardDarkTheme : budgetBoardTheme}
    >
      <div
        className={`${styles.siteShell}${isHeaderVisible ? "" : ` ${styles.headerHidden}`}`}
        data-color-mode={colorMode}
        style={getThemeStyle(colorMode)}
      >
        <header className={styles.siteHeader} ref={headerRef}>
          <div className={styles.brandMark}>BB</div>
          <div>
            <BodyText component="p" className={styles.eyebrow}>
              Component library
            </BodyText>
            <HeadingText level={1}>Budget Board UI</HeadingText>
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
          <aside
            className={styles.sideNav}
            aria-label="Documentation navigation"
          >
            <BodyText component="p" className={styles.navHeading}>
              On this page
            </BodyText>
            <a href="#overview">Overview</a>
            <div className={styles.navGroup}>
              <BodyText component="p" className={styles.navGroupHeading}>
                Design
              </BodyText>
              <a href="#color-theme">Color theme</a>
              <a href="#typography">Typography</a>
            </div>
            <div className={styles.navGroup}>
              <BodyText component="p" className={styles.navGroupHeading}>
                Components
              </BodyText>
              <a href="#action-icon">ActionIcon</a>
              <a href="#amount-text">AmountText</a>
              <a href="#app-shell">AppShell</a>
              <a href="#autocomplete">Autocomplete</a>
              <a href="#badge">Badge</a>
              <a href="#button">Button</a>
              <a href="#card">Card</a>
              <a href="#checkbox">Checkbox</a>
              <a href="#category-select">CategorySelect</a>
              <a href="#date-input">DateInput</a>
              <a href="#date-picker-input">DatePickerInput</a>
              <a href="#file-input">FileInput</a>
              <a href="#multi-select">MultiSelect</a>
              <a href="#month-picker-input">MonthPickerInput</a>
              <a href="#navbar-link">NavbarLink</a>
              <a href="#number-input">NumberInput</a>
              <a href="#password-input">PasswordInput</a>
              <a href="#pin-input">PinInput</a>
              <a href="#progress">Progress</a>
              <a href="#segmented-control">SegmentedControl</a>
              <a href="#select">Select</a>
              <a href="#text-components">Text components</a>
              <a href="#text-input">TextInput</a>
              <a href="#tags-input">TagsInput</a>
              <a href="#textarea">Textarea</a>
            </div>
            <BodyText
              component="p"
              className={`${styles.navHeading} ${styles.navHeadingSpaced}`}
            >
              Package
            </BodyText>
            <code>@teelur/budget-board-ui</code>
          </aside>

          <main className={styles.mainContent}>
            <section className={styles.intro} id="overview">
              <BodyText component="p" className={styles.eyebrow}>
                Budget Board UI
              </BodyText>
              <HeadingText level={2}>
                The building blocks behind Budget Board.
              </HeadingText>
              <BodyText component="p" className={styles.introCopy}>
                A reference for the components shipped by Budget Board UI.
                Browse the examples and public API in one place.
              </BodyText>
              <div className={styles.introMeta}>
                <BodyText component="span">React 19</BodyText>
                <BodyText component="span">Mantine 9</BodyText>
                <BodyText component="span">TypeScript</BodyText>
              </div>
            </section>

            <section className={styles.docsSection} id="design">
              <div className={styles.docsSectionHeading}>
                <BodyText component="p" className={styles.eyebrow}>
                  Visual language
                </BodyText>
                <HeadingText level={2}>Design</HeadingText>
                <BodyText component="p">
                  The shared color and type decisions that give Budget Board a
                  consistent visual rhythm.
                </BodyText>
              </div>
              <ColorThemePage colorMode={colorMode} />
              <TypographyPage />
            </section>

            <section className={styles.docsSection} id="components">
              <div className={styles.docsSectionHeading}>
                <BodyText component="p" className={styles.eyebrow}>
                  Interface building blocks
                </BodyText>
                <HeadingText level={2}>Components</HeadingText>
                <BodyText component="p">
                  Interface primitives with live examples, states, and API
                  references.
                </BodyText>
              </div>
              <ActionIconPage />
              <AmountTextPage />
              <AppShellPage />
              <AutocompletePage />
              <BadgePage />
              <ButtonPage />
              <CardPage />
              <CheckboxPage />
              <CategorySelectPage />
              <DateInputPage />
              <DatePickerInputPage />
              <FileInputPage />
              <MultiSelectPage />
              <NavbarLinkPage />
              <TagsInputPage />
              <TextComponentsPage />
              <MonthPickerInputPage />
              <NumberInputPage />
              <PasswordInputPage />
              <PinInputPage />
              <TextInputPage />
              <TextareaPage />
              <ProgressPage />
              <SegmentedControlPage />
              <SelectPage />
            </section>

            <footer className={styles.siteFooter}>
              @teelur/budget-board-ui · built for Budget Board
            </footer>
          </main>
        </div>
      </div>
    </MantineProvider>
  );
}
