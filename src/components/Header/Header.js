import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import headerLogo from '../../images/logo.svg';
import NavTab from '../NavTab/NavTab';


function Header(props) {
  return (
    <header className="header main__header">
      <Link to="/"><img src={headerLogo} alt="Логотип" className="header__logo" /></Link>
      <NavTab onBurgerButton={props.onBurgerButton}/>
    </header>
  );
}

export default Header;