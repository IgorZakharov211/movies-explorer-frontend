import React from 'react';
import './NavTab.css';
import { Link } from 'react-router-dom';

function NavTab() {
  return(
    <nav className="nav-tab">
      <Link to="/signup" className="nav-tab__link">Регистрация</Link>
      <Link to="/signin"><button className="nav-tab__button">Войти</button></Link>
    </nav>
  )
}

export default NavTab;