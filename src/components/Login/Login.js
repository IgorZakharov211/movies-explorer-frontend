import React from 'react';
import './Login.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

function Login(){

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleEmailChange = event => setEmail(event.target.value);
  const handlePasswordChange = event => setPassword(event.target.value);


  return(
    <main className="login">
      <form className="login__form">
        <Link to="/"><img className="login__logo-img" src={logo} alt="Логотип"></img></Link>
        <h2 className="login_title">Рады видеть!</h2>
        <fieldset className="login__fieldset">
          <label className="login__label" htmlFor="email">E-mail</label>
          <input 
          className="login__input" 
          name="email" 
          value={email}
          type="email"
          reguired="true"
          onChange={handleEmailChange}
          ></input>
          <span className="login__span">Что-то пошло не так...</span>
        </fieldset>
        <fieldset className="login__fieldset">
          <label className="login__label" htmlFor="password">Пароль</label>
          <input 
          className="login__input" 
          name="password" 
          value={password}
          type="password"
          reguired="true"
          onChange={handlePasswordChange}
          ></input>
          <span className="login__span">Что-то пошло не так...</span>
        </fieldset>
        <div className="login__button-box">
            <button className="login__button" type="submit">Войти</button>
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