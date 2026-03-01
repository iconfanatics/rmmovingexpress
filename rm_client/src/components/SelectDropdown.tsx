"use client";

import React, { useState } from "react";
import Select from "react-select";

interface OptionType {
  value: string;
  label: string;
}

interface SelectDropdownProps {
  options: OptionType[];
  onChange?: (selectedOption: OptionType | null) => void;
  placeholder?: string;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  options,
  onChange,
  placeholder = "Select an option",
}) => {
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

  const handleChange = (option: OptionType | null) => {
    setSelectedOption(option);
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <Select
      value={selectedOption}
      onChange={handleChange}
      options={options}
      placeholder={placeholder}
    />
  );
};

export default SelectDropdown;
