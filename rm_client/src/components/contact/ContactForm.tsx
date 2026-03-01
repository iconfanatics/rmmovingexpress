"use client";
import useContactMutation from "@/hooks/mutations/useContactMutation";
import { useEffect, useState } from "react";
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

const ContactForm = () => {
  const [showSuccess, setShowSuccess] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const {
    mutate: contactUser,
    data: contactPostData,
    isSuccess: contactPostIsSuccess,
    isLoading: contactLoading,
    isIdle,
    isError,
  } = useContactMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Hide success message after 3 seconds
  useEffect(() => {
    if (contactPostIsSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);

      return () => clearTimeout(timer); // cleanup
    }
  }, [contactPostIsSuccess]);

  // api request for Insert data
  const handleSubmit = async () => {
    contactUser({
      contactInfo: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        message: form.message,
      },
    });
  };

  return (
    <div className={styles.contactForm}>
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-6 col-xl-6 col-lg-6">
          <div className={styles.inputItem}>
            <label>Name</label>
            <input name="name" value={form.name} onChange={handleChange} />
          </div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-6 col-xl-6 col-lg-6">
          <div className={styles.inputItem}>
            <label>Email</label>
            <input name="email" value={form.email} onChange={handleChange} />
          </div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-6 col-xl-6 col-lg-6">
          <div className={styles.inputItem}>
            <label>Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} />
          </div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-6 col-xl-6 col-lg-6">
          <div className={styles.inputItem}>
            <label>Subject</label>
            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-6 col-xl-6 col-lg-6"></div>
        <div className="col-xs-12 col-sm-12 col-md-12 col-xl-12 col-lg-12">
          <div className={styles.inputItem}>
            <label>Message</label>

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={contactLoading}
          onClick={handleSubmit}
        >
          {contactLoading ? "Sending..." : "Submit"}
        </button>

        {showSuccess && contactPostIsSuccess && (
          <div className="col-12">
            <p className={styles.successMessage}>
              Thank you! Your message has been sent.
            </p>
          </div>
        )}

        {isError && (
          <div className="col-12">
            <p className={styles.errorMessage}>
              ❌ Oops! Something went wrong. Please try again.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
