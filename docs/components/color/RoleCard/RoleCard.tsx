import type { ColorMode } from "../colorCardTypes";
import { valueForMode } from "../colorCardTypes";
import { Card } from "../../../../src";
import colorCardStyles from "../ColorCard/ColorCard.module.css";
import styles from "./RoleCard.module.css";
import { BodyText } from "../../../../src";

export interface RoleCardData {
  name: string;
  token: string;
  lightValue: string;
  darkValue: string;
  lightContent: string | null;
  darkContent: string | null;
  lightClassName: string;
  darkClassName: string;
  description: string;
}

export interface RoleCardProps {
  cardClassName: string;
  swatchClassName: string;
  contentClassName: string;
  contentValueClassName: string;
  role: RoleCardData;
  colorMode: ColorMode;
}

export function RoleCard({
  cardClassName,
  swatchClassName,
  contentClassName,
  contentValueClassName,
  role,
  colorMode,
}: RoleCardProps) {
  const contentValue = valueForMode(
    role.lightContent,
    role.darkContent,
    colorMode,
  );

  return (
    <Card className={styles[cardClassName]} p="sm">
      <div
        className={`${styles[swatchClassName]} ${
          styles[
            valueForMode(role.lightClassName, role.darkClassName, colorMode)
          ]
        }`}
      >
        {contentValue ? (
          <BodyText c="inherit" component="span" fw={700} fz="1.5rem">
            Aa
          </BodyText>
        ) : null}
      </div>
      <div className={styles[contentClassName]}>
        <div className={colorCardStyles.colorCardHeading}>
          <BodyText component="strong" fw={700}>{role.name}</BodyText>
          <code>
            {valueForMode(role.lightValue, role.darkValue, colorMode)}
          </code>
        </div>
        <code>{role.token}</code>
        <BodyText
          component="p"
          fz="0.78rem"
          lh={1.55}
          m="0.35rem 0 0"
          tone="muted"
        >
          {role.description}
        </BodyText>
        {contentValue ? (
          <>
            <code>{role.token}-content</code>
            <BodyText component="span" className={contentValueClassName} tone="muted" ff="var(--bb-font-data)" fz="0.64rem">
              Content: {contentValue}
            </BodyText>
          </>
        ) : null}
      </div>
    </Card>
  );
}
