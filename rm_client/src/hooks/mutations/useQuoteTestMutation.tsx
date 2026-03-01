import { useMutation } from "react-query";
import useAxios from "../useAxios";

const useQuoteTestMutation = () => {
  const axios = useAxios();

  const quoteTestInsert = (newContactData: any) =>
    axios.post("/common/quotetestupload/", newContactData);

  return useMutation(quoteTestInsert, {
    onSuccess: (data) => {
      console.log(data);
    },
  });
};
export default useQuoteTestMutation;
