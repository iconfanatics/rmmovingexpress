import { useQuery } from "react-query";
import useAxios from "../useAxios";

const useFetchBlogDetails = () => {
  const axios = useAxios();
  const fetchBlogDetails = () => axios.get("/common/blog/details");
  return useQuery(["blog-details"], () => fetchBlogDetails(), {
    refetchOnWindowFocus: false,
  });
};

export default useFetchBlogDetails;
