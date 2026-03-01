import * as yup from "yup";

export const QuoteSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  flavor: yup.object().shape({
    value: yup.string().required("Flavor is required"),
    label: yup.string(),
  }),
  sdf: yup.object().shape({
    value: yup.string().required("Selection is required"),
    label: yup.string(),
  }),
  radioOption: yup.string().required("You must select a fruit"),
  date: yup.date().required("Date is required"),
  dateNew: yup.date().required("Date is required"),
});
