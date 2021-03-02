import React from 'react';
import './Register.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Register(props){

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleNameChange = event => setName(event.target.value);
  const handleEmailChange = event => setEmail(event.target.value);
  const handlePasswordChange = event => setPassword(event.target.value);

  return(
    <main className="register">
      <form className="register__form">
        <Link to="/"><img className="register__logo-img" src={logo} alt="Логотип"></img></Link>
        <h2 className="register__title">Добро пожаловать!</h2>
        <fieldset className="register__fieldset">
          <label className="register__label" htmlFor="name">Имя</label>
          <input 
          className="register__input" 
          name="name" 
          value={name}
          type="text"
          reguired="true"
          onChange={handleNameChange}
          ></input>
          <span className="register__span">Что-то пошло не так...</span>
        </fieldset>
        <fieldset className="register__fieldset">
          <label className="register__label" htmlFor="email">E-mail</label>
          <input 
          className="register__input" 
          name="email" 
          value={email}
          type="email"
          reguired="true"
          onChange={handleEmailChange}
          ></input>
          <span className="register__span">Что-то пошло не так...</span>
        </fieldset>
        <fieldset className="register__fieldset">
          <label className="register__label" htmlFor="password">Пароль</label>
          <input 
          className="register__input" 
          name="password" 
          value={password}
          type="password"
          reguired="true"
          onChange={handlePasswordChange}
          ></input>
          <span className="register__span">Что-то пошло не так...</span>
        </fieldset>
        <div className="register__button-box">
            <button className="register__button" type="submit">Зарегистрироваться</button>
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