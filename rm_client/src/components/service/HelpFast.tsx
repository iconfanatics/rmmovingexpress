import { HelpFastProps } from "@/@types/service";
import Link from "next/link";
import styles from "../../styles/component/service/_cost_less.module.scss";

export default function HelpFast(props: HelpFastProps) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-6 col-xl-6 col-lg-6">
          <div className={`reveal ${styles.cost}`}>
            <h2 className="fadeup-sm">{props.title}</h2>
          </div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-6 col-xl-6 col-lg-6">
          <div className={`reveal ${styles.cost}`}>
            <div dangerouslySetInnerHTML={{ __html: props.description }} />

            <div className={`${styles.costQuoteBtn} fadeup-sm`}>
              <Link href="/moving-quote">Get a Quote</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
