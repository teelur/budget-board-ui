import { Card } from "../../../../src";
import styles from "./ColorCard.module.css";
import { BodyText } from "../../../../src";

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
          <BodyText component="strong" fw={700}>{color.name}</BodyText>
          <code>{color.value}</code>
        </div>
        <code>{color.token}</code>
        <BodyText component="p">{color.description}</BodyText>
      </div>
    </Card>
  );
}
