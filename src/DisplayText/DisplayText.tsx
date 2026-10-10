import type { ReactElement } from "react";
import { TextRole } from "../shared/TextRole";
import type { TextRoleProps } from "../shared/TextRole";

export type DisplayTextProps = TextRoleProps;

export function DisplayText(props: DisplayTextProps): ReactElement {
  return <TextRole {...props} textRole="display" />;
}
