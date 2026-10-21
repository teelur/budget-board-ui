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
import { AlertPage } from "./pages/AlertPage/AlertPage";
import { ActionIconPage } from "./pages/ActionIconPage/ActionIconPage";
import { AmountTextPage } from "./pages/AmountTextPage/AmountTextPage";
import { AppShellPage } from "./pages/AppShellPage/AppShellPage";
import { AutocompletePage } from "./pages/AutocompletePage/AutocompletePage";
import { BadgePage } from "./pages/BadgePage/BadgePage";
import { ButtonPage } from "./pages/ButtonPage/ButtonPage";
import { CardPage } from "./pages/CardPage/CardPage";
import { CheckboxPage } from "./pages/CheckboxPage/CheckboxPage";
import { CategorySelectPage } from "./pages/CategorySelectPage/CategorySelectPage";
import { ComboboxPage } from "./pages/ComboboxPage/ComboboxPage";
import { CollapsibleCardPage } from "./pages/CollapsibleCardPage/CollapsibleCardPage";
import { CodePage } from "./pages/CodePage/CodePage";
import { ColorThemePage } from "./pages/ColorThemePage/ColorThemePage";
import { DateInputPage } from "./pages/DateInputPage/DateInputPage";
import { DatePickerInputPage } from "./pages/DatePickerInputPage/DatePickerInputPage";
import { DividerPage } from "./pages/DividerPage/DividerPage";
import { DrawerPage } from "./pages/DrawerPage/DrawerPage";
import { FileInputPage } from "./pages/FileInputPage/FileInputPage";
import { MonthPickerInputPage } from "./pages/MonthPickerInputPage/MonthPickerInputPage";
import { MonthToolcardsPage } from "./pages/MonthToolcardsPage/MonthToolcardsPage";
import { ModalPage } from "./pages/ModalPage/ModalPage";
import { MultiSelectPage } from "./pages/MultiSelectPage/MultiSelectPage";
import { NavbarLinkPage } from "./pages/NavbarLinkPage/NavbarLinkPage";
import { NotificationPage } from "./pages/NotificationPage/NotificationPage";
import { NumberInputPage } from "./pages/NumberInputPage/NumberInputPage";
import { PasswordInputPage } from "./pages/PasswordInputPage/PasswordInputPage";
import { PaginationPage } from "./pages/PaginationPage/PaginationPage";
import { PinInputPage } from "./pages/PinInputPage/PinInputPage";
import { PopoverPage } from "./pages/PopoverPage/PopoverPage";
import { ProgressPage } from "./pages/ProgressPage/ProgressPage";
import { LoadingOverlayPage } from "./pages/LoadingOverlayPage/LoadingOverlayPage";
import { SkeletonPage } from "./pages/SkeletonPage/SkeletonPage";
import { SegmentedControlPage } from "./pages/SegmentedControlPage/SegmentedControlPage";
import { SelectPage } from "./pages/SelectPage/SelectPage";
import { SpendingCategoriesChartPage } from "./pages/SpendingCategoriesChartPage/SpendingCategoriesChartPage";
import { StepperPage } from "./pages/StepperPage/StepperPage";
import { TablePage } from "./pages/TablePage/TablePage";
import { TextInputPage } from "./pages/TextInputPage/TextInputPage";
import { TextareaPage } from "./pages/TextareaPage/TextareaPage";
import { TooltipPage } from "./pages/TooltipPage/TooltipPage";
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
            <BodyText component="p" size="xxs" tone="muted" tt="uppercase">
              Component library
            </BodyText>
            <HeadingText level={1} tone="heading" lh="h1">
              Budget Board UI
            </HeadingText>
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
            <BodyText component="p" tone="heading" size="xs" tt="uppercase">
              On this page
            </BodyText>
            <a href="#overview">Overview</a>
            <div className={styles.navGroup}>
              <BodyText
                className={styles.navGroupHeading}
                component="p"
                tone="heading"
                size="xxs"
                tt="uppercase"
              >
                Design
              </BodyText>
              <a href="#color-theme">Color theme</a>
              <a href="#typography">Typography</a>
            </div>
            <div className={styles.navGroup}>
              <BodyText component="p" tone="heading" size="xxs" tt="uppercase">
                Components
              </BodyText>
              <div className={styles.navCategory}>
                <a className={styles.navCategoryHeading} href="#actions-navigation">
                  Actions &amp; navigation
                </a>
                <a href="#action-icon">ActionIcon</a>
                <a href="#button">Button</a>
                <a href="#navbar-link">NavbarLink</a>
                <a href="#pagination">Pagination</a>
                <a href="#segmented-control">SegmentedControl</a>
                <a href="#stepper">Stepper</a>
              </div>
              <div className={styles.navCategory}>
                <a className={styles.navCategoryHeading} href="#forms-inputs">
                  Forms &amp; inputs
                </a>
                <a href="#autocomplete">Autocomplete</a>
                <a href="#checkbox">Checkbox</a>
                <a href="#combobox">Combobox</a>
                <a href="#date-input">DateInput</a>
                <a href="#date-picker-input">DatePickerInput</a>
                <a href="#file-input">FileInput</a>
                <a href="#multi-select">MultiSelect</a>
                <a href="#month-picker-input">MonthPickerInput</a>
                <a href="#number-input">NumberInput</a>
                <a href="#password-input">PasswordInput</a>
                <a href="#pin-input">PinInput</a>
                <a href="#select">Select</a>
                <a href="#tags-input">TagsInput</a>
                <a href="#text-input">TextInput</a>
                <a href="#textarea">Textarea</a>
              </div>
              <div className={styles.navCategory}>
                <a className={styles.navCategoryHeading} href="#layout-overlays">
                  Layout &amp; overlays
                </a>
                <a href="#app-shell">AppShell</a>
                <a href="#card">Card</a>
                <a href="#collapsible-card">CollapsibleCard</a>
                <a href="#divider">Divider</a>
                <a href="#drawer">Drawer</a>
                <a href="#modal">Modal</a>
                <a href="#popover">Popover</a>
              </div>
              <div className={styles.navCategory}>
                <a className={styles.navCategoryHeading} href="#feedback-status">
                  Feedback &amp; status
                </a>
                <a href="#alert">Alert</a>
                <a href="#loading-overlay">LoadingOverlay</a>
                <a href="#notification">Notification</a>
                <a href="#progress">Progress</a>
                <a href="#skeleton">Skeleton</a>
                <a href="#tooltip">Tooltip</a>
              </div>
              <div className={styles.navCategory}>
                <a className={styles.navCategoryHeading} href="#data-display">
                  Data display
                </a>
                <a href="#amount-text">AmountText</a>
                <a href="#badge">Badge</a>
                <a href="#code">Code</a>
                <a href="#table">Table</a>
                <a href="#text-components">
                  BodyText, CaptionText, DataText, DisplayText, HeadingText
                </a>
              </div>
              <div className={styles.navCategory}>
                <a className={styles.navCategoryHeading} href="#budget-board-components">
                  Budget Board components
                </a>
                <a href="#category-select">CategorySelect</a>
                <a href="#month-toolcards">MonthToolcards</a>
                <a href="#spending-categories-chart">SpendingCategoriesChart</a>
              </div>
            </div>
            <BodyText
              className={styles.navHeadingSpaced}
              component="p"
              tone="muted"
              size="xxs"
            >
              Package
            </BodyText>
            <code>@teelur/budget-board-ui</code>
          </aside>

          <main className={styles.mainContent}>
            <section className={styles.intro} id="overview">
              <BodyText
                component="p"
                ff="var(--bb-font-data)"
                fz="0.68rem"
                m={0}
                tone="muted"
                tt="uppercase"
              >
                Budget Board UI
              </BodyText>
              <HeadingText level={2} tone="heading" lh="h1">
                The building blocks behind Budget Board.
              </HeadingText>
              <BodyText
                component="p"
                className={styles.introCopy}
                tone="muted"
                fz="1.05rem"
                m="1em 0"
              >
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
                <BodyText
                  component="p"
                  className={styles.eyebrow}
                  tone="muted"
                  ff="var(--bb-font-data)"
                  fz="0.68rem"
                >
                  Visual language
                </BodyText>
                <HeadingText level={2} tone="heading" lh={1.5}>
                  Design
                </HeadingText>
                <BodyText component="p" tone="muted">
                  The shared color and type decisions that give Budget Board a
                  consistent visual rhythm.
                </BodyText>
              </div>
              <ColorThemePage colorMode={colorMode} />
              <TypographyPage />
            </section>

            <section className={styles.docsSection} id="components">
              <div className={styles.docsSectionHeading}>
                <BodyText
                  component="p"
                  className={styles.eyebrow}
                  tone="muted"
                  ff="var(--bb-font-data)"
                  fz="0.68rem"
                >
                  Interface building blocks
                </BodyText>
                <HeadingText level={2} tone="heading" lh={1.5}>
                  Components
                </HeadingText>
                <BodyText component="p" tone="muted">
                  Interface primitives with live examples, states, and API
                  references.
                </BodyText>
              </div>
              <section
                aria-label="Actions and navigation"
                className={styles.componentGroup}
                id="actions-navigation"
              >
                <div className={styles.componentGroupHeading}>
                  <HeadingText level={3} tone="heading" lh={1.5}>
                    Actions &amp; navigation
                  </HeadingText>
                </div>
                <ActionIconPage />
                <ButtonPage />
                <NavbarLinkPage />
                <PaginationPage />
                <SegmentedControlPage />
                <StepperPage />
              </section>

              <section
                aria-label="Forms and inputs"
                className={styles.componentGroup}
                id="forms-inputs"
              >
                <div className={styles.componentGroupHeading}>
                  <HeadingText level={3} tone="heading" lh={1.5}>
                    Forms &amp; inputs
                  </HeadingText>
                </div>
                <AutocompletePage />
                <CheckboxPage />
                <ComboboxPage />
                <DateInputPage />
                <DatePickerInputPage />
                <FileInputPage />
                <MultiSelectPage />
                <MonthPickerInputPage />
                <NumberInputPage />
                <PasswordInputPage />
                <PinInputPage />
                <SelectPage />
                <TagsInputPage />
                <TextInputPage />
                <TextareaPage />
              </section>

              <section
                aria-label="Layout and overlays"
                className={styles.componentGroup}
                id="layout-overlays"
              >
                <div className={styles.componentGroupHeading}>
                  <HeadingText level={3} tone="heading" lh={1.5}>
                    Layout &amp; overlays
                  </HeadingText>
                </div>
                <AppShellPage />
                <CardPage />
                <CollapsibleCardPage />
                <DividerPage />
                <DrawerPage />
                <ModalPage />
                <PopoverPage />
              </section>

              <section
                aria-label="Feedback and status"
                className={styles.componentGroup}
                id="feedback-status"
              >
                <div className={styles.componentGroupHeading}>
                  <HeadingText level={3} tone="heading" lh={1.5}>
                    Feedback &amp; status
                  </HeadingText>
                </div>
                <AlertPage />
                <LoadingOverlayPage />
                <NotificationPage />
                <ProgressPage />
                <SkeletonPage />
                <TooltipPage />
              </section>

              <section
                aria-label="Data display"
                className={styles.componentGroup}
                id="data-display"
              >
                <div className={styles.componentGroupHeading}>
                  <HeadingText level={3} tone="heading" lh={1.5}>
                    Data display
                  </HeadingText>
                </div>
                <AmountTextPage />
                <BadgePage />
                <CodePage />
                <TablePage />
                <TextComponentsPage />
              </section>

              <section
                aria-label="Budget Board components"
                className={styles.componentGroup}
                id="budget-board-components"
              >
                <div className={styles.componentGroupHeading}>
                  <HeadingText level={3} tone="heading" lh={1.5}>
                    Budget Board components
                  </HeadingText>
                </div>
                <CategorySelectPage />
                <MonthToolcardsPage />
                <SpendingCategoriesChartPage />
              </section>
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
