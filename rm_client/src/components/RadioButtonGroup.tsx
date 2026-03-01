"use client";
import styles from "../styles/component/quote.module.scss";

import React from "react";
import {
  RadioButton,
  RadioGroup,
  ReversedRadioButton,
} from "react-radio-buttons";

interface RadioOption {
  value: string;
  label: string;
  reversed?: boolean;
  Icon: any;
}

interface RadioButtonGroupProps {
  options: RadioOption[];
  onChange: (value: string) => void;
  horizontal?: boolean;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  options,
  onChange,
  horizontal = false,
}) => {
  return (
    <RadioGroup
      onChange={onChange}
      horizontal={horizontal}
      className={styles.radioWrap}
    >
      {options.map((option) =>
        option.reversed ? (
          <ReversedRadioButton
            key={option.value}
            value={option.value}
            className={styles.radioItem}
          >
            <div className={styles.radioTx}>{option.label}</div>
            <div className={styles.radioIcon}>{option.Icon}</div>
          </ReversedRadioButton>
        ) : (
          <RadioButton
            key={option.value}
            value={option.value}
            className={styles.radioItem}
          >
            <div className={styles.radioTx}>{option.label}</div>
            <div className={styles.radioIcon}>{option.Icon}</div>
          </RadioButton>
        )
      )}
    </RadioGroup>
  );
};

export default RadioButtonGroup;
