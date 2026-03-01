import { TeamsItemData, TermDescription } from "@/@types/temsType";
import styles from "../../styles/component/_terms_conditions.module.scss";

export default function TemsData(props: TeamsItemData) {
  if (!props) return <p>Data Not Found</p>;

  return (
    <div className={styles.condition}>
      <h2>{props?.item?.title}</h2>
      <ul>
        {props?.item?.description.map((desc: TermDescription) => (
          <li key={desc.id}>{desc.text}</li>
        ))}
      </ul>
    </div>
  );
}
