"use client";

import { useState } from "react";
import { Step, Stepper } from "react-form-stepper";
import styles from "../styles/component/quote.module.scss";

const CubicMetter = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, 9));
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="p-5 max-w-lg mx-auto">
      <Stepper
        activeStep={activeStep}
        className={`${styles.stepperBtnWrap} stepper-btn-wrap`}
      >
        <Step label="Bedroom" />
        <Step label="Living" />
        <Step label="Study" />
        <Step label="Kitchen" />
        <Step label="Dining" />
        <Step label="Laundry" />
        <Step label="Cartons & Bags" />
        <Step label="Garage/Shed" />
        <Step label="Outdoors" />
        <Step label="TOTALS" />
      </Stepper>

      {/* Step Content */}
      <div className="mt-5 p-4 border rounded">
        {activeStep === 0 && (
          <div>
            <div>Step 1: Bedroom</div>
          </div>
        )}
        {activeStep === 1 && <div>Step 2: Living</div>}
        {activeStep === 2 && <div>Step 3: Study</div>}
        {activeStep === 3 && <div>Step 3: Kitchen</div>}
        {activeStep === 4 && <div>Step 3: Dining</div>}
        {activeStep === 5 && <div>Step 3: Laundry</div>}
        {activeStep === 6 && <div>Step 3: Cartons & Bags</div>}
        {activeStep === 7 && <div>Step 3: Garage/Shed</div>}
        {activeStep === 8 && <div>Step 3: Outdoors</div>}
        {activeStep === 9 && <div>Step 3: TOTALS</div>}
      </div>

      {/* Navigation Buttons */}
      <div className={styles.quoteNextPrevWrap}>
        <button
          onClick={handleBack}
          disabled={activeStep === 0}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={activeStep === 9}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {activeStep === 9 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default CubicMetter;
