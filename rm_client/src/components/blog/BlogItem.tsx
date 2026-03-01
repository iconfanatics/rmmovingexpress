import Link from "next/link";
import styles from "../../styles/page/_blog.module.scss";
import ImageResponsive from "../image/ImageResponsive";

interface BlogDetailClientProps {
  title: string;
  details: string;
  photo: string;
  slug: any;
  blogs: any[];
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

export default function BlogItem(props: BlogDetailClientProps) {
  console.log("asfsad");
  console.log(
    `${process.env.NEXT_PUBLIC_API_IMAGES_URL}/image/${props?.photo}`
  );
  console.log("asfsad");

  return (
    <div className={styles.blogItem}>
      <div className={`image-wrap ${styles.blogImg}`}>
        <ImageResponsive
          width={160}
          height={160}
          src={`${process.env.NEXT_PUBLIC_API_IMAGES_URL}/image/${props?.photo}`}
          alt="Expert Cleaning Partner"
        />
      </div>
      <Link href={`/blog/${slugify(props.title)}`}>{props.title}</Link>
    </div>
  );
}
