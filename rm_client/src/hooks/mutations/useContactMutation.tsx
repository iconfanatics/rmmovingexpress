import { useMutation } from "react-query";
import useAxios from "../useAxios";

const useContactMutation = () => {
  const axios = useAxios();

  const contactInsert = (newContactData: any) =>
    axios.post("/common/contact/", newContactData);

  return useMutation(contactInsert, {
    onSuccess: (data) => {
      console.log(data);
    },
  });
};
export default useContactMutation;
