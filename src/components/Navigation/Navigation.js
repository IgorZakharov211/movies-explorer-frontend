import React from 'react';
import './Navigation.css';
import { Link, NavLink } from 'react-router-dom';

function Navigation(props){
  const lightNavLink = (props.lightTheme) ? 'navigation__nav-link_color_white' : '';
  const lightProfile = (props.lightTheme) ? 'navigation__profile_color_green' : '';

  return(
    <nav className="navigation">
      <div className="navigation__desktop">
        <NavLink to="/movies" className={`navigation__nav-link ${lightNavLink}`} activeClassName="navigation__nav-link_active">Фильмы</NavLink>
        <NavLink to="/saved-movies" className={`navigation__nav-link ${lightNavLink}`} activeClassName="navigation__nav-link_active">Сохраненные фильмы</NavLink>
        <Link to="/profile"><button className={`navigation__profile ${lightProfile}`}><p className="navigation__profile-text">Аккаунт</p></button></Link>
      </div>
      <button className="navigation__burger" onClick={props.onBurgerButton}></button>
    </nav>
  )
}

export default Navigation;
