"use client";

import React from "react";
import styles from "../styles/component/quote.module.scss";
import CheckIcon from "./Icon/CheckIcon";

interface RadioButtonProps {
  name: string;
  value: string;
  label: string;
  icon: React.ReactNode;
  checked: boolean;
  onChange: (value: string) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  name,
  value,
  label,
  icon,
  checked,
  onChange,
}) => {
  return (
    <label className={styles.customRadio}>
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={() => onChange(value)}
      />
      <span className={styles.radioBtn}>
        <i className={styles.checkIcon}>
          <CheckIcon Color="#f9b729" />
        </i>
        <div className={styles.hobbiesIcon}>{icon}</div>
        <h3>{label}</h3>
      </span>
    </label>
  );
};

export default RadioButton;
