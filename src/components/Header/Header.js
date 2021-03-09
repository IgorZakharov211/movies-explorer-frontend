import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import './Header.css';
import headerLogo from '../../images/logo.svg';
import NavTab from '../NavTab/NavTab';
import Navigation from '../Navigation/Navigation';


function Header(props) {
  return (
    <header className="header main__header">
      <Link to="/"><img src={headerLogo} alt="Логотип" className="header__logo" /></Link>
      <Switch>
        <Route exact path="/">
          {(props.isLoggedIn) ? <Navigation onBurgerButton={ props.onBurgerButton } lightTheme={ true } changeMoviesLoad={props.changeMoviesLoad}/> : <NavTab /> }
        </Route>
        <Route path="/movies">
          <Navigation onBurgerButton={props.onBurgerButton} changeMoviesLoad={props.changeMoviesLoad}/>
        </Route>
        <Route path="/saved-movies">
          <Navigation onBurgerButton={props.onBurgerButton} changeMoviesLoad={props.changeMoviesLoad}/>
        </Route>
        <Route path="/profile">
          <Navigation onBurgerButton={props.onBurgerButton} changeMoviesLoad={props.changeMoviesLoad}/>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;