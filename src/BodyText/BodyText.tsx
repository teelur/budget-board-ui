import type { ReactElement } from "react";
import { TextRole } from "../shared/TextRole";
import type { TextRoleProps } from "../shared/TextRole";

export type BodyTextProps = TextRoleProps;

export function BodyText(props: BodyTextProps): ReactElement {
  return <TextRole {...props} textRole="body" />;
}
