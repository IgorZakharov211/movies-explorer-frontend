import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import React, { useState, useEffect } from 'react';
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
import * as Filter from '../../utils/Filter';

function App() {
  const [isEmailUnic, setEmailUnic] = useState(false);
  const [isAuthError, setAuthError] = useState(false);
  const [isRenderSubmit, setRenderSubmit] = useState(false);
  const [isNavOpen, setNavOpen] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isMoviesLoad, setMoviesLoad] = useState(false);
  const [isMoviesFound, setMoviesFound] = useState(false);
  const [isSavedMoviesLoad, setSavedMoviesLoad] = useState(false);
  const [isSavedMoviesFound, setSavedMoviesFound] = useState(false);
  const [isShortMoviesEnable, setShortMoviesEnable] = useState(false);
  const [currentUser, setCurrentUser] = useState({_id: '', name: '', email: '', token: ''});
  const [movies, setMovies] = useState([]);
  const [loadMovies, setLoadMovies] = useState([]);
  const [loadSavedMovies, setLoadSavedMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [savedMoviesId, setSavedMoviesId] = useState([]);
  const history = useHistory();

  function handleLoadMovies(){
    if(localStorage.getItem('movies') !== null ){
      if(JSON.parse(localStorage.getItem('movies')).length == 0){
        setMoviesLoad(false)
      } else{
        setLoadMovies(JSON.parse(localStorage.getItem('movies')))
        setMoviesLoad(true)
        setMoviesFound(true)
      }
    } else{
      setLoadMovies([]);
    }
  }

  function handleLoadSavedMovies(){
    if(localStorage.getItem('saved-movies') !== null ){
      if(JSON.parse(localStorage.getItem('saved-movies')).length == 0){
        setSavedMoviesLoad(false)
      } else{
        setLoadSavedMovies(JSON.parse(localStorage.getItem('saved-movies')))
        setSavedMoviesLoad(true)
        setSavedMoviesFound(true)
      }
    } else{
      setLoadSavedMovies([]);
    }
  }

  useEffect(() => {handleLoadMovies()}, [isLoggedIn])
  useEffect(() => {handleLoadSavedMovies()}, [isLoggedIn])

  function handleSubmitSearch(movie){
    localStorage.removeItem('movies');
    setMoviesFound(false);
    setMoviesLoad(false);
    const resultMovies = Filter.filterMovies(movies, savedMoviesId, movie);
    localStorage.setItem('movies', JSON.stringify(resultMovies));
    if(resultMovies.length !== 0){
      setMoviesFound(true)
      setMoviesLoad(true)
      setLoadMovies(resultMovies)
    } else{
      setMoviesFound(false)
      setMoviesLoad(true)
      setLoadMovies([])
    }
  }

  function handleSubmitSavedSearch(movie){
    localStorage.removeItem('saved-movies');
    setSavedMoviesFound(false);
    setSavedMoviesLoad(false);
    const resultMovies = Filter.filterMovies(savedMovies, savedMoviesId, movie);
    localStorage.setItem('saved-movies', JSON.stringify(resultMovies));
    if(resultMovies.length !== 0){
      setSavedMoviesFound(true)
      setSavedMoviesLoad(true)
      setLoadSavedMovies(resultMovies)
    } else{
      setSavedMoviesFound(false)
      setSavedMoviesLoad(true)
      setLoadSavedMovies([])
    }
  }
/*
  function handleFilterShortMovies(enable){
    if(JSON.parse(localStorage.getItem('movies')).length == 0){
      console.log(1)
    } else{
      if(!enable){
        setShortMoviesEnable(true)
      } else{
        setShortMoviesEnable(false)
      }
    }
  }
*/

  function tokenCheck(){
    if(localStorage.getItem('token')){
      const jwt = localStorage.getItem('token');
      MainApi.getProfile(jwt)
      .then((res)=>{
        const { _id, name, email } = res.data;
        setCurrentUser({ _id: _id, name: name, email: email, token: jwt })
        MoviesApi.getMovies()
        .then((data) => {
          setMovies(data);
          const resultGetMovies = [];
          MainApi.getMovies(jwt).then((data) =>{
          data.forEach((item) => {
            if(res.data._id === item.owner){
              const savedMoviesData = data.map((item) => ({
                id: item.movieId,
                country: item.country,
                created_at: item.created_at,
                description: item.description,
                director: item.director,
                duration: item.duration,
                image: item.image,
                nameRU: item.nameRU,
                nameEN: item.nameEN,
                trailerLink: item.trailer,
                year: item.year,
                isSaved: true
              }))
              setSavedMovies(savedMoviesData);
            }
          })
          data.forEach((item) => { 
            if(res.data._id === item.owner){
              resultGetMovies.push(item.movieId);
            }
          })
          })
          .catch((err) => console.log(err))
          .finally(() => {
            setSavedMoviesId(resultGetMovies)
            setLoggedIn(true);
            history.push('/movies');
        })
        })
        .catch((err) => {
          console.log(err)
        })
      })
      .catch((err) => {
      console.log(err)
      })
    }
  }

  useEffect(() => {tokenCheck()}, [isLoggedIn, loadMovies])
  

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
      localStorage.removeItem('movies');
      localStorage.removeItem('saved-movies');
      setCurrentUser({_id: '', name: '', email: '', token: ''});
      setLoggedIn(false);
      setMovies([]);
      setSavedMovies([]);
      setSavedMoviesId([]);
      setLoadMovies([]);
      setLoadSavedMovies([]);
      setMoviesLoad(false);
      setMoviesFound(false);
      history.push('/');
    }

    function handleCreateMovie(movie){
      const jwt = localStorage.getItem('token');
      MainApi.createMovie(
        jwt, 
        movie.country, 
        movie.director,
        movie.duration,
        movie.year,
        movie.description,
        movie.image.url,
        movie.trailerLink,
        movie.image.url,
        movie.id,
        movie.nameRU,
        movie.nameEN
      )
      .then((res) => {
        changeSave(movie);
      })
      .catch((err) => {
        console.log(err)
      })
    }

    function changeSave(movie){ 
      const newMovies = loadMovies.map((c) => { 
        if(c.id === movie.id){
          if(c.isSaved === false){
            return {
              id: movie.id,
              country: movie.country, 
              director: movie.director,
              duration: movie.duration,
              year: movie.year,
              description: movie.description,
              image: movie.image,
              trailerLink: movie.trailerLink,
              nameRU: movie.nameRU,
              nameEN: movie.nameEN,
              isSaved: true
            }
          } else{
            return {
              id: movie.id,
              country: movie.country, 
              director: movie.director,
              duration: movie.duration,
              year: movie.year,
              description: movie.description,
              image: movie.image,
              trailerLink: movie.trailerLink,
              nameRU: movie.nameRU,
              nameEN: movie.nameEN,
              isSaved: false
          }
        }
      } else{
        return c
      }})
      setLoadMovies(newMovies);
    }

    function handleDeleteMovie(movie){
      const jwt = localStorage.getItem('token');
      MainApi.getMovies(jwt).then((data) => {
        data.forEach((item) => {
          if(Number(item.movieId) === Number(movie.id)){
            MainApi.deleteMovie(jwt, item._id)
            .then((res) => {
              changeSave(movie);
            })
            .catch((err) => console.log(err))
          }
        })
      })
    }

    function handleSaveMovie(e){
      const movieId = e.target.parentElement.parentElement.id;
      loadMovies.map((item) => {
        if(Number(item.id) === Number(movieId)){
          if(item.isSaved === false){
            handleCreateMovie(item)
          } else{
            handleDeleteMovie(item)
          }
        }
      })
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
            <Login onLogin={handleLogin} authError={isAuthError} renderSubmit={isRenderSubmit}/>
          </Route>
          <Route path="/signup">
            <Register onRegister={handleRegister} emailUnic={isEmailUnic} renderSubmit={isRenderSubmit}/>
          </Route>
          <ProtectedRoute
          path="/movies"
          loggedIn={isLoggedIn}
          onBurgerButton = {handleNavOpen}
          movies={loadMovies}
          searchMovies={handleSubmitSearch}
          isMoviesLoad={isMoviesLoad}
          component={Movies}
          saveMovie={handleSaveMovie} 
          isMoviesFound={isMoviesFound}
          />
          <ProtectedRoute
          path="/saved-movies"
          loggedIn={isLoggedIn}
          onBurgerButton = {handleNavOpen}
          isSavedMoviesLoad={isSavedMoviesLoad}
          component={SavedMovies}
          searchSavedMovies={handleSubmitSavedSearch}
          movies={loadSavedMovies}
          isSavedMoviesFound={isSavedMoviesFound}
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
