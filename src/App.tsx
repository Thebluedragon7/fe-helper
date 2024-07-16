import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  ClampGeneratorModel,
  ClampGeneratorModelSchema
} from "./data/model/ClampGeneratorModel.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "./components/ui/InputField";
import { codeBlock, codeBlockCode, copyCodeBtn } from "@/App.css.ts";

const App: React.FunctionComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ClampGeneratorModel>({
    resolver: zodResolver(ClampGeneratorModelSchema)
  });

  const [isCalculated, setIsCalculated] = useState<boolean>(false);
  const [copyButtonText, setCopyButtonText] = useState<string>("Copy");
  const [finalClampValue, setFinalClampValue] = useState<string>("");

  const onSubmit: SubmitHandler<ClampGeneratorModel> = ({
    maxView,
    maxSize,
    minSize,
    minView
  }) => {
    setFinalClampValue(() => {
      const slope = (maxSize - minSize) / (maxView - minView);

      const intercept = minSize - slope * minView;

      setIsCalculated(true);

      return `clamp(${minSize}px, ${slope * 100}vw + ${intercept}px, ${maxSize}px)`;
    });
  };

  const handleCopyClampValue = () => {
    navigator.clipboard
      .writeText(finalClampValue)
      .then(() => {
        setCopyButtonText("✔ Copied");
      })
      .catch((error) => {
        console.error("Error copying to clipboard: ", error);
      })
      .finally(() => {
        setTimeout(() => {
          setCopyButtonText("Copy");
        }, 1000);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label={"Minimum view port"}
          register={register("minView", { valueAsNumber: true })}
          error={errors.minView}
        />

        <InputField
          label={"Maximum view port"}
          register={register("maxView", { valueAsNumber: true })}
          error={errors.maxView}
        />

        <InputField
          label={"Minimum size"}
          register={register("minSize", { valueAsNumber: true })}
          error={errors.minSize}
        />

        <InputField
          label={"Maximum size"}
          register={register("maxSize", { valueAsNumber: true })}
          error={errors.maxSize}
        />

        <button type="submit">Submit</button>
      </form>

      {isCalculated && (
        <div className={codeBlock}>
          <code className={codeBlockCode}>{finalClampValue}</code>
          <button className={copyCodeBtn} onClick={handleCopyClampValue}>
            {copyButtonText}
          </button>
        </div>
      )}
    </>
  );
};

export default App;
