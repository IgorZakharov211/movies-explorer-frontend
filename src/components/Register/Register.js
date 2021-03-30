import React, { useState, useCallback, useEffect } from 'react';
import './Register.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import { validators } from '../FormValidator/FormValidator';

function Register(props){
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    name: {
      required: false,
      minLength: false,
      maxLength: false,
      containValidValue: false
    },
    email: {
      required: false,
      isEmail: false
    },
    password: {
      required: false
    }
  });

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormValues(prevState => ({ ...prevState, [name]: value }));
  }, [setFormValues]);

  useEffect(function validateInputs(){
    const { name, email, password } = formValues;

    const nameValidationResult = Object.keys(validators.name).map(
      errorKey => {
        const errorResult = validators.name[errorKey](name);

        return { [errorKey]: errorResult }
      }
    ).reduce((acc, el) => ({...acc, ...el}), {});
    const emailValidationResult = Object.keys(validators.email).map(
      errorKey => {
        const errorResult = validators.email[errorKey](email);

        return { [errorKey]: errorResult }
      }
    ).reduce((acc, el) => ({...acc, ...el}), {});
    const passwordValidationResult = Object.keys(validators.password).map(
      errorKey => {
        const errorResult = validators.password[errorKey](password);

        return { [errorKey]: errorResult }
      }
    ).reduce((acc, el) => ({...acc, ...el}), {});

    setErrors({
      name: nameValidationResult,
      email: emailValidationResult,
      password: passwordValidationResult
    });
  }, [formValues, setErrors]);

  const { name, email, password } = formValues;
  const isNameInvalid = Object.values(errors.name).some(Boolean);
  const isEmailInvalid = Object.values(errors.email).some(Boolean);
  const isPasswordInvalid = Object.values(errors.password).some(Boolean);
  const isSubmitDisabled = isNameInvalid || isEmailInvalid || isPasswordInvalid;
  const disabledButton = (isSubmitDisabled) ? 'register__button_disabled': '';
  const renderButton = (props.renderSubmit) ? '...' : '';

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onRegister(name, email, password);
  } 

  return(
    <main className="register">
      <form className="register__form" action="#" method="POST" name="register" onSubmit={handleSubmit}>
        <Link to="/"><img className="register__logo-img" src={logo} alt="Логотип"></img></Link>
        <h2 className="register__title">Добро пожаловать!</h2>
        <fieldset className="register__fieldset">
          <label className="register__label" htmlFor="name">Имя</label>
          <input 
          className="register__input" 
          name="name" 
          type="text"
          reguired="true"
          value={name}
          onChange={handleInputChange}
          ></input>
          {  errors.name.required &&
            <span className="register__span">Поле обязательно для заполнения</span>
          }
          {  errors.name.minLength &&
            <span className="register__span">Минимальная длина поля 2 символа</span>
          }
          {  errors.name.maxLength &&
            <span className="register__span">Максимальная длина поля 30 символов</span>
          }
          {  errors.name.containValidValue &&
            <span className="register__span">Только латиница, пробел или дефис</span>
          }
        </fieldset>
        <fieldset className="register__fieldset">
          <label className="register__label" htmlFor="email">E-mail</label>
          <input 
          className="register__input" 
          name="email" 
          type="email"
          reguired="true"
          value={email}
          onChange={handleInputChange}
          ></input>
          {  errors.email.required &&
            <span className="register__span">Поле обязательно для заполнения</span>
          }
          {  errors.email.isEmail &&
            <span className="register__span">Поле должно содержать email адрес</span>
          }
          {
            props.emailUnic &&
            <span className="register__span">Email уже используется</span>
          }
        </fieldset>
        <fieldset className="register__fieldset">
          <label className="register__label" htmlFor="password">Пароль</label>
          <input 
          className="register__input" 
          name="password" 
          type="password"
          reguired="true"
          value={password}
          onChange={handleInputChange}
          ></input>
          {  errors.password.required &&
            <span className="register__span">Поле обязательно для заполнения</span>
          }
        </fieldset>
        <div className="register__button-box">
            <button className={`register__button ${disabledButton}`} type="submit" disabled={isSubmitDisabled}>
              {`Зарегистрироваться${renderButton}`}
              </button>
            <div className="register__text">
              <p className="register__subtitle">Уже зарегистрированы?</p>
              <Link to="signin" className="register__link">Войти</Link>
            </div>
          </div> 
      </form>
    </main>
  )
}

export default Register;