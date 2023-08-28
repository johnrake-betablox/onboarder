import styles from "./LoadingDots.module.css";

interface Props {
  color?: string;
}
export default function LoadingDots({ color = "#000" }: Props) {
  return (
    <span className={styles.loading}>
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
    </span>
  );
}
