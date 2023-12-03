import React, { useEffect, createRef } from "react";
import { Form } from "./cw-form";
import { v4 as uuidV4 } from "uuid";

type FormInputProps = {
  className?: string;
  form: Form;
  name: string;
  component: React.JSX.Element;
};
export const FormInput: React.FC<FormInputProps> = ({
  className,
  form,
  name,
  component,
}) => {
  const id = uuidV4();
  const inputWrapper = createRef<HTMLDivElement>();

  useEffect(() => {
    const selectors = `input,select,textarea`;
    const inputs = inputWrapper.current?.querySelectorAll(selectors);
    if (!inputs) {
      throw Error(`could not detect any inputs (${selectors}`);
    }
    if (inputs.length <= 0) {
      throw Error("no inputs");
    }
    if (inputs.length > 1) {
      let isAllRadio: boolean = true;
      inputs.forEach((input) => {
        if (!isAllRadio) {
          return;
        }
        isAllRadio = input.getAttribute("type") === "radio";
      });
      if (!isAllRadio) {
        throw Error("more than one inputs for one FormInput");
      }
    }
    inputs.forEach((inputElement) => {
      form.ref(id, inputElement as HTMLInputElement, name);
    });
  }, [form, id, inputWrapper, name]);
  return (
    <div
      className={className}
      id={`${id}-wrapper`}
      ref={inputWrapper}
    >
      {component}
    </div>
  );
};
