import type { ColorMode } from "./colorCardTypes";
import { valueForMode } from "./colorCardTypes";

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
    <div className="surface-role-card">
      <div
        className={`surface-role-swatch ${valueForMode(
          role.lightClassName,
          role.darkClassName,
          colorMode,
        )}`}
      />
      <div className="surface-role-content">
        <div className="color-card-heading">
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
