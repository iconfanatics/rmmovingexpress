import { useQuery } from "react-query";
import useAxios from "../useAxios";

const useHomeService = () => {
  const axios = useAxios();
  const fetchBlog = () => axios.get("/common/home/service/all");
  return useQuery(["home-service-all"], () => fetchBlog(), {
    refetchOnWindowFocus: false,
  });
};

export default useHomeService;
