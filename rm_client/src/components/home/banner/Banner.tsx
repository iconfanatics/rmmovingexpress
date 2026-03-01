"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import styles from "../../../styles/component/_banner.module.scss";

export default function Banner() {
  const [isClient, setIsClient] = useState(false);
  const awesomeVideo = "/sadf.mp4";

  useEffect(() => {
    setIsClient(true); // Ensures we're only in the client
  }, []);

  if (!isClient) {
    return null; // Prevents the component from rendering on SSR
  }
  return (
    <div className={`video-wrapper ${styles.videoWrap}`}>
      <div className="container h100">
        <div className="row h100">
          <div className="col h100">
            <div className={styles.bannerContent}>
              <h2>Professional Movers for Stress Free Shifting</h2>
              <p>
                RM Moving Express provides fast, secure, and cost-effective
                moving services for homes and businesses in Christchurch and
                across New Zealand.
              </p>
              <Link href="/moving-quote">Get Quotes</Link>
            </div>
          </div>
        </div>
      </div>
      <ReactPlayer
        url={awesomeVideo}
        playing
        loop
        muted
        width="100%"
        height="100%"
        className="react-player"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -2,
        }}
      />
    </div>
  );
}
