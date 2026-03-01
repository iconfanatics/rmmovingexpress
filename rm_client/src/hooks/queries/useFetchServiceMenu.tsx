import { useQuery } from "react-query";
import useAxios from "../useAxios";

const useFetchServiceMenu = () => {
  const axios = useAxios();
  const fetchServiceMenu = () => axios.get("/common/services/menu");
  return useQuery(["service-menu"], () => fetchServiceMenu(), {
    refetchOnWindowFocus: false,
  });
};

export default useFetchServiceMenu;
