export interface ColorCardData {
  name: string;
  token: string;
  value: string;
  description: string;
  className: string;
}

export function ColorCard({ color }: { color: ColorCardData }) {
  return (
    <div className="color-card">
      <div className={`color-swatch ${color.className}`} />
      <div className="color-card-content">
        <div className="color-card-heading">
          <strong>{color.name}</strong>
          <code>{color.value}</code>
        </div>
        <code>{color.token}</code>
        <p>{color.description}</p>
      </div>
    </div>
  );
}
