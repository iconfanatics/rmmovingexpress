import { useMutation } from "react-query";
import useAxios from "../useAxios";

const useQuoteMutation = () => {
  const axios = useAxios();

  const quoteInsert = (newContactData: any) =>
    axios.post("/common/quote/", newContactData);

  return useMutation(quoteInsert, {
    onSuccess: (data) => {
      console.log(data);
    },
  });
};
export default useQuoteMutation;
