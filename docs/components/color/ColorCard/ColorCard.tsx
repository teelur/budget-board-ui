import { Card } from "../../../../src";
import styles from "./ColorCard.module.css";

export interface ColorCardData {
  name: string;
  token: string;
  value: string;
  description: string;
  className: string;
}

export function ColorCard({ color }: { color: ColorCardData }) {
  return (
    <Card className={styles.colorCard} p={0}>
      <div className={`${styles.colorSwatch} ${styles[color.className]}`} />
      <div className={styles.colorCardContent}>
        <div className={styles.colorCardHeading}>
          <strong>{color.name}</strong>
          <code>{color.value}</code>
        </div>
        <code>{color.token}</code>
        <p>{color.description}</p>
      </div>
    </Card>
  );
}
