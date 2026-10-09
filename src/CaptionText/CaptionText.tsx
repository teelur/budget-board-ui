import type { ReactElement } from "react";
import { TextRole } from "../shared/TextRole";
import type { TextRoleProps } from "../shared/TextRole";

export type CaptionTextProps = TextRoleProps;

export function CaptionText(props: CaptionTextProps): ReactElement {
  return <TextRole {...props} role="caption" />;
}
