import type { ColorMode } from "../colorCardTypes";
import { RoleCard } from "../RoleCard/RoleCard";
import type { RoleCardData } from "../RoleCard/RoleCard";
import styles from "./SemanticColorGroup.module.css";

export interface SemanticColorGroupData {
  name: string;
  roles: readonly RoleCardData[];
}

export function SemanticColorGroup({
  group,
  colorMode,
}: {
  group: SemanticColorGroupData;
  colorMode: ColorMode;
}) {
  return (
    <div className={styles.semanticColorGroup}>
      <h3>{group.name}</h3>
      <div className={styles.semanticColorGrid}>
        {group.roles.map((role) => (
          <RoleCard
            cardClassName="semantic-color-card"
            colorMode={colorMode}
            contentClassName="color-role-content"
            contentValueClassName="color-role-content-value"
            key={role.token}
            role={role}
            swatchClassName="semantic-color-swatch"
          />
        ))}
      </div>
    </div>
  );
}
