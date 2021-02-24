import React from 'react';
import './Fieldset.css';

function Fieldset(props){

  const showSpan = (props.incorrect) ? "fieldset__span_enable" : "";
  const inputRed = (props.incorrect) ? "fieldset__input_color_red" : "";

  return(
    <fieldset className="fieldset">
      <label className="fieldset__label" htmlFor={props.labelName}>{props.labelValue}</label>
      <input 
      className={`fieldset__input ${inputRed}`}
      name={props.labelName}
      defaultValue={props.defaultInputValue}
      type={props.inputType}>
      </input>
      <span className={`fieldset__span ${showSpan}`}>Что-то пошло не так...</span>
    </fieldset>
  )
}

export default Fieldset;