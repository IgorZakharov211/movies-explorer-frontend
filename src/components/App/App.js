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

function App() {
  const [isNavOpen, setNavOpen] = React.useState(false);

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
        <Route path="/movies">
          <Header onBurgerButton = {handleNavOpen}/>
          <Movies />
          <Footer />
        </Route>
        <Route path="/saved-movies">
          <Header onBurgerButton = {handleNavOpen}/>
          <SavedMovies />
          <Footer />
        </Route>
        <Route path="/profile">
          <Header onBurgerButton = {handleNavOpen}/>
          <Profile />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
