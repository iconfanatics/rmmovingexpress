import { useQuery } from "react-query";
import useAxios from "../useAxios";

const useTestimonial = () => {
  const axios = useAxios();
  const fetchBlog = () => axios.get("/common/home/testimonial/all");
  return useQuery(["home-testimonial-all"], () => fetchBlog(), {
    refetchOnWindowFocus: false,
  });
};

export default useTestimonial;
