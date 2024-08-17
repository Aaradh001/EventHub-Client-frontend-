import React, { useEffect, useState } from "react";
import "../../assets/styles/formValidationStyle.css"

const RequirementFormInput = (props) => {
  const [focused, setFocussed] = useState(false)
  const { label, onChange, keyId, labelclass, error, data, resetflag = false, onItemRemove = () => { }, onKeyUp = () => { }, ...inputProps } = props;



  const handleFocus = () => {
    //  setFocussed(!resetflag)  
    setFocussed(true)
  };


   

  useEffect(() => {


    console.log("useeefect", data);
  }, [data])

  return (
    <div className="relative mb-4 text-black">

      <label
        htmlFor={inputProps.id}
        className={labelclass}
      >
        {label}
      </label>
      {
        inputProps.as == "select" ? (
          <select {...inputProps} onChange={(e) => onChange(e, props)} onBlur={handleFocus} focused={focused.toString()} id="">
            {
              inputProps.options.map((each, index) => {
                return <option key={index} value={each.value}>{each.name}</option>
              })
            }
          </select>
        ) : <>
          {inputProps.as == "multi_text_select" ? (
            <>
              
              <input {...inputProps} data-input={"multi_text_select"} onKeyUp={(e) => onKeyUp(e, props)} onChange={(e) => onChange(e, inputProps)} onBlur={handleFocus} focused={focused.toString()} />
            </>
          ) : (
            <input {...inputProps} data-input={""} onKeyUp={(e) => onKeyUp(e, props)} onChange={(e) => onChange(e, inputProps)} onBlur={handleFocus} focused={focused.toString()} />
          )}
          <span className="span-error p-2">{error}</span>
          <div className=" flex flex-wrap" />
          <div className="flex flex-wrap">
            {
            (data && data.length) ? (

              data.map((item, index) => {
                return (
                  item && 
                  <span key={index} onClick={() => onItemRemove(props.id, item)} className="cursor-pointer p-1 gap-1 text-xs mr-2 mt-2 rounded-xl flex fit bg-gray-200">{item} <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                  </span>
                );
              })
            ) : null}
          </div>
        </>
      }
    </div>
  );
};

export default RequirementFormInput;