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
import * as MoviesApi from '../../utils/MoviesApi';

function App() {
  const [isEmailUnic, setEmailUnic] = React.useState(false);
  const [isAuthError, setAuthError] = React.useState(false);
  const [isRenderSubmit, setRenderSubmit] = React.useState(false);
  const [isNavOpen, setNavOpen] = React.useState(false);
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [isMoviesLoad, setMoviesLoad] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({_id: '', name: '', email: '', token: ''});
  const [movies, setMovies] = React.useState([]);
  const history = useHistory();


  function handleSubmitSearch(){
    MoviesApi.getMovies().then((data) => {
      setMovies(data.map((item) => ({
        id: item.id,
        country: item.country,
        created_at: item.created_at,
        description: item.description,
        director: item.director,
        duration: item.duration,
        image: item.image,
        nameRU: item.nameRU,
        nameEN: item.nameEN,
        trailerLink: item.trailerLink,
        year: item.year
      })))
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(setMoviesLoad(true));
  }


  function handleChangeMoviesLoad(){
    setMoviesLoad(false);
  }

  function tokenCheck(){
    if(localStorage.getItem('token')){
      const jwt = localStorage.getItem('token');
      MainApi.getProfile(jwt).then((res)=>{
        const { _id, name, email } = res.data;
        setCurrentUser({ _id: _id, name: name, email: email, token: jwt })
        setLoggedIn(true);
        history.push('/movies');
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
    setRenderSubmit(true);
    if (name && email && password){
      MainApi.register(name, email, password).then((res) =>{
        handleLogin(email, password);
        setRenderSubmit(false);
      })
      .catch((err) => {
        if(err.status === 409){
          setEmailUnic(true)
          setRenderSubmit(false);
        } else {
          console.log(`Ошибка: ${err.status}`)
          setRenderSubmit(false);
        }
      })
      } else{
        console.log('Не передано одно из полей');
        setRenderSubmit(false);
    }}

    function handleLogin(email, password){
      setRenderSubmit(true);
      MainApi.authorize(email, password).then((res) => {
        if(res.token){
          localStorage.setItem('token', res.token);
          setLoggedIn(true);
          history.push('/movies');
          setRenderSubmit(false);
        }
      })
      .catch((err)=> {
        if(err.status === 401){
          setAuthError(true)
          setRenderSubmit(false);
        } else {
          console.log(`Ошибка: ${err.status}`);
          setRenderSubmit(false);
        }
      })
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
            <Header isLoggedIn={isLoggedIn} changeMoviesLoad={handleChangeMoviesLoad}/>
            <Main />
            <Footer />
          </Route>
          <Route path="/signin">
            <Login onLogin={handleLogin} authError={isAuthError} renderSubmit={isRenderSubmit}/>
          </Route>
          <Route path="/signup">
            <Register onRegister={handleRegister} emailUnic={isEmailUnic} renderSubmit={isRenderSubmit}/>
          </Route>
          <ProtectedRoute
          path="/movies"
          loggedIn={isLoggedIn}
          onBurgerButton = {handleNavOpen}
          changeMoviesLoad={handleChangeMoviesLoad}
          movies={movies}
          searchMovies={handleSubmitSearch}
          isMoviesLoad={isMoviesLoad}
          component={Movies}
          />
          <ProtectedRoute
          path="/saved-movies"
          loggedIn={isLoggedIn}
          onBurgerButton = {handleNavOpen}
          changeMoviesLoad={handleChangeMoviesLoad}
          isMoviesLoad={isMoviesLoad}
          component={SavedMovies}
          />
          <ProtectedRoute
          path="/profile"
          loggedIn={isLoggedIn}
          onBurgerButton = {handleNavOpen}
          changeMoviesLoad={handleChangeMoviesLoad}
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
