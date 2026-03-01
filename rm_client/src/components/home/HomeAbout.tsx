"use client";
import useMovingExpert from "@/hooks/queries/useMovingExpert";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "../../styles/component/_homeAbout.module.scss";
import HtmlContent from "../HtmlContent";
import Loader from "../Loader/loading";

interface MovingExpertProps {
  id: number;
  title: string;
  sort_title: string;
  details: string;
  photo: string;
}

export default function HomeAbout() {
  const { data, isLoading, isFetching } = useMovingExpert();

  const imgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isLoading || isFetching) return;
    if (!imgRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const anim = gsap.fromTo(
      imgRef.current,
      { right: "100%" },
      {
        right: "0%",
        scrollTrigger: {
          trigger: imgRef.current,
          scrub: true,
          start: "top bottom",
          end: "bottom top",
        },
      }
    );

    // TS-safe cleanup
    return () => {
      anim.kill();
    };
  }, [isLoading, isFetching]);

  if (isLoading || isFetching) {
    return <Loader />;
  }

  return (
    <div className="container">
      {data?.data?.map((item: MovingExpertProps) => (
        <div key={item.id}>
          <div className={`reveal ${styles.homeAbout}`}>
            <h4 className="fadeup-smd">{item.sort_title}</h4>
            <h1 className="fadeup-smd"> {item.title}</h1>
            <p className="fadeup-smd">
              {" "}
              <HtmlContent content={item.details} />{" "}
            </p>
          </div>
          <div className={styles.homeAboutImgWrap}>
            <div className={styles.homeAboutImgContent} ref={imgRef}>
              <div className={styles.homeAboutImg}>
                <Image
                  className="logo"
                  width={499}
                  height={250}
                  src={`${process.env.NEXT_PUBLIC_API_IMAGES_URL}/image/${item?.photo}`}
                  alt="Logo"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
