import React from 'react';
import './Fieldset.css';

function Fieldset(props){

  const showSpan = (props.incorrect) ? "form__span_enable" : "";
  const inputRed = (props.incorrect) ? "form__input_color_red" : "";

  return(
    <fieldset className="form__fieldset">
      <label className="form__label" htmlFor={props.labelName}>{props.labelValue}</label>
      <input 
      className={`form__input ${inputRed}`}
      name={props.labelName}
      defaultValue={props.defaultInputValue}
      type={props.inputType}>
      </input>
      <span className={`form__span ${showSpan}`}>Что-то пошло не так...</span>
    </fieldset>
  )
}

export default Fieldset;