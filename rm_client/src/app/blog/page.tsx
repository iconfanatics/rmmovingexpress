"use client";
import BlogItem from "@/components/blog/BlogItem";
import Header from "@/components/header";
import IntersectionAnimationWrapper from "@/components/IntersectionAnimationWrapper";
import Loader from "@/components/Loader/loading";
import Title from "@/components/Title";
import useFetchBlog from "@/hooks/queries/useFetchBlog";
import Link from "next/link";
import styles from "../../styles/page/_blog.module.scss";

interface BlogProps {
  id: number;
  title: string;
  details: any;
  photo: string;
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

export default function page() {
  const { data, isLoading, isFetching } = useFetchBlog();

  if (isLoading || isFetching) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <IntersectionAnimationWrapper>
      <Header />
      <div className={styles.blog}>
        <div className="container">
          <div className="row">
            <Title
              title="Blog"
              subtitle="RM Moving Express Blog: Trusted Relocation Tips, Moving Guides, and Stories from Across New Zealand"
            />
          </div>
          <div className={`reveal ${styles.blogWrap}`}>
            <div className="row">
              {data?.data?.map((post: BlogProps) => (
                <div
                  className="col-xs-12 col-sm-12 col-md-4 col-xl-4 col-lg-4"
                  key={post.id}
                >
                  <Link href={`/blog/${slugify(post.title)}`}>
                    <BlogItem
                      title={post.title}
                      details={post.details}
                      photo={post.photo}
                      slug={undefined}
                      blogs={[]}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </IntersectionAnimationWrapper>
  );
}
