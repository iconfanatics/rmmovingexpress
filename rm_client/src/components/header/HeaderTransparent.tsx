import Image from "next/image";
import styles from "../../styles/component/_header.module.scss";
import MobileMenu from "./MobileMenu";
import Nav from "./Nav";

const HeaderTransparent = async () => {
  return (
    <div className={`${styles.header} ${styles.headerTransparent}`}>
      <div className="container">
        <div className="row">
          <div className="col-6 col-sm-6 col-md-6 col-lg-2">
            <div className={styles.logo}>
              {/* <Image
                className="logo"
                src="/logo.webp"
                alt="Logo"
                width={190}
                height={80}
              /> */}
              <Image
                className="logo"
                src="/logo.webp"
                alt="Logo"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
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

export default HeaderTransparent;
