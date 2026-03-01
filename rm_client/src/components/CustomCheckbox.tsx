import React from "react";
import { Control, useController } from "react-hook-form";
import styles from "../styles/component/_custom-checkbox.module.scss"; // or .css if not using modules

interface CheckboxProps {
  name: string;
  label: string;
  control: Control<any>;
  value: string;
}

const CustomCheckbox: React.FC<CheckboxProps> = ({
  name,
  label,
  control,
  value,
}) => {
  const {
    field: { value: selectedValues = [], onChange },
  } = useController({ name, control });

  const handleChange = () => {
    const newValue = selectedValues.includes(value)
      ? selectedValues.filter((v: string) => v !== value)
      : [...selectedValues, value];
    onChange(newValue);
  };

  return (
    <label className={styles.checkboxWrapper}>
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={selectedValues.includes(value)}
        onChange={handleChange}
      />
      <span>{label}</span>
    </label>
  );
};

export default CustomCheckbox;
