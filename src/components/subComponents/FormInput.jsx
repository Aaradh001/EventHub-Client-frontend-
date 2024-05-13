import React, { useState } from "react";
import "../../assets/styles/formValidationStyle.css"

const FormInput = (props) => {
  const [focused, setFocussed] = useState(false)
  const { label, onChange, keyId, labelclass, error, ...inputProps } = props;

  const handleFocus = () => {
    setFocussed(true);
  };

  return (
    <div className="relative mb-4 text-black">
      <label
        htmlFor={inputProps.id}
        className={labelclass}
      >
        {label}
      </label>
      <input {...inputProps} onChange={onChange} onBlur={handleFocus} focused={focused.toString()} />
      <span className="span-error p-2">{error}</span>
    </div>
  );
};

export default FormInput;