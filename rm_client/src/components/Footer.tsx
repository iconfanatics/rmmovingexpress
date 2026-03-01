"use client";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/component/_footer.module.scss";
import TopArrow from "./Icon/TopArrow";

export default function Footer() {
  const [show, setShow] = useState(false);
  const btnRef = useRef(null);

  // ✅ Show/Hide button on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShow(true);
      } else {
        setShow(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Animate button appear / disappear with GSAP
  useEffect(() => {
    if (btnRef.current) {
      if (show) {
        gsap.to(btnRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        });
      } else {
        gsap.to(btnRef.current, {
          autoAlpha: 0,
          y: 100,
          duration: 0.5,
          ease: "power3.in",
        });
      }
    }
  }, [show]);

  // ✅ Scroll to top smoothly
  const scrollToTop = () => {
    // If using Locomotive/Lens smooth scroll, trigger their scroll function
    // Otherwise fallback to native smooth scroll
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.footer}>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-4 col-xl-4 col-lg-4">
            <div className={styles.footerAbout}>
              <div className={styles.footerLogo}>
                <Image
                  className="logo"
                  width={200}
                  height={89}
                  src="/logo-whtie.png"
                  alt="Logo"
                />
              </div>
              <p>
                Experts on Christchurch Canterbury, southisland and inter-city
                movers, we at RM Moving express are all about providing a
                hassle-free moving service, be it a house, office or Commercial
                move.
              </p>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4 col-xl-4 col-lg-4">
            <div className={styles.footerMenu}>
              <h3>Useful Links</h3>
              <ul>
                <li>
                  <Link href="/terms-and-conditions">Terms And Conditions</Link>
                </li>
                <li>
                  <Link href="/privacy-policy">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/blog">Blog</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4 col-xl-4 col-lg-4">
            <div className={styles.footerMenu}>
              <h3>Contact</h3>
              <ul>
                <li>Phone: +64284215199</li>
                <li>Email: info@rmmovingexpress.com</li>
                <li>36 mathesons road philipstown, Christchurch 8011 </li>
              </ul>
            </div>
            <button
              ref={btnRef}
              onClick={scrollToTop}
              className={styles.goToTop}
              style={{ opacity: 0, transform: "translateY(100px)" }}
            >
              <TopArrow Color="#000" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
