import styles from "../../styles/component/_contact_us.module.scss";

export default function Address(props) {
  return (
    <div className={styles.address}>
      <h3>{props.name}</h3>
      <p>{props.subtitleOne}</p>
      <p>{props.subtitleTwo}</p>
    </div>
  );
}
