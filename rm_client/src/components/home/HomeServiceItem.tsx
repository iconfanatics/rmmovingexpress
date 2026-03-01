import { HomeServiceProps } from "@/@types/home";
import Link from "next/link";
import styles from "../../styles/component/_homeService.module.scss";

export default function HomeServiceItem(props: HomeServiceProps) {
  return (
    <div className={`reveal ${styles.serviceItem}`}>
      <div className={`fadeup-smaa ${styles.serviceContent}`}>
        {/* <i>{props?.icon}</i> */}
        <h2>{props?.title}</h2>
        <p>{props?.details}</p>
      </div>
      <div className={styles.readMore}>
        <Link href={`/service/${props?.link}`} className="fadeup-smdd">
          Read More
        </Link>
      </div>
    </div>
  );
}
