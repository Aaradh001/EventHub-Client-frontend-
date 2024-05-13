import React, { useState } from "react";
import "../../assets/styles/formValidationStyle.css"

const SignUpFormInput = (props) => {
  const [focused, setFocussed] = useState(false)
  const { label, onChange, value, keyId, error, ...inputProps } = props;

  const handleFocus = () => {
    setFocussed(true);
  };

  return (

    <div className="relative text-black font-md mb-4">
      <label
        htmlFor={inputProps.id}
        className={props.labelclass}
      >
        {label}
      </label>
      <input {...inputProps} onChange={onChange} onBlur={handleFocus} focused={focused.toString()} />
      <span className="span-error p-2">{error}</span>
    </div>
  );
};

export default SignUpFormInput;