"use client";
import useContactMutation from "@/hooks/mutations/useContactMutation";
import { useState } from "react";
import * as yup from "yup";
import styles from "../../styles/component/_contact_us.module.scss";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  subject: yup.string().nullable(),
  message: yup.string().required("Message is required"),
});

const ContactFormTest = () => {
  const [showSuccess, setShowSuccess] = useState(true);
  const [message, setMessage] = useState<string | null>("");

  const {
    mutate: contactUser,
    data: contactPostData,
    isSuccess: contactPostIsSuccess,
    isLoading: contactLoading,
    isIdle,
    isError,
  } = useContactMutation();

  const handleChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleCashConvert = () => {
    console.log(message);

    contactUser({
      contactInfo: {
        name: "name",
        email: "miii@gafd.com",
        phone: "1254568789",
        subject: "subject",
        message: message,
      },
    });
  };

  return (
    <div className="row">
      <div className="col-xs-12 col-sm-12 col-md-6 col-xl-6 col-lg-6">
        <div className={styles.inputItem}>
          <label>Name</label>
          <input onChange={handleChangeMessage} type="text" />
        </div>
      </div>

      {/* <button type="submit" className={styles.submitBtn}>
            Submit
          </button> */}
      <button onClick={handleCashConvert}>Submit</button>
    </div>
  );
};

export default ContactFormTest;
