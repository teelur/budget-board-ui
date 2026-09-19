import type { ColorMode } from "./colorCardTypes";
import { valueForMode } from "./colorCardTypes";
import colorCardStyles from "./ColorCard.module.css";
import styles from "./SurfaceRoleCard.module.css";

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
    <div className={styles.surfaceRoleCard}>
      <div
        className={`${styles.surfaceRoleSwatch} ${
          styles[
            valueForMode(role.lightClassName, role.darkClassName, colorMode)
          ]
        }`}
      />
      <div className={styles.surfaceRoleContent}>
        <div className={colorCardStyles.colorCardHeading}>
          <strong>{role.name}</strong>
          <code>
            {valueForMode(role.lightValue, role.darkValue, colorMode)}
          </code>
        </div>
        <code>{role.token}</code>
        <p>{role.description}</p>
      </div>
    </div>
  );
}
