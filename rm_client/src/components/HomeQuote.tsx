"use client";
import { ContactProps } from "@/@types/contactType";
import useContactMutation from "@/hooks/mutations/useContactMutation";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
  useWatch,
} from "react-hook-form";
import * as yup from "yup";
import styles from "../styles/component/quote.module.scss";
import CustomCheckbox from "./CustomCheckbox";
import SelectDropdown from "./SelectDropdown";
import Title from "./Title";

const interests = [
  { value: "confirmed_date", label: "I have a confirmed date" },
  { value: "exact_date", label: "I don't have an exact date" },
  { value: "flexible_date", label: "Flexible date" },
];
const involved = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

const typeOptions = [
  { value: "move-service", label: "FURNITURE MOVING SERVICE" },
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

const schema = yup.object().shape({
  typeOfMove: yup.string().required("Type of move is required"),
  collectionAddress: yup.string().required("Collection address is required"),
  deliveryAddress: yup.string().required("Delivery address is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  subject: yup.string().nullable(),
  movingDate: yup.string().nullable(),
  message: yup.string().required("Message is required"),
  interested: yup.array().of(yup.string()).nullable(),
  prefferedTime: yup.string().nullable(),
  sizeOfMove: yup.string().nullable(),
  numberOfHelper: yup.string().required("Number of helper required?"),
  involved: yup.array().of(yup.string()).nullable(),
  firstName: yup.string().required("First Name"),
  lastName: yup.string().required("Last Name"),
});

export default function HomeQuote() {
  const {
    mutate: contactUser,
    isLoading: contactLoading,
    isSuccess: contactPostIsSuccess,
    isError,
  } = useContactMutation();

  const methods = useForm<ContactProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      interested: [],
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = methods;

  const interested = useWatch({ control, name: "interested" });

  const showNoDateInfo = interested?.includes("exact_date");

  const onSubmit: SubmitHandler<ContactProps> = (data) => {
    console.log("Submitting data:", data);
    contactUser({ contactInfo: data });
  };

  return (
    <div className={styles.quote}>
      <Title
        title="Instant Moving Quote"
        subtitle="Ready to get moving but need a moving quote first? You can create a removalist quote online now – without waiting for someone to get back to you. Create an instant moving quote in 1 minute!"
      />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.contactForm}>
          <div className="container">
            <div className="row">
              {/* Type of Move */}
              <div className="col-xs-12 col-md-4 col-lg-4 col-xl-4">
                <div className={styles.selectItem}>
                  <label>Type of move</label>
                  <Controller
                    className={styles.selectDropdown}
                    control={control}
                    name="typeOfMove"
                    render={({ field }) => (
                      <SelectDropdown
                        options={typeOptions}
                        value={typeOptions.find(
                          (opt) => opt.value === field.value,
                        )}
                        onChange={(selectedOption) =>
                          setValue("typeOfMove", selectedOption.value, {
                            shouldValidate: true,
                          })
                        }
                      />
                    )}
                  />
                  {errors.typeOfMove && (
                    <p className={styles.inputTxError}>
                      {errors.typeOfMove.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Collection Address */}
              <div className="col-xs-12 col-md-4 col-lg-4 col-xl-4">
                <div className={styles.inputItem}>
                  <label>Collection address</label>
                  <input {...register("collectionAddress")} />
                  {errors.collectionAddress && (
                    <p className={styles.inputTxError}>
                      {errors.collectionAddress.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Delivery Address */}
              <div className="col-xs-12 col-md-4 col-lg-4 col-xl-4">
                <div className={styles.inputItem}>
                  <label>Delivery address</label>
                  <input {...register("deliveryAddress")} />
                  {errors.deliveryAddress && (
                    <p className={styles.inputTxError}>
                      {errors.deliveryAddress.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Interested Checkboxes */}
              <div className="col-xs-12 col-md-6 col-lg-4 col-xl-4">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    marginTop: "30px",
                  }}
                >
                  {interests.map((item) => (
                    <CustomCheckbox
                      key={item.value}
                      name="interested"
                      value={item.value}
                      label={item.label}
                      control={control}
                    />
                  ))}
                </div>
              </div>

              {!showNoDateInfo && (
                <>
                  {/* Moving Date */}
                  <div className="col-xs-12 col-md-6 col-lg-4 col-xl-4">
                    <div className={styles.inputItem}>
                      <label>Moving Date</label>
                      <Controller
                        control={control}
                        name="movingDate"
                        render={({ field }) => (
                          <DatePicker
                            selected={
                              field.value ? new Date(field.value) : null
                            }
                            onChange={(date) => field.onChange(date)}
                            placeholderText="Select a date"
                            dateFormat="dd/MM/yyyy"
                            className="form-control"
                          />
                        )}
                      />
                      {errors.movingDate && (
                        <p className={styles.inputTxError}>
                          {errors.movingDate.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Preffered Time */}
                  <div className="col-xs-12 col-md-6 col-lg-4 col-xl-4">
                    <div className={styles.selectItem}>
                      <label>Preffered Time</label>
                      <Controller
                        control={control}
                        name="prefferedTime"
                        render={({ field }) => (
                          <SelectDropdown
                            options={timeOptions}
                            value={timeOptions.find(
                              (opt) => opt.value === field.value,
                            )}
                            onChange={(selectedOption) =>
                              setValue("prefferedTime", selectedOption.value, {
                                shouldValidate: true,
                              })
                            }
                          />
                        )}
                      />
                      {errors.prefferedTime && (
                        <p className={styles.inputTxError}>
                          {errors.prefferedTime.message}
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* Message */}
              <div className="col-xs-12 col-md-6 col-lg-4 col-xl-4">
                <div className={styles.inputItem}>
                  <label>
                    Item's? ( Please note, we estimate you're quote based on the
                    details that you'll provide us)
                  </label>
                  <textarea rows={4} {...register("message")} />
                  {errors.message && (
                    <p className={styles.inputTxError}>
                      {errors.message.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Size of move */}
              <div className="col-xs-12 col-md-6 col-lg-4 col-xl-4">
                <div className={styles.selectItem}>
                  <label>Size of move</label>
                  <Controller
                    control={control}
                    name="sizeOfMove"
                    render={({ field }) => (
                      <SelectDropdown
                        options={sizeOfMoveOptions}
                        value={sizeOfMoveOptions.find(
                          (opt) => opt.value === field.value,
                        )}
                        onChange={(selectedOption) =>
                          setValue("sizeOfMove", selectedOption.value, {
                            shouldValidate: true,
                          })
                        }
                      />
                    )}
                  />
                  {errors.sizeOfMove && (
                    <p className={styles.inputTxError}>
                      {errors.sizeOfMove.message}
                    </p>
                  )}
                </div>
              </div>
              {/* Number of helper required? */}
              <div className="col-xs-12 col-md-6 col-lg-4 col-xl-4">
                <div className={styles.selectItem}>
                  <label>Number of helper required?</label>
                  <Controller
                    control={control}
                    name="numberOfHelper"
                    render={({ field }) => (
                      <SelectDropdown
                        options={numberOfHelperOptions}
                        value={numberOfHelperOptions.find(
                          (opt) => opt.value === field.value,
                        )}
                        onChange={(selectedOption) =>
                          setValue("numberOfHelper", selectedOption.value, {
                            shouldValidate: true,
                          })
                        }
                      />
                    )}
                  />
                  {errors.numberOfHelper && (
                    <p className={styles.inputTxError}>
                      {errors.numberOfHelper.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Are stairs involved */}
              <div className="col-xs-12 col-md-6 col-lg-4 col-xl-4">
                <div className={styles.selectItem}>
                  <label>Are stairs involved? *</label>
                  <div className={styles.involvedChekbox}>
                    {involved.map((item) => (
                      <CustomCheckbox
                        key={item.value}
                        name="involved"
                        value={item.value}
                        label={item.label}
                        control={control}
                      />
                    ))}
                  </div>
                </div>
                {showNoDateInfo && (
                  <div style={{ marginTop: "1rem", color: "#34dd34" }}>
                    <strong>Note:</strong> No worries! We’ll help you figure out
                    a date later.
                  </div>
                )}
              </div>

              {/* First Name */}
              <div className="col-xs-12 col-md-6 col-lg-4 col-xl-4">
                <div className={styles.inputItem}>
                  <label>First Name </label>
                  <input {...register("firstName")} />
                  {errors.firstName && (
                    <p className={styles.inputTxError}>
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
              </div>
              {/* Last Name */}
              <div className="col-xs-12 col-md-6 col-lg-4 col-xl-4">
                <div className={styles.inputItem}>
                  <label>Last Name </label>
                  <input {...register("lastName")} />
                  {errors.lastName && (
                    <p className={styles.inputTxError}>
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone Number */}
              <div className="col-xs-12 col-md-6 col-lg-4 col-xl-4">
                <div className={styles.inputItem}>
                  <label>Phone Number</label>
                  <input type="tel" {...register("phone")} />
                  {errors.phone && (
                    <p className={styles.inputTxError}>
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="col-xs-12 col-md-6 col-lg-4 col-xl-4">
                <div className={styles.inputItem}>
                  <label>Email</label>
                  <input type="email" {...register("email")} />
                  {errors.email && (
                    <p className={styles.inputTxError}>
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="col-12">
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={contactLoading}
                >
                  {contactLoading ? "Sending..." : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
