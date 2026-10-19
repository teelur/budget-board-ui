import { ApiPlayground } from "../../components/ApiPlayground/ApiPlayground";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import { BodyText, HeadingText, Skeleton } from "../../../src";
import pageStyles from "../Page.module.css";
import styles from "./SkeletonPage.module.css";

const skeletonRadii = ["xs", "sm", "md", "lg", "xl"] as const;

export function SkeletonPage() {
  return (
    <section className={pageStyles.componentSection} id="skeleton">
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
            Skeleton
          </HeadingText>
        </div>
        <code>import {"{ Skeleton }"} from '@teelur/budget-board-ui';</code>
      </div>
      <BodyText
        component="p"
        className={pageStyles.sectionCopy}
        tone="muted"
        m="1em 0"
      >
        Skeleton wraps Mantine&apos;s placeholder component. Its base and
        shimmer use BBUI&apos;s semantic surface and hover colors, adapting to
        the active light or dark palette.
      </BodyText>

      <ComponentDemoSection
        description="Compose simple placeholders to reflect the shape of the content being loaded."
        id="skeleton-basic"
        title="Content placeholders"
        code={`<Skeleton height={22} mb="md" width="42%" />
<Skeleton height={14} mb="xs" />
<Skeleton height={14} mb="xs" width="82%" />
<Skeleton height={14} width="64%" />`}
      >
        <div className={styles.surface}>
          <Skeleton height={22} mb="md" width="42%" />
          <Skeleton height={14} mb="xs" />
          <Skeleton height={14} mb="xs" width="82%" />
          <Skeleton height={14} width="64%" />
        </div>
      </ComponentDemoSection>

      <ApiPlayground
        componentName="Skeleton"
        controls={[
          { key: "visible", label: "Visible", type: "toggle" },
          { key: "animate", label: "Animate", type: "toggle" },
          {
            key: "height",
            label: "Height",
            type: "range",
            min: 8,
            max: 40,
            step: 2,
          },
          {
            key: "width",
            label: "Width",
            type: "select",
            options: ["35%", "60%", "85%", "100%"],
          },
          {
            key: "radius",
            label: "Radius",
            type: "select",
            options: skeletonRadii,
          },
        ]}
        defaultValues={{
          animate: true,
          height: 18,
          radius: "sm",
          visible: true,
          width: "85%",
        }}
        description="Adjust the placeholder dimensions, radius, visibility, and animation. Mantine Skeleton props are forwarded."
        id="skeleton-playground"
        render={(values) => (
          <div className={styles.playgroundSurface}>
            <Skeleton
              animate={Boolean(values.animate)}
              height={Number(values.height)}
              radius={String(values.radius)}
              visible={Boolean(values.visible)}
              width={String(values.width)}
            />
          </div>
        )}
      />

      <section
        className={pageStyles.componentReferenceSection}
        id="skeleton-api"
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
            Skeleton forwards Mantine Skeleton props and styles the placeholder
            with BBUI semantic surface tokens.
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
                  <td>true</td>
                </tr>
                <tr>
                  <th>animate</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>true</td>
                </tr>
                <tr>
                  <th>height, width</th>
                  <td>
                    <code>CSS length or Mantine size</code>
                  </td>
                  <td>auto, 100%</td>
                </tr>
                <tr>
                  <th>circle</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>false; sets width and radius from height.</td>
                </tr>
                <tr>
                  <th>radius</th>
                  <td>
                    <code>Mantine radius or CSS length</code>
                  </td>
                  <td>Mantine default radius</td>
                </tr>
                <tr>
                  <th>color styling</th>
                  <td>
                    <code>BBUI semantic tokens</code>
                  </td>
                  <td>
                    Uses <code>surface</code> for the base and{" "}
                    <code>surface-hover</code> for the animated highlight.
                    Consumer CSS variables can override these values.
                  </td>
                </tr>
                <tr>
                  <th>className, style, other root attributes</th>
                  <td>
                    <code>Mantine SkeletonProps</code>
                  </td>
                  <td>Forwarded to Mantine&apos;s root element.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <pre className={pageStyles.codeBlock}>
            <code>{`<Skeleton
  height={18}
  radius="sm"
  width="85%"
/>`}</code>
          </pre>
        </div>
      </section>
    </section>
  );
}
