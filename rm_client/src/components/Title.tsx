import { TitleProps } from "@/@types/common";
import styles from "../styles/component/_title.module.scss";
export default function Title(props: TitleProps) {
  return (
    <div className={styles.title}>
      <h2>{props.title}</h2>
      <p>{props.subtitle}</p>
    </div>
  );
}
