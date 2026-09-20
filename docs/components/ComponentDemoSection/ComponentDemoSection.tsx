import { useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { Button } from "../../../src";
import styles from "./ComponentDemoSection.module.css";

type ComponentDemoTab = "preview" | "code";

const componentDemoTabs: ComponentDemoTab[] = ["preview", "code"];

interface ComponentDemoSectionProps {
  children: ReactNode;
  code: string;
  description: string;
  id: string;
  title: string;
}

export function ComponentDemoSection({
  children,
  code,
  description,
  id,
  title,
}: ComponentDemoSectionProps) {
  const [activeTab, setActiveTab] = useState<ComponentDemoTab>("preview");

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
      return;
    }

    event.preventDefault();
    const currentIndex = componentDemoTabs.indexOf(activeTab);
    const nextIndex =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? componentDemoTabs.length - 1
          : event.key === "ArrowRight"
            ? (currentIndex + 1) % componentDemoTabs.length
            : (currentIndex - 1 + componentDemoTabs.length) %
              componentDemoTabs.length;
    const nextTab = componentDemoTabs[nextIndex];

    if (!nextTab) {
      return;
    }

    setActiveTab(nextTab);
    document.getElementById(`${id}-${nextTab}-tab`)?.focus();
  }

  return (
    <section className={styles.componentDemoSection} id={id}>
      <div className={styles.componentDemoHeading}>
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <a
          aria-label={`Link to ${title} section`}
          className={styles.componentDemoAnchor}
          href={`#${id}`}
        >
          #
        </a>
      </div>
      <div className={styles.componentDemoTabs}>
        <div
          aria-label={`${title} views`}
          className={styles.componentDemoTablist}
          role="tablist"
        >
          {componentDemoTabs.map((tab) => {
            const panelId = `${id}-${tab}-panel`;
            const tabId = `${id}-${tab}-tab`;

            return (
              <Button
                aria-controls={panelId}
                aria-selected={activeTab === tab}
                color="primary"
                id={tabId}
                key={tab}
                onClick={() => setActiveTab(tab)}
                onKeyDown={handleTabKeyDown}
                role="tab"
                selected={activeTab === tab}
                size="compact-xs"
                tabIndex={activeTab === tab ? 0 : -1}
                type="button"
                variant="ghost"
              >
                {tab === "preview" ? "Preview" : "Code"}
              </Button>
            );
          })}
        </div>
      </div>
      <div
        aria-labelledby={`${id}-preview-tab`}
        className={styles.componentDemoPanel}
        hidden={activeTab !== "preview"}
        id={`${id}-preview-panel`}
        role="tabpanel"
        tabIndex={0}
      >
        <div className={styles.componentDemoPreview}>{children}</div>
      </div>
      <div
        aria-labelledby={`${id}-code-tab`}
        className={styles.componentDemoPanel}
        hidden={activeTab !== "code"}
        id={`${id}-code-panel`}
        role="tabpanel"
        tabIndex={0}
      >
        <pre className={`${styles.codeBlock} ${styles.componentDemoCode}`}>
          <code>{code}</code>
        </pre>
      </div>
    </section>
  );
}
