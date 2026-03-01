"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Step, Stepper } from "react-form-stepper";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import styles from "../styles/component/quote.module.scss";
import StepOne from "./quote/StepOne";
import StepThree from "./quote/StepThree";
import StepTwo from "./quote/StepTwo";

const schema = yup.object().shape({
  movingFrom: yup.string().required("Moving From is required"),
  movingTo: yup.string().required("Moving To is required"),
  moveType: yup.string().required("Type of move is required"),
  fname: yup.string().required("First Name is required"),
  lname: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  // age: yup.number().required("Age is required").positive().integer(),
  // property: yup.string().required("Type of property is required"),
  // internal: yup.string().required("Internal Access is required"),
  // truck: yup.string().required("Truck Access is required"),
  // propertyDropoff: yup.string().required("Type of property is required"),
  // internalDropoff: yup.string().required("Internal Access is required"),
  // truckDropoff: yup.string().required("Truck Access is required"),
  address: yup.string().required("Address is required"),
});

const stepFields = [
  ["movingFrom", "movingTo", "muchMoving", "moveType"], // Fields for Step 1
  ["fname", "lname", "email", "phone", "movingDate"], // Fields for Step 2
  // ["fnameddd"], // Fields for Step 2
  [
    // "property",
    // "internal",
    // "truck",
    // "propertyDropoff",
    // "internalDropoff",
    // "truckDropoff",
    "address",
  ], // Fields for Step 3
];

const MultiStepForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  // const onSubmit = async (data: any) => {
  //   console.log(data);
  //   const isValid = await methods.trigger(undefined, { shouldFocus: false }); // Validate all fields on submit
  //   if (isValid) {
  //     console.log("Final Form Data:", data);
  //   }
  // };

  const onSubmit = (data: any) => {
    console.log("Final Form Data:", data);
  };

  const handleNext = async () => {
    const currentFields = stepFields[activeStep]; // Get fields for the current step
    const isValid = await methods.trigger(currentFields, {
      shouldFocus: false,
    }); // Validate only those fields

    if (isValid) setActiveStep((prev) => Math.min(prev + 1, 2));
  };

  // const handleNext = async () => {
  //   const currentFields = stepFields[activeStep]; // Get fields for the current step
  //   const isValid = await methods.trigger(currentFields); // Validate only those fields

  //   if (isValid) setActiveStep((prev) => Math.min(prev + 1, 2));
  // };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="p-5 max-w-lg mx-auto"
      >
        <Stepper
          activeStep={activeStep}
          className={`${styles.stepperBtnWrap} stepper-btn-wrap`}
        >
          <Step label="Step 1" />
          <Step label="Step 2" />
          <Step label="Step 3" />
        </Stepper>

        <div className="mt-5 p-4 border rounded">
          {activeStep === 0 && <StepOne />}
          {activeStep === 1 && <StepTwo />}
          {activeStep === 2 && <StepThree />}
        </div>

        <div className={styles.quoteNextPrevWrap}>
          <button
            type="button"
            onClick={handleBack}
            disabled={activeStep === 0}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Back
          </button>
          {activeStep < 2 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default MultiStepForm;
