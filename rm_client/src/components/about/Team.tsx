"use client";
import { TermItemProps } from "@/@types/temsType";
import styles from "../../styles/component/_about.module.scss";
import HtmlContent from "../HtmlContent";
import ImageResponsive from "../image/ImageResponsive";

export default function Team(props: TermItemProps) {
  return (
    <div className={`reveal ${styles.team}`}>
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-4 col-xl-4 col-lg-4">
          <div className={`image-wrapaa ${styles.teamImg}`}>
            <ImageResponsive
              width={160}
              height={160}
              src={props.photo}
              alt="Expert Cleaning Partner"
            />
          </div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-8 col-xl-8 col-lg-8">
          <div className={styles.teamItem}>
            <h3 className="fadeup-smaa">{props.designation}</h3>
            <h1 className="fadeup-smaa">{props.name}</h1>
          </div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-12 col-xl-12 col-lg-12">
          <div className={styles.teamItem}>
            <p className="fadeup-smaa">
              <HtmlContent content={props.details} />{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
