import type { ColorMode } from "./colorCardTypes";
import { valueForMode } from "./colorCardTypes";
import colorCardStyles from "./ColorCard.module.css";
import styles from "./RoleCard.module.css";

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
    <div className={styles[cardClassName]}>
      <div
        className={`${styles[swatchClassName]} ${
          styles[
            valueForMode(role.lightClassName, role.darkClassName, colorMode)
          ]
        }`}
      >
        {contentValue ? <span>Aa</span> : null}
      </div>
      <div className={styles[contentClassName]}>
        <div className={colorCardStyles.colorCardHeading}>
          <strong>{role.name}</strong>
          <code>
            {valueForMode(role.lightValue, role.darkValue, colorMode)}
          </code>
        </div>
        <code>{role.token}</code>
        <p>{role.description}</p>
        {contentValue ? (
          <>
            <code>{role.token}-content</code>
            <span className={contentValueClassName}>
              Content: {contentValue}
            </span>
          </>
        ) : null}
      </div>
    </div>
  );
}
