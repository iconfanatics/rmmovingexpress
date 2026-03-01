import useFetchBlogDetails from "@/hooks/queries/useFetchBlogDetails";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/page/_blog.module.scss";

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

const BlogSidebar = () => {
  const { data: blogsData, isLoading, isFetching } = useFetchBlogDetails();

  if (isLoading || isFetching) {
    return <div className="p-6">Loading...</div>;
  }
  return (
    <div className="col-md-4">
      <div className={styles.blogSideber}>
        <div className={styles.latestBlog}>
          <h2>Latest Post</h2>

          {blogsData?.data?.data?.map((item: any, i: number) => (
            <div key={i} className={styles.latestItem}>
              <Image width={60} height={60} src="/blog.jpg" alt={item.title} />
              <Link href={`/blog/${slugify(item.title)}`}>{item.title}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSidebar;
