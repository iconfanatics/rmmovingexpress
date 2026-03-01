import { useQuery } from "react-query";
import useAxios from "../useAxios";

const useFetchBlogSingle = (slug: string) => {
  const axios = useAxios();
  const fetchBlogDetails = () => axios.get(`/common/blog/${slug}`);
  return useQuery(["blog-single"], () => fetchBlogDetails(), {
    refetchOnWindowFocus: false,
  });
};

export default useFetchBlogSingle;
