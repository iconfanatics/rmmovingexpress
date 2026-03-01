import { useQuery } from "react-query";
import useAxios from "../useAxios";

const useFetchBlog = () => {
  const axios = useAxios();
  const fetchBlog = () => axios.get("/common/blog/all");
  return useQuery(["blog-all"], () => fetchBlog(), {
    refetchOnWindowFocus: false,
  });
};

export default useFetchBlog;
