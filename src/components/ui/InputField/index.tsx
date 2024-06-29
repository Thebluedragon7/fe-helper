import React, { useId } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

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
    <div>
      <label htmlFor={`if-${id}`}>{label}</label>
      <input id={`if-${id}`} type={"number"} {...register} />
      {error && <span>{error.message}</span>}
    </div>
  );
};

export default InputField;
