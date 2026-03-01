"use client";
import { ServiceMenuProps } from "@/@types/common";
import useFetchServiceMenu from "@/hooks/queries/useFetchServiceMenu";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "../../styles/component/_header.module.scss";
import PhoneIcon from "../Icon/PhoneIcon";
import Loader from "../Loader/loading";

export default function Nav() {
  const {
    data: serviceMenuData,
    isLoading,
    isFetching,
  } = useFetchServiceMenu();

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const toggleDropdown = (menuName: string) => {
    setActiveDropdown((prevMenu) => (prevMenu === menuName ? null : menuName));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        activeDropdown &&
        dropdownRefs.current[activeDropdown] &&
        !dropdownRefs.current[activeDropdown]?.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDropdown]);

  // Close dropdown when clicking a link
  const handleLinkClick = () => {
    setActiveDropdown(null);
  };

  if (isLoading || isFetching) {
    return <Loader />;
  }

  return (
    <nav className={styles.navbar} id="nav">
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href={"/"} onMouseOver={() => toggleDropdown("home")}>
            Home
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href={"/about-us"} onMouseOver={() => toggleDropdown("home")}>
            About
          </Link>
        </li>
        <li className={styles.navItem}>
          <button onMouseOver={() => toggleDropdown("menu2")}>Services</button>
          <div
            ref={(el) => {
              dropdownRefs.current["menu2"] = el;
            }}
            className={`${styles.dropdown} ${
              activeDropdown === "menu2" ? `${styles.open}` : ""
            }`}
          >
            <ul>
              {serviceMenuData?.data?.map((item: ServiceMenuProps) => (
                <li key={item.id}>
                  <Link
                    href={`/service/${item.pretty_name}`}
                    onClick={handleLinkClick}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </li>

        {/* <li className={styles.navItem}>
          <Link
            href={"/cubic-meter-calculator"}
            onMouseOver={() => toggleDropdown("projects")}
          >
            Moving Cost
          </Link>
        </li> */}

        <li className={styles.navItem}>
          <Link
            href={"/contact-us"}
            onMouseOver={() => toggleDropdown("contact")}
          >
            Contact Us
          </Link>
        </li>
        <li className={`${styles.navItem}`}>
          <Link
            href={"/moving-quote"}
            onMouseOver={() => toggleDropdown("appointment")}
            className={styles.appointmentBtn}
          >
            Get A Quote
          </Link>
        </li>
        <li className={`${styles.navItem} ${styles.callUs}`}>
          <Link href="tel:+64284215199" className={styles.appointmentBtn}>
            <PhoneIcon Color="white" />
            Call Us: +64284215199
          </Link>
        </li>
      </ul>
    </nav>
  );
}
