import { TestimonialPropsItem } from "@/@types/home";
import { convertDate } from "@/utils/utils";
import Image from "next/image";
import styles from "../../styles/component/_testimonial.module.scss";
import TextAvatar from "../avatar/TextAvatar";
import HtmlContent from "../HtmlContent";

export default function TestimonialItem(props: TestimonialPropsItem) {
  return (
    <div className={styles.testimonialSliderWrap}>
      <div className={styles.testimonialHead}>
        <div className={styles.testimonialHeadLeft}>
          {props.photo ? (
            <>
              <div className={styles.testimonialImg}>
                <Image
                  width={90}
                  height={90}
                  src={`${process.env.NEXT_PUBLIC_API_IMAGES_URL}/image/${props?.photo}`}
                  alt={props.f_name}
                />
              </div>
            </>
          ) : (
            <TextAvatar name={props.f_name} />
          )}

          <div className={styles.testimonialName}>
            <h3>
              {props.f_name} {props.l_name}
            </h3>
            {/* <h6>{props.date}</h6> */}
            <h6>{convertDate(props.created_at)}</h6>
          </div>
        </div>

        <Image width={20} height={20} src={"./google.svg"} alt={props.f_name} />
      </div>
      <div className={styles.testimonialStar}>
        {Array.from({ length: props.star }, (_, index) => (
          <Image
            key={index}
            width={17}
            height={17}
            src={"./star.svg"}
            alt={props.f_name}
          />
        ))}
        <div className={styles.verifiedReview}>
          <div className={styles.reviewNot}>
            Trustindex verifies that the original source of the review is
            Google.
          </div>
        </div>
      </div>

      <div className={styles.messageWrap}>
        <h5>
          <HtmlContent content={props.details} />
        </h5>
      </div>
    </div>
  );
}
