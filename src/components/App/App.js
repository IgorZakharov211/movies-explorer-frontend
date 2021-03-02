import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Popup from '../Popup/Popup';
import NotFound from '../NotFound/NotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const [isNavOpen, setNavOpen] = React.useState(false);
  const [isLoggedIn, setLoggedIn] = React.useState(false);

  function handleNavOpen(){
    setNavOpen(true);
  }

  function closeAllPopups(){
    setNavOpen(false);
  }

  return (
    <div className="app-page">
      <Popup isOpen={isNavOpen} onClose={closeAllPopups}/>
      <Switch>
        <Route exact path="/">
          <Header />
          <Main />
          <Footer />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <ProtectedRoute
        path="/movies"
        loggedIn={isLoggedIn}
        onBurgerButton = {handleNavOpen}
        component={Movies}
        />
        <ProtectedRoute
        path="/saved-movies"
        loggedIn={isLoggedIn}
        onBurgerButton = {handleNavOpen}
        component={SavedMovies}
        />
        <ProtectedRoute
        path="/profile"
        loggedIn={isLoggedIn}
        onBurgerButton = {handleNavOpen}
        component={Profile}
        />
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
