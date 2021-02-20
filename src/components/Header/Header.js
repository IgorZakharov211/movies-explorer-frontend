import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import './Header.css';
import headerLogo from '../../images/logo.svg';


function Header() {
  return (
    <Switch>
      <Route exact path="/">
        <header className="header main__header">
          <Link to="/"><img src={headerLogo} alt="Логотип" className="header__logo" /></Link>
          <nav>
            <Link to="/signup"><button className="header__button">Регистрация</button></Link>
            <Link to="/signin"><button className="header__button header__button_color_green">Войти</button></Link>
          </nav>
        </header>
      </Route>
    </Switch>
  );
}

export default Header;