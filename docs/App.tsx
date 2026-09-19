import { useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import type { ColorMode } from "./components/color/colorCardTypes";
import { ButtonPage } from "./pages/ButtonPage";
import { ColorThemePage } from "./pages/ColorThemePage";
import { TypographyPage } from "./pages/TypographyPage";

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
      className={`site-shell${isHeaderVisible ? "" : " header-hidden"}`}
      data-color-mode={colorMode}
    >
      <header className="site-header" ref={headerRef}>
        <div className="brand-mark">BB</div>
        <div>
          <p className="eyebrow">Component library</p>
          <h1>Budget Board UI</h1>
        </div>
        <div className="header-actions">
          <button
            className="mode-toggle"
            onClick={() =>
              setColorMode((mode) => (mode === "light" ? "dark" : "light"))
            }
            aria-label={`Current mode: ${colorMode}`}
            title={`Current mode: ${colorMode}`}
            type="button"
          >
            {colorMode === "light" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <a
            className="source-link"
            href="https://github.com/teelur/budget-board-ui"
          >
            GitHub
          </a>
        </div>
      </header>

      <div className="content-layout">
        <aside className="side-nav" aria-label="Documentation navigation">
          <p className="nav-heading">On this page</p>
          <a href="#overview">Overview</a>
          <a href="#color-theme">Color theme</a>
          <a href="#typography">Typography</a>
          <a href="#button">Button</a>
          <p className="nav-heading nav-heading-spaced">Package</p>
          <code>@teelur/budget-board-ui</code>
        </aside>

        <main className="main-content">
          <section className="intro" id="overview">
            <p className="eyebrow">Budget Board primitives</p>
            <h2>Small components with a clear point of view.</h2>
            <p className="intro-copy">
              A living reference for the components shipped by Budget Board UI.
              Explore the states, copy the examples, and see the public API in
              one place.
            </p>
            <div className="intro-meta">
              <span>React 19</span>
              <span>Mantine 9</span>
              <span>TypeScript</span>
            </div>
          </section>

          <ColorThemePage colorMode={colorMode} />
          <TypographyPage />
          <ButtonPage />

          <footer className="site-footer">
            @teelur/budget-board-ui · built for Budget Board
          </footer>
        </main>
      </div>
    </div>
  );
}
