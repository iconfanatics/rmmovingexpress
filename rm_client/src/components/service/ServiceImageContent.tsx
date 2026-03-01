import { ServiceProps } from "@/@types/service";
import styles from "../../styles/component/service/_service_img_content.module.scss";
import HtmlContent from "../HtmlContent";
import ImageResponsive from "../image/ImageResponsive";

export default function ServiceImageContent(props: ServiceProps) {
  return (
    <div className={styles.serviceTopImgWrap}>
      <div className="container">
        <div className="row">
          {props?.position ? (
            <>
              <div className="col-xs-12 col-sm-12 col-md-5 col-xl-5 col-lg-5">
                <div className={`reveald ${styles.serviceTopTx}`}>
                  <h5 className="fadeup-sma">{props.sort_title}</h5>
                  <h2 className="fadeup-sma">{props.title}</h2>
                  <HtmlContent content={props.details} />
                </div>
                <div className={styles.serviceInfo}>
                  <h4>{props.costs_title}</h4>
                  <HtmlContent content={props.costs_details} />
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-7 col-xl-7 col-lg-7">
                <div className={`reveal ${styles.serviceTopImg}`}>
                  <div className={`image-wrap ${styles.serviceImgOne}`}>
                    <ImageResponsive
                      width={570}
                      height={404}
                      src={`${process.env.NEXT_PUBLIC_API_IMAGES_URL}/image/${props?.photo}`}
                      alt={props.title}
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="col-xs-12 col-sm-12 col-md-7 col-xl-7 col-lg-7">
                <div className={`reveal ${styles.serviceTopImg}`}>
                  <div className={`image-wrapa ${styles.serviceImgOne}`}>
                    <ImageResponsive
                      width={570}
                      height={404}
                      src={`${process.env.NEXT_PUBLIC_API_IMAGES_URL}/image/${props?.photo}`}
                      alt={props.title}
                    />
                  </div>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-5 col-xl-5 col-lg-5">
                <div className={`reveal ${styles.serviceTopTx}`}>
                  <h5 className="fadeup-sma">{props.sort_title}</h5>
                  <h2 className="fadeup-sma">{props.title}</h2>
                  <HtmlContent content={props.details} />
                </div>
                <div className={styles.serviceInfo}>
                  <h4>{props.costs_title}</h4>
                  <HtmlContent content={props.costs_details} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
