import { Blog } from "@/@types/blog";
import { BASE_URL } from "@/config/constants";

// src/api/blogApi.ts
const getBlog = async (): Promise<Blog[]> => {
  const res = await fetch(`${BASE_URL}/common/blog/all`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  const data = await res.json();
  return data?.data || [];
};

const blogAPI = {
  getBlog,
};

export default blogAPI;

// const getBlog = async () => {
//   const res = await fetch(`${BASE_URL}/common/blog/all`, { cache: "no-store" });

//   if (!res.ok) {
//     throw new Error("Failed to fetch blogs");
//   }

//   const data = await res.json();
//   return data;
// };

// const blogAPI = {
//   getBlog,
// };

// export default blogAPI;
