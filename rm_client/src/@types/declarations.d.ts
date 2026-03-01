declare module "react-radio-buttons" {
  import * as React from "react";

  export interface RadioButtonProps {
    value: string;
    pointColor?: string;
    rootColor?: string;
    iconInnerColor?: string;
    disabled?: boolean;
    onChange?: (value: string) => void;
  }

  export class RadioButton extends React.Component<RadioButtonProps> {}

  export interface RadioGroupProps {
    onChange?: (value: string) => void;
    selectedValue?: string;
    horizontal?: boolean;
    children: React.ReactNode;
  }

  export class RadioGroup extends React.Component<RadioGroupProps> {}

  export class ReversedRadioButton extends React.Component<RadioButtonProps> {}
}
