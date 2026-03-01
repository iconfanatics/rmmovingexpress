import { ResponsiveImgProps } from "@/@types/common";
import Image from "next/image";
import styles from "../../styles/component/_image.module.scss";

export default function ImageResponsive(props: ResponsiveImgProps) {
  return (
    <div className={styles.responsiveImg}>
      <Image
        width={props.width}
        height={props.height}
        src={props.src}
        alt={props.alt}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
}
