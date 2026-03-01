import { Blog } from "@/@types/blog";
import Header from "@/components/header";
import blogAPI from "@/services/blogApi";
import { findBlogBySlug } from "@/utils/blogHelper";
import { Metadata } from "next";
import BlogDetailClient from "./BlogDetailClient";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const blogs: Blog[] = await blogAPI.getBlog();
  const post = findBlogBySlug(blogs, params.slug);

  if (!post) {
    return {
      title: "Post Not Found | RM Moving Express",
      description: "This blog post could not be found.",
    };
  }

  return {
    title: `${post.title} | RM Moving Express`,
    description: post?.details ?? post?.description ?? "",
    openGraph: {
      title: post.title,
      description: post?.details ?? post?.description ?? "",
      images: post?.photo ? [post.photo] : [],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const blogs: Blog[] = await blogAPI.getBlog();

  return (
    <>
      <Header />
      <BlogDetailClient slug={params.slug} blogs={blogs} />
    </>
  );
}

// import Header from "@/components/header";
// import blogAPI from "@/services/blogApi";
// import { findBlogBySlug } from "@/utils/blogHelper";
// import { Metadata } from "next";
// import BlogDetailClient from "./BlogDetailClient";

// export async function generateMetadata(props: {
//   params: { slug: string };
// }): Promise<Metadata> {
//   const params = await props.params;

//   const data = await blogAPI.getBlog();
//   const post = findBlogBySlug(data, params.slug);

//   if (!post) {
//     return {
//       title: "Post Not Found | RM Moving Express",
//       description: "This blog post could not be found.",
//     };
//   }

//   return {
//     title: `${post.title} | RM Moving Express`,
//     description: post.details,
//   };
// }

// export default async function BlogDetailPage(props: {
//   params: { slug: string };
// }) {
//   const params = await props.params;
//   const slug = params.slug;

//   const data = await blogAPI.getBlog();

//   return (
//     <>
//       <Header />
//       <BlogDetailClient slug={slug} blogs={data?.data || []} />
//     </>
//   );
// }
