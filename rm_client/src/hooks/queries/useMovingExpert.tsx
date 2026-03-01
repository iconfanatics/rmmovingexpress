import { useQuery } from "react-query";
import useAxios from "../useAxios";

const useMovingExpert = () => {
  const axios = useAxios();
  const fetchBlog = () => axios.get("/common/home/moving/expert/all");
  return useQuery(["moving-expert-all"], () => fetchBlog(), {
    refetchOnWindowFocus: false,
  });
};

export default useMovingExpert;
