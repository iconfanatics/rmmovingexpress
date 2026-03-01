import { useQuery } from "react-query";
import useAxios from "../useAxios";

const useFetchServicePage = (prettyName: string) => {
  const axios = useAxios();
  const fetchServicePage = () => axios.get(`/common/services/${prettyName}`);
  return useQuery(["service-page", prettyName], () => fetchServicePage(), {
    refetchOnWindowFocus: false,
  });
};
export default useFetchServicePage;
