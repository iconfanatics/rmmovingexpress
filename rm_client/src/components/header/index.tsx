// "use client";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import styles from "../../styles/component/_header.module.scss";
import MobileMenu from "./MobileMenu";
import Nav from "./Nav";
// gsap.registerPlugin(ScrollTrigger);

const Header = () => {
  return (
    <div className={styles.header}>
      <div className="container">
        <div className="row">
          <div className="col-6 col-sm-6 col-md-6 col-lg-2">
            <div className={styles.logo}>
              <Image
                className="logo"
                src="/logo.png"
                alt="Logo"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          {/* <div className="col-sm-12 col-md-7 col-lg-10 d-none d-xl-block"> */}
          <div className="col-6 col-sm-6 col-md-6 col-lg-10">
            <div className={styles.navMenuWrap}>
              <Nav />
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
