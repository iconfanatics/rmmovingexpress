"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "../../styles/component/_mobile_menu.module.scss";
import CloseIcon from "../Icon/CloseIcon";
import MenuIcon from "../Icon/MenuIcon";

const MobileMenu = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = (menu: string) => {
    setActiveDropdown((prev) => (prev === menu ? null : menu));
  };

  const handleLinkClick = () => {
    setActiveDropdown(null);
    setIsSidebarOpen(false);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setIsSidebarOpen(false);
      setActiveDropdown(null);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isSidebarOpen]);

  return (
    <>
      {/* Open Menu Icon */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className={styles.mobMenuIcon}
      >
        <MenuIcon Color="#148e8b" />
      </button>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`${styles.mobileMenu} ${
          isSidebarOpen ? styles.showSidebar : ""
        }`}
      >
        <div className={styles.mobileHeader}>
          <div className={styles.logo}>
            <Image src="/logo.png" alt="Logo" width={80} height={38} />
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className={styles.mobCloseIcon}
          >
            <CloseIcon Color="#fff" />
          </button>
        </div>

        <nav className={styles.navbarMobile}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href="/" onClick={handleLinkClick}>
                Home
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/about-us" onClick={handleLinkClick}>
                About
              </Link>
            </li>

            {/* Services Dropdown */}
            <li className={styles.navItem}>
              <button onClick={() => toggleDropdown("services")}>
                Services
              </button>
              {activeDropdown === "services" && (
                <ul className={styles.subMenuWrap}>
                  <li>
                    <Link
                      href={`/service/local-moving`}
                      onClick={handleLinkClick}
                    >
                      Local Moving
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/service/cleaning-decluttering`}
                      onClick={handleLinkClick}
                    >
                      Cleaning and Decluttering Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/service/single-item-movers`}
                      onClick={handleLinkClick}
                    >
                      Single Item Movers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/service/office-furniture-moving`}
                      onClick={handleLinkClick}
                    >
                      Office Furniture Moving Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/service/long-distance-moving`}
                      onClick={handleLinkClick}
                    >
                      Long Distance Moving Services
                    </Link>
                  </li>

                  <li>
                    <Link
                      href={`/service/house-relocation`}
                      onClick={handleLinkClick}
                    >
                      House Relocation Services
                    </Link>
                  </li>

                  <li>
                    <Link
                      href={`/service/piano-shifting`}
                      onClick={handleLinkClick}
                    >
                      Piano Shifting Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/service/nort-south-island-moving`}
                      onClick={handleLinkClick}
                    >
                      North & South Island Moving
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/service/bike-car-boat-transport`}
                      onClick={handleLinkClick}
                    >
                      Bike, Car & Boat Transport
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/service/kitchen-cabinet-delivery`}
                      onClick={handleLinkClick}
                    >
                      Kitchen Cabinet Delivery
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/service/senior-movers`}
                      onClick={handleLinkClick}
                    >
                      Senior Movers
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li className={styles.navItem}>
              <Link href="/contact-us" onClick={handleLinkClick}>
                Contact Us
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/moving-quote" onClick={handleLinkClick}>
                Get A Quote
              </Link>
            </li>
            <li className={`${styles.navItem} ${styles.callUs}`}>
              <a href="tel:+64284215199" className="text-blue-600 underline">
                Call Us: +64284215199
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default MobileMenu;
