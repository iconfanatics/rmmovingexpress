import { PageSectionProps } from "@/@types/service";
import Link from "next/link";
import styles from "../../styles/component/_page_section.module.scss";

export default function PageSection(props: PageSectionProps) {
  return (
    <div className={styles.pageSection}>
      <div className={styles.pageSectionInner}>
        <div className="container">
          <div className="row">
            <div className={styles.pageSectionContainer}>
              <h1>{props.page_title}</h1>
              <p>{props.page_sub_title}</p>
              <Link href="/moving-quote">Get a Quote</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
