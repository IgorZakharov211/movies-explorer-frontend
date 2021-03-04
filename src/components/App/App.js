import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import React, { useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
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
import * as MainApi from '../../utils/MainApi';

function App() {
  const [isNavOpen, setNavOpen] = React.useState(false);
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({_id: '', name: '', email: '', token: ''});
  const history = useHistory();

  function tokenCheck(){
    if(localStorage.getItem('token')){
      const jwt = localStorage.getItem('token');
      MainApi.getProfile(jwt).then((res)=>{
        const { _id, name, email } = res.data;
        setCurrentUser({ _id: _id, name: name, email: email, token: jwt })
        setLoggedIn(true);
        history.push('/');
      })
      .catch((err) => console.log(err));
    }
  }

  useEffect(() => {tokenCheck()}, [isLoggedIn])

  function handleNavOpen(){
    setNavOpen(true);
  }

  function closeAllPopups(){
    setNavOpen(false);
  }

  function handleRegister(name, email, password){
    if (name && email && password){
      MainApi.register(name, email, password).then((res) =>{
        if (res.statusCode !== 400){
          console.log('ok')
        } else{
          console.log('Некорректно заполнено одно из полей');
        }
      })
      .catch((err) => {
        console.log(err)
      })
      } else{
        console.log('Не передано одно из полей');
    }}

    function handleLogin(email, password){
      MainApi.authorize(email, password).then((res) => {
        if(res.token){
          localStorage.setItem('token', res.token);
          setLoggedIn(true);
          history.push('/');
        }
      })
      .catch((err)=> {console.log(err)})
    }

    function handleUpdateUser(name, email){
      MainApi.patchMyInfo(name, email, currentUser.token).then((res) => {
        console.log(res)
        const { _id, name, email} = res.data;
        setCurrentUser({_id: _id, name: name, email: email, token: currentUser.token})
      })
      .catch((err) =>{
        console.log(err);
      });
    }

    function handleSignOut(){
      localStorage.removeItem('token');
      setCurrentUser({_id: '', name: '', email: '', token: ''});
      history.push('/');
      setLoggedIn(false);
    }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app-page">
        <Popup isOpen={isNavOpen} onClose={closeAllPopups}/>
        <Switch>
          <Route exact path="/">
            <Header isLoggedIn={isLoggedIn}/>
            <Main />
            <Footer />
          </Route>
          <Route path="/signin">
            <Login onLogin={handleLogin}/>
          </Route>
          <Route path="/signup">
            <Register onRegister={handleRegister}/>
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
          onUpdateUser={handleUpdateUser}
          sighOut={handleSignOut}
          />
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
