import type { ColorMode } from "../colorCardTypes";
import { valueForMode } from "../colorCardTypes";
import { Card } from "../../../../src";
import colorCardStyles from "../ColorCard/ColorCard.module.css";
import styles from "./SurfaceRoleCard.module.css";
import { BodyText } from "../../../../src";

export interface SurfaceRoleData {
  name: string;
  token: string;
  lightValue: string;
  darkValue: string;
  description: string;
  lightClassName: string;
  darkClassName: string;
}

export function SurfaceRoleCard({
  role,
  colorMode,
}: {
  role: SurfaceRoleData;
  colorMode: ColorMode;
}) {
  return (
    <Card className={styles.surfaceRoleCard} p={0}>
      <div
        className={`${styles.surfaceRoleSwatch} ${
          styles[
            valueForMode(role.lightClassName, role.darkClassName, colorMode)
          ]
        }`}
      />
      <div className={styles.surfaceRoleContent}>
        <div className={colorCardStyles.colorCardHeading}>
          <BodyText component="strong" fw={700}>{role.name}</BodyText>
          <code>
            {valueForMode(role.lightValue, role.darkValue, colorMode)}
          </code>
        </div>
        <code>{role.token}</code>
        <BodyText component="p">{role.description}</BodyText>
      </div>
    </Card>
  );
}
