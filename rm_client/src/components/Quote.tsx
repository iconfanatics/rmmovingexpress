"use client";
import useQuoteMutation from "@/hooks/mutations/useQuoteMutation";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import classes from "../styles/component/_custom-checkbox.module.scss";
import styles from "../styles/component/quote.module.scss";
import SelectDropdown from "./SelectDropdown";

const interests = [
  { value: "confirmed_date", label: "I have a confirmed date" },
  { value: "exact_date", label: "I don't have an exact date" },
  { value: "flexible_date", label: "Flexible date" },
];
const involvedOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];
const interestsOptions = [
  { value: "confirmed_date", label: "I have a confirmed date" },
  { value: "exact_date", label: "I don't have an exact date" },
  { value: "flexible_date", label: "Flexible date" },
];

const typeOptions = [
  { value: "move-service", label: "HOUSE FURNITURE MOVING SERVICE" },
  { value: "relocation", label: "OFFICE RELOCATION" },
  { value: "storage", label: "STORAGE SOLUTION" },
  { value: "winz", label: "WINZ QUOTE" },
  { value: "intercity-move", label: "INTERCITY MOVE" },
  { value: "piano-move", label: "PIANO MOVE" },
  { value: "urgent-delivery", label: "URGENT DELIVERY" },
  { value: "others", label: "OTHERS" },
];

const timeOptions = [
  { value: "08", label: "08:00 AM" },
  { value: "09", label: "09:00 AM" },
  { value: "10", label: "10:00 AM" },
  { value: "11", label: "11:00 AM" },
  { value: "12", label: "12:00 PM" },
  { value: "01", label: "01:00 PM" },
  { value: "02", label: "02:00 PM" },
  { value: "03", label: "03:00 PM" },
  { value: "04", label: "04:00 PM" },
  { value: "05", label: "05:00 PM" },
];

const sizeOfMoveOptions = [
  { value: "1", label: "1 Bedroom House" },
  { value: "2", label: "2 Bedroom House" },
  { value: "3-4", label: "3-4 Bedroom House" },
  { value: "5+", label: "5+ Bedroom House" },
  { value: "sharedFlat", label: "Shared Flat" },
];
const numberOfHelperOptions = [
  { value: "3", label: "Requires 3 helpers" },
  { value: "2", label: "Requires 2 helpers" },
];

export default function Quote() {
  const [form, setForm] = useState({
    typeOfMove: "",
    collectionAddress: "",
    deliveryAddress: "",
    email: "",
    phone: "",
    subject: "",
    movingDate: null as Date | null,
    message: "",
    interested: "",
    prefferedTime: "",
    sizeOfMove: "",
    numberOfHelper: "",
    involved: "",
    firstName: "",
    lastName: "",
  });
  const [showSuccess, setShowSuccess] = useState(true);
  const {
    mutate: quoteSend,
    isLoading: quoteLoading,
    isSuccess,
    isError,
  } = useQuoteMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, value: string) => {
    setForm((prev) => {
      const selected = prev[name as keyof typeof prev] as string[];
      const exists = selected.includes(value);
      return {
        ...prev,
        [name]: exists
          ? selected.filter((v) => v !== value)
          : [...selected, value],
      };
    });
  };

  // const interested = useWatch({ control, name: "interested" });

  // const showNoDateInfo = interested?.includes("exact_date");

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
        window.location.reload();
      }, 10000);

      return () => clearTimeout(timer); // cleanup
    }
  }, [isSuccess]);

  // api request for Insert data
  const handleSubmit = async () => {
    console.log(form);

    quoteSend({
      quoteInfo: {
        typeOfMove: form.typeOfMove,
        collectionAddress: form.collectionAddress,
        deliveryAddress: form.deliveryAddress,
        email: form.email,
        phone: form.phone,
        subject: form.subject,
        movingDate: form.movingDate,
        message: form.message,
        interested: form.interested,
        prefferedTime: form.prefferedTime,
        sizeOfMove: form.sizeOfMove,
        numberOfHelper: form.numberOfHelper,
        involved: form.involved,
        firstName: form.firstName,
        lastName: form.lastName,
      },
    });
  };

  return (
    <div className={styles.quote}>
      <div className={styles.contactForm}>
        <div className="container">
          <div className="row">
            {/* Type of Move */}
            <div className="col-md-4">
              <div className={styles.selectItem}>
                <label>Type of move</label>
                <SelectDropdown
                  options={typeOptions}
                  value={typeOptions.find(
                    (opt) => opt.value === form.typeOfMove,
                  )}
                  onChange={(opt) =>
                    setForm({ ...form, typeOfMove: opt?.value || "" })
                  }
                />
              </div>
            </div>

            {/* Collection Address */}
            <div className="col-md-4">
              <div className={styles.inputItem}>
                <label>Collection address</label>
                <input
                  name="collectionAddress"
                  value={form.collectionAddress}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Delivery Address */}
            <div className="col-md-4">
              <div className={styles.inputItem}>
                <label>Delivery address</label>
                <input
                  name="deliveryAddress"
                  value={form.deliveryAddress}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Interested Checkboxes */}
            <div className="col-xs-12 col-md-4 col-lg-4 col-xl-4">
              <div className={styles.checkboxItem}>
                {interestsOptions.map((item) => (
                  <label key={item.value} className={classes.checkboxWrapper}>
                    <input
                      type="radio"
                      name="interested" // same name groups radios
                      checked={form.interested === item.value} // compare string
                      onChange={() =>
                        setForm((prev) => ({ ...prev, interested: item.value }))
                      }
                    />
                    {item.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Date & Time */}

            <>
              <div className="col-md-6">
                <div className={styles.inputItem}>
                  <label>Moving Date</label>
                  <DatePicker
                    selected={form.movingDate}
                    onChange={(date) => setForm({ ...form, movingDate: date })}
                    placeholderText="Select a date"
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className={styles.selectItem}>
                  <label>Preffered Time</label>
                  <SelectDropdown
                    options={timeOptions}
                    value={timeOptions.find(
                      (opt) => opt.value === form.prefferedTime,
                    )}
                    onChange={(opt) =>
                      setForm({ ...form, prefferedTime: opt?.value || "" })
                    }
                  />
                </div>
              </div>
            </>

            {/* Message */}
            <div className="col-12">
              <div className={styles.inputItem}>
                <label>Item's?</label>
                <textarea
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Size of Move */}
            <div className="col-md-6">
              <div className={styles.selectItem}>
                <label>Size of move</label>
                <SelectDropdown
                  options={sizeOfMoveOptions}
                  value={sizeOfMoveOptions.find(
                    (opt) => opt.value === form.sizeOfMove,
                  )}
                  onChange={(opt) =>
                    setForm({ ...form, sizeOfMove: opt?.value || "" })
                  }
                />
              </div>
            </div>

            {/* Number of Helper */}
            <div className="col-md-6">
              <div className={styles.selectItem}>
                <label>Number of helper required?</label>
                <SelectDropdown
                  options={numberOfHelperOptions}
                  value={numberOfHelperOptions.find(
                    (opt) => opt.value === form.numberOfHelper,
                  )}
                  onChange={(opt) =>
                    setForm({ ...form, numberOfHelper: opt?.value || "" })
                  }
                />
              </div>
            </div>

            {/* Stairs */}
            <div className="col-xs-12 col-md-4 col-lg-4 col-xl-4">
              <div className={styles.selectItem}>
                <label>Are stairs involved?</label>
                <div className={styles.involvedChekbox}>
                  {involvedOptions.map((item) => (
                    <label key={item.value} className={classes.checkboxWrapper}>
                      <input
                        type="radio"
                        name="involved" // same name groups radios
                        checked={form.involved === item.value} // compare string
                        onChange={() =>
                          setForm((prev) => ({ ...prev, involved: item.value }))
                        }
                      />{" "}
                      {item.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Name */}
            <div className="col-md-6">
              <div className={styles.inputItem}>
                <label>First Name</label>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className={styles.inputItem}>
                <label>Last Name</label>
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Phone */}
            <div className="col-md-6">
              <div className={styles.inputItem}>
                <label>Phone Number</label>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email */}
            <div className="col-md-6">
              <div className={styles.inputItem}>
                <label>Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Submit */}
            <div className="col-12">
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={quoteLoading}
                onClick={handleSubmit}
              >
                {quoteLoading ? "Sending..." : "Submit"}
              </button>
            </div>

            {showSuccess && isSuccess && (
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
      </div>
    </div>
  );
}
