import React from 'react';
import './Form.css';
import logo from '../../images/logo.svg';
import { Switch, Route, Link } from 'react-router-dom';
import Fieldset from '../Fieldset/Fieldset';

function Form(){
  return(
    <form className="form">
      <Link to="/"><img className="form__logo-img" src={logo} alt="Логотип"></img></Link>
      <Switch>
        <Route path="/signup">
          <h2 className="form__title">Добро пожаловать!</h2>
          <Fieldset 
          labelName="name" 
          labelValue="Имя" 
          defaultInputValue="Игорь" 
          inputType="text"/>
          <Fieldset 
          labelName="email" 
          labelValue="E-mail" 
          defaultInputValue="Igor1994294@yandex.ru" 
          inputType="email"/>
          <Fieldset 
          labelName="password" 
          labelValue="Пароль" 
          defaultInputValue="111" 
          inputType="password"
          incorrect={true}/>
          <button className="form__button" type="submit">Зарегистрироваться</button>
          <div className="form__text">
            <p className="form__subtitle">Уже зарегистрированы?</p>
            <Link to="signin" className="form__link">Войти</Link>
          </div> 
        </Route>
        <Route path="/signin">
          <h2 className="form__title">Рады видеть!</h2>
          <Fieldset 
          labelName="email" 
          labelValue="E-mail" 
          defaultInputValue="Igor1994294@yandex.ru" 
          inputType="email"/>
          <Fieldset 
          labelName="password" 
          labelValue="Пароль" 
          defaultInputValue="" 
          inputType="password"/>
          <button className="form__button form__button_margin_large" type="submit">Войти</button>
          <div className="form__text">
            <p className="form__subtitle">Ещё не зарегистрированы?</p>
            <Link to="signup" className="form__link">Регистрация</Link>
          </div> 
        </Route>
      </Switch>
    </form>
  )
}

export default Form;