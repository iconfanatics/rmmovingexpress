import { HomeStepProps } from "@/@types/home";
import styles from "../../styles/component/steep.module.scss";

export default function HomeStepItem(props: HomeStepProps) {
  return (
    <div className="col-xs-12 col-sm-6 col-md-6 col-xl-6 col-lg-6">
      <div className={`${styles.stepItem} reveal`}>
        <h5 className="fadeup-sm"> {props.step}</h5>
        <h1 className="fadeup-sm"> {props.title}</h1>
        <p className="fadeup-sm">{props.details}</p>
      </div>
    </div>
  );
}
