"use client";
import { TestimonialImgProps } from "@/@types/home";
import useTestimonial from "@/hooks/queries/useTestimonial";
import Image from "next/image";
import "react-multi-carousel/lib/styles.css";
import styles from "../../styles/component/_testimonial.module.scss";
import TitleCenter from "../Title/TitleCenter";
import TestimonialSlider from "./TestimonialSlider";

export default function Testimonial() {
  const { data, isLoading, isFetching } = useTestimonial();

  return (
    <div className={styles.testimonialWrap}>
      <div className="container">
        <div className={styles.testimonialMap}>
          <div className="row">
            <div className="col-xs-12 col-md-12">
              <TitleCenter
                title="What They Are Talking"
                subtitle="Testimonials"
                details="See what our clients have to say about their experiences with Najd Castles. Our commitment to quality and customer satisfaction speaks through their success stories."
              />
            </div>
          </div>

          <div className="row">
            <div className="hidden-md col-lg-3"></div>
            <div className="col-xs-12 col-md-12 col-lg-6">
              <div className={styles.testimonialSliderContent}>
                <div className={styles.testimonialProfile}>
                  {data?.data ? (
                    <>
                      {data?.data.map((itemImg: TestimonialImgProps) => (
                        <>
                          <div className={styles.testimonialProfileItem}>
                            <Image
                              width={76}
                              height={76}
                              src={`${process.env.NEXT_PUBLIC_API_IMAGES_URL}/image/${itemImg.photo}`}
                              alt={itemImg.name}
                            />
                          </div>
                        </>
                      ))}
                    </>
                  ) : null}
                </div>
                <TestimonialSlider data={data?.data} />
              </div>
            </div>
            <div className="hidden-md col-lg-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
