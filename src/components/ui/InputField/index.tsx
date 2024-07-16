import React, { useId } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import {
  inputField,
  inputGroup,
  inputGroupError,
  inputLabel
} from "@/components/ui/InputField/InputField.css.ts";

type Props = {
  label: string;
  register: UseFormRegisterReturn<string>;
  error?: FieldError;
};

const InputField: React.FunctionComponent<Props> = ({
  label,
  register,
  error
}) => {
  const id = useId();

  return (
    <div className={inputGroup}>
      <label className={inputLabel} htmlFor={`if-${id}`}>
        {label}
      </label>
      <input className={inputField} id={`if-${id}`} {...register} />
      {error && <span className={inputGroupError}>{error.message}</span>}
    </div>
  );
};

export default InputField;
