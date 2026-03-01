"use client";

import HtmlContent from "@/components/HtmlContent";
import ImageResponsive from "@/components/image/ImageResponsive";
import IntersectionAnimationWrapper from "@/components/IntersectionAnimationWrapper";
import Loader from "@/components/Loader/loading";
import useFetchBlog from "@/hooks/queries/useFetchBlog";
import Link from "next/link";
import styles from "../../../styles/page/_blog.module.scss";

interface Blog {
  id: string;
  title: string;
  details: string;
  photo?: string;
}

interface BlogDetailClientProps {
  slug: any;
  blogs: any;
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

export default function BlogDetailClient({ slug }: BlogDetailClientProps) {
  const { data, isLoading, isFetching } = useFetchBlog();
  console.log(data);
  const post = data?.data?.find((p: any) => slugify(p.title) === slug);

  console.log("post");
  console.log(post);
  console.log("post");

  if (!post) {
    return <h1 className="p-6 text-red-500">Post not found</h1>;
  }

  if (isLoading || isFetching) {
    return <Loader />;
  }

  return (
    <IntersectionAnimationWrapper>
      <div className={styles.blogDetailsWrap}>
        <div className="container">
          <div className="row">
            {/* Blog Content */}
            <div className="col-xs-12 col-sm-12 col-md-8 col-xl-8 col-lg-8">
              <div className={styles.blogDetails}>
                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                <div>
                  <ImageResponsive
                    width={160}
                    height={160}
                    src={`${process.env.NEXT_PUBLIC_API_IMAGES_URL}/image/${post?.photo}`}
                    alt={post.title}
                  />
                </div>
                <div className="text-lg leading-relaxed">
                  <HtmlContent content={post.details} />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-xs-12 col-sm-12 col-md-4 col-xl-4 col-lg-4">
              <div className={styles.blogSideber}>
                <div className={styles.latestBlog}>
                  <h2>Latest Post</h2>
                  {data?.data?.slice(0, 5).map((item: any, i: number) => (
                    <div key={i} className={styles.latestItem}>
                      <div className={styles.latestItemImg}>
                        <ImageResponsive
                          width={60}
                          height={60}
                          src={`${process.env.NEXT_PUBLIC_API_IMAGES_URL}/image/${item?.photo}`}
                          alt={item.title}
                        />
                      </div>
                      <Link href={`/blog/${slugify(item.title)}`}>
                        {item.title}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </IntersectionAnimationWrapper>
  );
}
