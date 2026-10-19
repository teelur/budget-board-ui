import { ApiPlayground } from "../../components/ApiPlayground/ApiPlayground";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import {
  BodyText,
  HeadingText,
  LoadingOverlay,
} from "../../../src";
import pageStyles from "../Page.module.css";
import styles from "./LoadingOverlayPage.module.css";

export function LoadingOverlayPage() {
  return (
    <section
      className={pageStyles.componentSection}
      id="loading-overlay"
    >
      <div className={pageStyles.sectionHeading}>
        <div>
          <BodyText
            component="p"
            className={pageStyles.eyebrow}
            tone="muted"
            ff="var(--bb-font-data)"
            fz="0.68rem"
          >
            Feedback
          </BodyText>
          <HeadingText level={2} tone="heading" lh={1.5}>
            LoadingOverlay
          </HeadingText>
        </div>
        <code>
          import {"{ LoadingOverlay }"} from '@teelur/budget-board-ui';
        </code>
      </div>
      <BodyText
        component="p"
        className={pageStyles.sectionCopy}
        tone="muted"
        m="1em 0"
      >
        LoadingOverlay wraps Mantine&apos;s loading overlay and keeps its API,
        while defaulting the mask and spinner to BBUI&apos;s semantic surface
        overlay and primary colors. Place it inside a positioned container.
      </BodyText>

      <ComponentDemoSection
        description="Show the overlay while content is loading. The light and dark palettes provide the semantic surface color automatically."
        id="loading-overlay-basic"
        title="Loading content"
        code={`<div style={{ position: "relative" }}>
  <LoadingOverlay visible />
  <p>Preparing your account summary…</p>
</div>`}
      >
        <div className={styles.surface}>
          <HeadingText level={5} tone="heading" mb="xs">
            Account summary
          </HeadingText>
          <BodyText component="p" tone="secondary" m={0}>
            Balances and recent activity are being refreshed.
          </BodyText>
          <LoadingOverlay visible />
        </div>
      </ComponentDemoSection>

      <ApiPlayground
        componentName="LoadingOverlay"
        controls={[
          { key: "visible", label: "Visible", type: "toggle" },
          {
            key: "opacity",
            label: "Overlay opacity",
            type: "range",
            min: 0.25,
            max: 1,
            step: 0.05,
            codeProp: "overlayProps",
            formatCode: (value) =>
              `overlayProps={{ backgroundOpacity: ${value} }}`,
          },
        ]}
        defaultValues={{ opacity: 0.75, visible: true }}
        description="Toggle visibility and adjust the Mantine overlay opacity. The surface color and loader color use BBUI semantic tokens by default."
        id="loading-overlay-playground"
        render={(values) => (
          <div className={styles.surface}>
            <HeadingText level={5} tone="heading" mb="xs">
              Account summary
            </HeadingText>
            <BodyText component="p" tone="secondary" m={0}>
              Loading the latest transactions.
            </BodyText>
            <LoadingOverlay
              overlayProps={{ backgroundOpacity: Number(values.opacity) }}
              visible={Boolean(values.visible)}
            />
          </div>
        )}
      />

      <section
        className={pageStyles.componentReferenceSection}
        id="loading-overlay-api"
      >
        <div>
          <HeadingText level={3} tone="heading" lh={1.5}>
            API reference
          </HeadingText>
          <BodyText
            component="p"
            tone="secondary"
            fz="0.82rem"
            lh={1.55}
            m="0.45rem 0 0"
          >
            LoadingOverlay forwards Mantine LoadingOverlay props and applies
            BBUI semantic colors as defaults.
          </BodyText>
        </div>
        <div className={pageStyles.referenceGrid}>
          <div>
            <table>
              <tbody>
                <tr>
                  <th>visible</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>false</td>
                </tr>
                <tr>
                  <th>overlayProps</th>
                  <td>
                    <code>Mantine OverlayProps</code>
                  </td>
                  <td>
                    The color defaults to the BBUI{" "}
                    <code>surface-overlay</code> token; all other Mantine
                    overlay settings, including opacity, blur, and color
                    overrides, are supported.
                  </td>
                </tr>
                <tr>
                  <th>loaderProps</th>
                  <td>
                    <code>Mantine LoaderProps</code>
                  </td>
                  <td>
                    The color defaults to the BBUI <code>primary</code> token;
                    Mantine loader type, size, and other props are supported.
                  </td>
                </tr>
                <tr>
                  <th>transitionProps, zIndex, callbacks</th>
                  <td>
                    <code>Mantine LoadingOverlayProps</code>
                  </td>
                  <td>Mantine defaults; forwarded unchanged.</td>
                </tr>
                <tr>
                  <th>className, style, other root attributes</th>
                  <td>
                    <code>Mantine LoadingOverlayProps</code>
                  </td>
                  <td>Forwarded to Mantine&apos;s root element.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <pre className={pageStyles.codeBlock}>
            <code>{`<LoadingOverlay
  overlayProps={{ backgroundOpacity: 0.75 }}
  visible
/>`}</code>
          </pre>
        </div>
      </section>
    </section>
  );
}
