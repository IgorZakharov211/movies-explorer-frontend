import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import headerLogo from '../../images/logo.svg';


function Header() {
  return (
    <header className="header main__header">
      <Link to="/"><img src={headerLogo} alt="Логотип" className="header__logo" /></Link>
      <nav>
        <Link to="/signup"><button className="header__button">Регистрация</button></Link>
        <Link to="/signin"><button className="header__button header__button_green">Войти</button></Link>
      </nav>
    </header>
  );
}

export default Header;