import React from 'react';
import './NavTab.css';
import { Switch, Route, Link, NavLink } from 'react-router-dom';

function NavTab(props) {
  return(
    <nav className="nav-tab">
      <Switch>
        <Route exact path="/">
          <Link to="/signup" className="nav-tab__link">Регистрация</Link>
          <Link to="/signin"><button className="nav-tab__button">Войти</button></Link>
        </Route>
        <Route path="/movies">
          <div className="nav-tab__desktop">
            <NavLink to="/movies" className="nav-tab__nav-link" activeClassName="nav-tab__nav-link_active">Фильмы</NavLink>
            <NavLink to="/saved-movies" className="nav-tab__nav-link" activeClassName="nav-tab__nav-link_active">Сохраненные фильмы</NavLink>
            <Link to="/profile"><button className="nav-tab__profile"><p className="nav-tab__profile-text">Аккаунт</p></button></Link>
          </div>
          <button className="nav-tab__burger" onClick={props.onBurgerButton}></button>
        </Route>
        <Route path="/saved-movies">
          <div className="nav-tab__desktop">
            <NavLink to="/movies" className="nav-tab__nav-link" activeClassName="nav-tab__nav-link_active">Фильмы</NavLink>
            <NavLink to="/saved-movies" className="nav-tab__nav-link" activeClassName="nav-tab__nav-link_active">Сохраненные фильмы</NavLink>
            <Link to="/profile"><button className="nav-tab__profile"><p className="nav-tab__profile-text">Аккаунт</p></button></Link>
          </div>
          <button className="nav-tab__burger" onClick={props.onBurgerButton}></button>
        </Route>
        <Route path="/profile">
          <div className="nav-tab__desktop">
            <NavLink to="/movies" className="nav-tab__nav-link" activeClassName="nav-tab__nav-link_active">Фильмы</NavLink>
            <NavLink to="/saved-movies" className="nav-tab__nav-link" activeClassName="nav-tab__nav-link_active">Сохраненные фильмы</NavLink>
            <Link to="/profile"><button className="nav-tab__profile"><p className="nav-tab__profile-text">Аккаунт</p></button></Link>
          </div>
          <button className="nav-tab__burger" onClick={props.onBurgerButton}></button>
        </Route>
      </Switch>
    </nav>
  )
}

export default NavTab;