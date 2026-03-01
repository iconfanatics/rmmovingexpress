import { useQuery } from "react-query";
import useAxios from "../useAxios";

const useFetchTeam = () => {
  const axios = useAxios();
  const fetchTeam = () => axios.get("/common/company/team");
  return useQuery(["company-team"], () => fetchTeam(), {
    refetchOnWindowFocus: false,
  });
};

export default useFetchTeam;
