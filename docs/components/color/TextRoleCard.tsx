import type { ColorMode } from "./colorCardTypes";
import { valueForMode } from "./colorCardTypes";

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
    <div className="text-role-card">
      <div className={`text-role-sample ${role.className}`}>Aa</div>
      <div className="text-role-content">
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
