import React, { useState, useCallback, useEffect } from 'react';
import './Login.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import { validators } from '../FormValidator/FormValidator';

function Login(props){

  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
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
    const { email, password } = formValues;

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
      email: emailValidationResult,
      password: passwordValidationResult
    });
  }, [formValues, setErrors]);

  const { email, password } = formValues;
  const isEmailInvalid = Object.values(errors.email).some(Boolean);
  const isPasswordInvalid = Object.values(errors.password).some(Boolean);
  const isSubmitDisabled = isEmailInvalid || isPasswordInvalid;
  const disabledButton = (isSubmitDisabled) ? 'login__button_disabled': '';
  const renderButton = (props.renderSubmit) ? '...' : '';

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onLogin(email, password);
  }

  return(
    <main className="login">
      <form className="login__form" action="#" method="POST" name="login" onSubmit={handleSubmit}>
        <Link to="/"><img className="login__logo-img" src={logo} alt="Логотип"></img></Link>
        <h2 className="login__title">Рады видеть!</h2>
        <fieldset className="login__fieldset">
          <label className="login__label" htmlFor="email">E-mail</label>
          <input 
          className="login__input" 
          name="email" 
          value={email}
          type="email"
          reguired="true"
          onChange={handleInputChange}
          ></input>
          {  errors.email.required &&
            <span className="register__span">Поле обязательно для заполнения</span>
          }
          {  errors.email.isEmail &&
            <span className="register__span">Поле должно содержать email адрес</span>
          }
          {
            props.authError &&
            <span className="register__span">Неправильный email или пароль</span>
          }
        </fieldset>
        <fieldset className="login__fieldset">
          <label className="login__label" htmlFor="password">Пароль</label>
          <input 
          className="login__input" 
          name="password" 
          value={password}
          type="password"
          reguired="true"
          onChange={handleInputChange}
          ></input>
          {  errors.password.required &&
            <span className="register__span">Поле обязательно для заполнения</span>
          }
          {
            props.authError &&
            <span className="register__span">Неправильный email или пароль</span>
          }
        </fieldset>
        <div className="login__button-box">
        <button className={`login__button ${disabledButton}`} type="submit" disabled={isSubmitDisabled}>
        {`Войти${renderButton}`}
          </button>
            <div className="login__text">
              <p className="login__subtitle">Ещё не зарегистрированы?</p>
              <Link to="signup" className="login__link">Регистрация</Link>
            </div> 
          </div>
      </form>
    </main>
  )
}

export default Login;