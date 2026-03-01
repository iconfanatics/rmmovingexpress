import { WhyChooseServiceProps } from "@/@types/service";
import styles from "../../styles/component/service/_why_choose.module.scss";
import HtmlContent from "../HtmlContent";
import Title from "../Title";

export default function WhyChoose(props: WhyChooseServiceProps) {
  return (
    <div className="container">
      <div className="row">
        <div className={`revealdd ${styles.whyChoose}`}>
          <Title title={props.title} subtitle={props.sub_title} />

          <div className={`fadeup-smdd ${styles.whyChooseList}`}>
            <HtmlContent content={props.details} />
          </div>
        </div>
      </div>
    </div>
  );
}
