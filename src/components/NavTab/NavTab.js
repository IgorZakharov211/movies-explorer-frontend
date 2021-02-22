import React from 'react';
import './NavTab.css';
import { Switch, Route, Link, NavLink } from 'react-router-dom';

function NavTab() {
  return(
    <nav className="nav-tab">
      <Switch>
        <Route exact path="/">
          <Link to="/signup" className="nav-tab__link">Регистрация</Link>
          <Link to="/signin"><button className="nav-tab__button">Войти</button></Link>
        </Route>
        <Route path="/movies">
          <NavLink to="/movies" className="nav-tab__nav-link" activeClassName="nav-tab__nav-link_active">Фильмы</NavLink>
          <NavLink to="/saved-movies" className="nav-tab__nav-link" activeClassName="nav-tab__nav-link_active">Сохраненные фильмы</NavLink>
          <Link to="/profile"><button className="nav-tab__profile"><p className="nav-tab__profile-text">Аккаунт</p></button></Link>
        </Route>
        <Route path="/saved-movies">
          <NavLink to="/movies" className="nav-tab__nav-link" activeClassName="nav-tab__nav-link_active">Фильмы</NavLink>
          <NavLink to="/saved-movies" className="nav-tab__nav-link" activeClassName="nav-tab__nav-link_active">Сохраненные фильмы</NavLink>
          <Link to="/profile"><button className="nav-tab__profile"><p className="nav-tab__profile-text">Аккаунт</p></button></Link>
        </Route>
        <Route path="/profile">
          <NavLink to="/movies" className="nav-tab__nav-link" activeClassName="nav-tab__nav-link_active">Фильмы</NavLink>
          <NavLink to="/saved-movies" className="nav-tab__nav-link" activeClassName="nav-tab__nav-link_active">Сохраненные фильмы</NavLink>
          <Link to="/profile"><button className="nav-tab__profile"><p className="nav-tab__profile-text">Аккаунт</p></button></Link>
        </Route>
      </Switch>
    </nav>
  )
}

export default NavTab;