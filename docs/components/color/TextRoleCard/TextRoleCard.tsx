import type { ColorMode } from "../colorCardTypes";
import { valueForMode } from "../colorCardTypes";
import { Card } from "../../../../src";
import colorCardStyles from "../ColorCard/ColorCard.module.css";
import styles from "./TextRoleCard.module.css";

export interface TextRoleData {
  name: string;
  token: string;
  lightValue: string;
  darkValue: string;
  className: string;
  description: string;
}

export function TextRoleCard({
  role,
  colorMode,
}: {
  role: TextRoleData;
  colorMode: ColorMode;
}) {
  return (
    <Card className={styles.textRoleCard} display="grid" p={0}>
      <div className={`${styles.textRoleSample} ${styles[role.className]}`}>
        Aa
      </div>
      <div className={styles.textRoleContent}>
        <div className={colorCardStyles.colorCardHeading}>
          <strong>{role.name}</strong>
          <code>
            {valueForMode(role.lightValue, role.darkValue, colorMode)}
          </code>
        </div>
        <code>{role.token}</code>
        <p>{role.description}</p>
      </div>
    </Card>
  );
}
