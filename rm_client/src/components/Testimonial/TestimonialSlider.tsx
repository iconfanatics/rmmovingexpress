"use client";
import { TestimonialPropsItem } from "@/@types/home";
import useTestimonial from "@/hooks/queries/useTestimonial";
import Image from "next/image";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "../../styles/component/_testimonial.module.scss";
import Loader from "../Loader/loading";
import Title from "../Title";
import TestimonialItem from "./TestimonialItem";

// const testimonialData: TestimonialPropsItem[] = [
//   {
//     message:
//       "Excellent company! Quick and easy communication, on time and efficient! Thank you so much. Also, it was a very reasonable price! Thank you",
//     location: "Long distance House moving, Linwood ",
//     name: "Danielle Ellis",
//     photo: null,
//   },
//   {
//     message:
//       "Excellent company! Quick and easy communication, on time and efficient! Thank you so much. Also, it was a very reasonable price! Thank you so much.",
//     location: "Address needed",
//     name: "Amanda",
//     photo: "/about/3.jpg",
//   },
//   {
//     message:
//       "Absolute life savers! 10/10! Rapid Movers were able to help us move at late notice which we were super grateful for! A very professional and efficient team. Made the process so easy and smooth. Thank you so much!",
//     name: "Melissa Mc",
//     location: "Address needed",
//     photo: null,
//   },
//   {
//     message:
//       "A huge thanks to JJ for making the move so much less stressful! The team handled everything promptly and professionally.",
//     location: "Address needed",
//     name: "Christophilarry Alex",
//     photo: null,
//   },
//   {
//     message: "Very quick and efficient, would recommend",
//     location: "Address needed",
//     name: "Maryann Cain",
//     photo: null,
//   },
//   {
//     message:
//       "Great service, skilled workers, efficient, very polite and pleasant. Definitely recommend.",
//     location: "Address needed",
//     name: "Maryann Cain",
//     photo: null,
//   },
// ];

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function TestimonialSlider() {
  const { data, isLoading, isFetching } = useTestimonial();

  console.log("TestimonialSlider ff");
  console.log(data);
  console.log("TestimonialSlider");

  const [initialRenderComplete, setInitialRenderComplete] = useState(false);

  useEffect(() => {
    setInitialRenderComplete(true);
  }, []);

  if (isLoading || isFetching) return <Loader />;
  return (
    <div className={styles.testimonial}>
      <div className="container">
        <div className="row">
          <Title title="Happy Customers" subtitle="See what our clients say" />
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-4 col-xl-4 col-lg-4">
            <div className={styles.reviewGoogle}>
              <h3>EXCELLENT</h3>
              <div className={styles.googleStar}>
                <Image width={30} height={30} src={"./star.svg"} alt={"star"} />
                <Image width={30} height={30} src={"./star.svg"} alt={"star"} />
                <Image width={30} height={30} src={"./star.svg"} alt={"star"} />
                <Image width={30} height={30} src={"./star.svg"} alt={"star"} />
                <Image width={30} height={30} src={"./star.svg"} alt={"star"} />
              </div>
              <h5>
                Based on <b>128 reviews</b>
              </h5>
              <div className={styles.googleLogo}>
                <Image
                  width={110}
                  height={35}
                  src={"./googleLogo.svg"}
                  alt={"star"}
                />
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-8 col-xl-8 col-lg-8">
            {initialRenderComplete ? (
              <>
                {data?.data ? (
                  <>
                    <Carousel
                      // autoPlay
                      infinite={true}
                      responsive={responsive}
                      additionalTransfrom={0}
                      showDots={true}
                      className={styles.serviceSlider}
                      dotListClass={`${styles.testimonialDotList} testimonial-dot-list`}
                      arrows={false}
                      autoPlaySpeed={5000}
                      centerMode={false}
                      containerClass="container-with-dots"
                      draggable
                      focusOnSelect={false}
                      itemClass=""
                      keyBoardControl
                      minimumTouchDrag={80}
                      pauseOnHover
                      renderArrowsWhenDisabled={false}
                      renderButtonGroupOutside={false}
                      renderDotsOutside={false}
                    >
                      {data?.data?.map((item: TestimonialPropsItem) => (
                        <TestimonialItem
                          f_name={item.f_name}
                          l_name={item.l_name}
                          details={item.details}
                          created_at={item.created_at}
                          star={item.star}
                          photo={item.photo}
                        />
                      ))}
                    </Carousel>
                  </>
                ) : null}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
