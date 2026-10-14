import { useState } from "react";
import { Checkbox, Pagination } from "../../../src";
import { ComponentDemoSection } from "../../components/ComponentDemoSection/ComponentDemoSection";
import demoStyles from "../../components/ComponentDemoSection/ComponentDemoSection.module.css";
import pageStyles from "../Page.module.css";
import styles from "./PaginationPage.module.css";
import { BodyText, HeadingText } from "../../../src";

export function PaginationPage() {
  const [page, setPage] = useState(3);
  const [responsivePage, setResponsivePage] = useState(2);
  const [playgroundPage, setPlaygroundPage] = useState(3);
  const [playgroundTotal, setPlaygroundTotal] = useState(12);
  const [playgroundLayout, setPlaygroundLayout] = useState<
    "default" | "responsive"
  >("default");
  const [playgroundWithEdges, setPlaygroundWithEdges] = useState(false);
  const playgroundCode = `const [page, setPage] = useState(${playgroundPage});

<Pagination
  aria-label="Pagination playground"
  layout="${playgroundLayout}"
  total={${playgroundTotal}}
  value={page}
  onChange={setPage}
  withEdges={${playgroundWithEdges}}
/>`;

  return (
    <section className={pageStyles.componentSection} id="pagination">
      <div className={pageStyles.sectionHeading}>
        <div>
          <BodyText
            component="p"
            className={pageStyles.eyebrow}
            tone="muted"
            ff="var(--bb-font-data)"
            fz="0.68rem"
          >
            Navigation
          </BodyText>
          <HeadingText level={2} tone="heading" lh={1.5}>
            Pagination
          </HeadingText>
        </div>
        <code>import {"{ Pagination }"} from '@teelur/budget-board-ui';</code>
      </div>
      <BodyText
        component="p"
        className={pageStyles.sectionCopy}
        tone="muted"
        m="1em 0"
      >
        Mantine pagination behavior with BBUI control styling. The full Mantine
        API is available, including controlled and uncontrolled state, layout
        options, and accessibility attributes.
      </BodyText>

      <ComponentDemoSection
        description="Use value and onChange for controlled page state; native Mantine pagination props are forwarded."
        id="pagination-controlled"
        title="Controlled pages"
        code={`<Pagination
  aria-label="Transaction pages"
  total={12}
  value={page}
  onChange={setPage}
/>`}
      >
        <div className={styles.examples}>
          <Pagination
            aria-label="Transaction pages"
            onChange={setPage}
            total={12}
            value={page}
          />
          <BodyText component="p" tone="secondary">
            Page {page} of 12
          </BodyText>
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Responsive layout switches to a compact page label when the pagination container is narrow."
        id="pagination-responsive"
        title="Responsive layout"
        code={`<Pagination
  aria-label="Responsive pages"
  layout="responsive"
  total={20}
  value={page}
  onChange={setPage}
/>`}
      >
        <div className={styles.responsive}>
          <Pagination
            aria-label="Responsive pages"
            layout="responsive"
            onChange={setResponsivePage}
            total={20}
            value={responsivePage}
          />
        </div>
      </ComponentDemoSection>

      <ComponentDemoSection
        description="Adjust the page count and layout, then navigate the live pagination control."
        id="pagination-playground"
        title="API playground"
        code={playgroundCode}
      >
        <div className={styles.playground}>
          <div className={styles.playgroundControls}>
            <div className={styles.controlGrid}>
              <label className={styles.field}>
                <BodyText component="span">Total pages</BodyText>
                <input
                  max={100}
                  min={1}
                  onChange={(event) => {
                    const total = Number(event.target.value);
                    if (!Number.isInteger(total) || total < 1) {
                      return;
                    }

                    setPlaygroundTotal(total);
                    setPlaygroundPage((currentPage) =>
                      Math.min(currentPage, total),
                    );
                  }}
                  type="number"
                  value={playgroundTotal}
                />
              </label>
              <label className={styles.field}>
                <BodyText component="span">Layout</BodyText>
                <select
                  onChange={(event) =>
                    setPlaygroundLayout(
                      event.target.value as typeof playgroundLayout,
                    )
                  }
                  value={playgroundLayout}
                >
                  <option value="default">Default</option>
                  <option value="responsive">Responsive</option>
                </select>
              </label>
            </div>
            <Checkbox
              checked={playgroundWithEdges}
              className={styles.toggle}
              label="Show first and last controls"
              onChange={(event) =>
                setPlaygroundWithEdges(event.target.checked)
              }
              size="xs"
            />
          </div>
          <div className={styles.playgroundPreview}>
            <BodyText
              component="span"
              className={styles.previewLabel}
              tone="muted"
              ff="var(--bb-font-data)"
              fz="0.68rem"
            >
              Rendered result
            </BodyText>
            <div className={styles.previewStage}>
              <div
                className={
                  playgroundLayout === "responsive"
                    ? styles.responsive
                    : undefined
                }
              >
                <Pagination
                  aria-label="Pagination playground"
                  layout={playgroundLayout}
                  onChange={setPlaygroundPage}
                  total={playgroundTotal}
                  value={playgroundPage}
                  withEdges={playgroundWithEdges}
                />
              </div>
              <BodyText component="p" tone="secondary">
                Page {playgroundPage} of {playgroundTotal}
              </BodyText>
            </div>
          </div>
        </div>
      </ComponentDemoSection>

      <section
        className={pageStyles.componentReferenceSection}
        id="pagination-api"
      >
        <div className={demoStyles.componentDemoHeading}>
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
              Mantine Pagination props and behavior are retained; BBUI provides
              the default visual styling.
            </BodyText>
          </div>
          <a
            aria-label="Link to API reference section"
            className={demoStyles.componentDemoAnchor}
            href="#pagination-api"
          >
            #
          </a>
        </div>
        <div className={pageStyles.referenceGrid}>
          <div>
            <table>
              <tbody>
                <tr>
                  <th>total</th>
                  <td>
                    <code>number</code>
                  </td>
                  <td>Required; total number of pages</td>
                </tr>
                <tr>
                  <th>value / defaultValue</th>
                  <td>
                    <code>number</code>
                  </td>
                  <td>
                    Omit both for the uncontrolled default page of 1; use{" "}
                    <code>value</code> and <code>onChange</code> for controlled
                    state
                  </td>
                </tr>
                <tr>
                  <th>onChange</th>
                  <td>
                    <code>(value: number) =&gt; void</code>
                  </td>
                  <td>Called when the active page changes</td>
                </tr>
                <tr>
                  <th>disabled</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>false; disables all controls</td>
                </tr>
                <tr>
                  <th>siblings / boundaries</th>
                  <td>
                    <code>number</code>
                  </td>
                  <td>1; visible pages around the current page and at the edges</td>
                </tr>
                <tr>
                  <th>withControls / withPages</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>true; show previous/next controls and numbered pages</td>
                </tr>
                <tr>
                  <th>withEdges</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>false; show first/last controls</td>
                </tr>
                <tr>
                  <th>size / radius / gap</th>
                  <td>
                    <code>MantineSize | string | number</code>
                  </td>
                  <td>
                    md / theme default radius / 8; size and radius follow
                    Mantine's theme values
                  </td>
                </tr>
                <tr>
                  <th>color / autoContrast</th>
                  <td>
                    <code>MantineColor / boolean</code>
                  </td>
                  <td>
                    Theme primary color / false; BBUI's primary token is used
                    when color is omitted
                  </td>
                </tr>
                <tr>
                  <th>layout</th>
                  <td>
                    <code>"default" | "responsive"</code>
                  </td>
                  <td>default</td>
                </tr>
                <tr>
                  <th>hideWithOnePage</th>
                  <td>
                    <code>boolean</code>
                  </td>
                  <td>false; hide when total is 1</td>
                </tr>
                <tr>
                  <th>startValue</th>
                  <td>
                    <code>number</code>
                  </td>
                  <td>1; first page number</td>
                </tr>
                <tr>
                  <th>icons</th>
                  <td>
                    <code>PaginationIcon</code>
                  </td>
                  <td>
                    <code>nextIcon</code>, <code>previousIcon</code>,{" "}
                    <code>firstIcon</code>, <code>lastIcon</code>, and{" "}
                    <code>dotsIcon</code> override their defaults
                  </td>
                </tr>
                <tr>
                  <th>getControlProps / getItemProps</th>
                  <td>
                    <code>function</code>
                  </td>
                  <td>Add props to navigation controls or page buttons</td>
                </tr>
                <tr>
                  <th>onNextPage / onPreviousPage / onFirstPage / onLastPage</th>
                  <td>
                    <code>() =&gt; void</code>
                  </td>
                  <td>Optional callbacks for the corresponding controls</td>
                </tr>
                <tr>
                  <th>formatLabel</th>
                  <td>
                    <code>PaginationFormatLabel</code>
                  </td>
                  <td>Optional formatter for the responsive page label</td>
                </tr>
                <tr>
                  <th>Mantine styles API, Box props, and div attributes</th>
                  <td>
                    <code>PaginationProps</code>
                  </td>
                  <td>
                    Forwarded, including className, classNames, styles, vars,
                    style, dimensions, aria attributes, and ref
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </section>
  );
}
