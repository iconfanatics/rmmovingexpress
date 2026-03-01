// src/utils/blogHelper.ts
import { Blog } from "@/@types/blog";
import { slugify } from "./slugify";

// export function findBlogBySlug(blogs: any[], slug: string) {
//   return blogs.find((b) => slugify(b.title) === slug);
// }

export function findBlogBySlug(blogs: Blog[], slug: string): Blog | undefined {
  return blogs.find((b) => slugify(b.title) === slug);
}
