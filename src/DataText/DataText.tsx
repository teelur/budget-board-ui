import type { ReactElement } from "react";
import { TextRole } from "../shared/TextRole";
import type { TextRoleProps } from "../shared/TextRole";

export type DataTextProps = TextRoleProps;

export function DataText(props: DataTextProps): ReactElement {
  return <TextRole {...props} textRole="data" />;
}
