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
  const [isPreloaderEnable, setPreloaderEnable] = useState(false);
  const [isSavedMoviesLoad, setSavedMoviesLoad] = useState(false);
  const [isSavedMoviesFound, setSavedMoviesFound] = useState(false);
  const [isShortMoviesEnable, setShortMoviesEnable] = useState(false);
  const [currentUser, setCurrentUser] = useState({_id: '', name: '', email: '', token: ''});
  const [loadMovies, setLoadMovies] = useState([]);
  const [loadSavedMovies, setLoadSavedMovies] = useState([]);
  const [isUpdateSuccess, setUpdateSuccess] = useState(false);
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
    if((localStorage.getItem('api-movies') === null) || (localStorage.getItem('saved-movies-id') === null)){
      setPreloaderEnable(true)
      const jwt = localStorage.getItem('token');
      MainApi.getMovies(jwt)
      .then((data) => {
        const mainApiMovies = [];
        const savedMoviesId = [];
        data.forEach((item) => { 
          if(currentUser._id == item.owner){
            mainApiMovies.push({
              id: item._id,
              country: item.country, 
              director: item.director,
              duration: item.duration,
              year: item.year,
              description: item.description,
              image: item.image,
              trailerLink: item.trailer,
              nameRU: item.nameRU,
              nameEN: item.nameEN,
              movieId: item.movieId,
              isSaved: true,
              isShort: (item.duration < 40) ? true : false
            });
            savedMoviesId.push(item.movieId);
          }
        })
        const moviesApi = [];
        MoviesApi.getMovies()
        .then((data) => {
          data.forEach((item) => {
            moviesApi.push(item);
          })
        })
        .catch((err) => console.log(err))
        .finally(() => {
          localStorage.setItem('api-movies', JSON.stringify(moviesApi));
          localStorage.setItem('saved-movies-id', JSON.stringify(savedMoviesId));
          localStorage.setItem('main-api-movies', JSON.stringify(mainApiMovies));
          filterSearch(moviesApi, savedMoviesId, movie);
        })
      })
      .catch((err) => console.log(err))
    } else {
      filterSearch(JSON.parse(localStorage.getItem('api-movies')), JSON.parse(localStorage.getItem('saved-movies-id')), movie);
    }
  }

  function filterSearch(movies, savedMoviesId, movie){
    const resultMovies = Filter.filterMovies(movies, savedMoviesId, movie);
    localStorage.setItem('movies', JSON.stringify(resultMovies));
    if(resultMovies.length !== 0){
      setMoviesFound(true)
      setMoviesLoad(true)
      setLoadMovies(resultMovies)
      setPreloaderEnable(false)
    } else{
      setMoviesFound(false)
      setMoviesLoad(true)
      setLoadMovies([])
    }
  }

  function handleSubmitSavedSearch(movie){
    if((localStorage.getItem('main-api-movies') === null) || (localStorage.getItem('saved-movies-id') === null)){
      setPreloaderEnable(true);
      const jwt = localStorage.getItem('token');
      MainApi.getMovies(jwt)
      .then((data) => {
        const mainApiMovies = [];
        const mainApiMoviesId = [];
        data.forEach((item) => { 
          if(currentUser._id == item.owner){
            mainApiMovies.push({
              id: item._id,
              country: item.country, 
              director: item.director,
              duration: item.duration,
              year: item.year,
              description: item.description,
              image: item.image,
              trailerLink: item.trailer,
              nameRU: item.nameRU,
              nameEN: item.nameEN,
              movieId: item.movieId,
              isSaved: true,
              isShort: (item.duration < 40) ? true : false
            });
            mainApiMoviesId.push(item.movieId);
          }
        })
        localStorage.setItem('main-api-movies', JSON.stringify(mainApiMovies));
        localStorage.setItem('saved-movies-id', JSON.stringify(mainApiMoviesId));
        filterSavedSearch(mainApiMovies, mainApiMoviesId, movie);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setPreloaderEnable(false)
      })
    } else {
      filterSavedSearch(JSON.parse(localStorage.getItem('main-api-movies')), JSON.parse(localStorage.getItem('saved-movies-id')), movie);
    }
  }

  function filterSavedSearch(savedMovies, savedMoviesId, movie){
    const resultMovies = Filter.filterMovies(savedMovies, savedMoviesId, movie);
    localStorage.setItem('saved-movies', JSON.stringify(resultMovies));
    if(resultMovies.length !== 0){
      setSavedMoviesFound(true)
      setSavedMoviesLoad(true)
      setLoadSavedMovies(resultMovies)
      setPreloaderEnable(false)
    } else{
      setSavedMoviesFound(false)
      setSavedMoviesLoad(true)
      setLoadSavedMovies([])
    }
  }


  function handleFilterShortMovies(enable){
    setShortMoviesEnable(!enable);
  }

  function tokenCheck(){
    if(localStorage.getItem('token')){
      const jwt = localStorage.getItem('token');
      MainApi.getProfile(jwt)
      .then((res)=>{
        const { _id, name, email } = res.data;
        setCurrentUser({ _id: _id, name: name, email: email, token: jwt })
      })
      .catch((err) => {
      console.log(err)
      })
      .finally(() => {
        setLoggedIn(true);
        history.push('/movies');
      })
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
      setRenderSubmit(true);
      MainApi.patchMyInfo(name, email, currentUser.token).then((res) => {
        const { _id, name, email} = res.data;
        setCurrentUser({_id: _id, name: name, email: email, token: currentUser.token});
        setRenderSubmit(false);
        setUpdateSuccess(true);
      })
      .catch((err) =>{
        console.log(err);
      });
    }

    function handleSignOut(){
      localStorage.removeItem('token');
      localStorage.removeItem('movies');
      localStorage.removeItem('saved-movies');
      localStorage.removeItem('api-movies');
      localStorage.removeItem('main-api-movies');
      localStorage.removeItem('saved-movies-id');
      setCurrentUser({_id: '', name: '', email: '', token: ''});
      setLoggedIn(false);
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
        const newSavedMovies = JSON.parse(localStorage.getItem('main-api-movies'));
        newSavedMovies.push({
          id: res.data._id,
          country: res.data.country,
          description: res.data.description,
          director: res.data.director,
          duration: res.data.duration,
          image: res.data.image,
          isSaved: true,
          isShort: (res.data.duration < 40) ? true: false,
          movieId: res.data.movieId,
          nameEN: res.data.nameEN,
          nameRU: res.data.nameRU,
          trailerLink: res.data.trailer,
          year: res.data.year
        })
        localStorage.setItem('main-api-movies', JSON.stringify(newSavedMovies));
        changeMovie(movie);
      })
      .catch((err) => {
        console.log(err)
      })
    }

    function changeMovie(movie){ 
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
              movieId: movie.id,
              isSaved: true,
              isShort: movie.isShort
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
              movieId: movie.id,
              isSaved: false,
              isShort: movie.isShort
          }
        }
      } else{
        return c
      }})
      let savedMoviesId = [];
      if(JSON.parse(localStorage.getItem('saved-movies-id')).includes(String(movie.id))){
        savedMoviesId = JSON.parse(localStorage.getItem('saved-movies-id')).filter(item => {return Number(item) !== Number(movie.id)})
      } else{
        savedMoviesId = JSON.parse(localStorage.getItem('saved-movies-id'));
        savedMoviesId.push(String(movie.id));
      }
      setLoadMovies(newMovies);
      const newSavedMovies = loadSavedMovies.filter((item) => {
        return Number(item.movieId) !== Number(movie.id)
      });
      setLoadSavedMovies(newSavedMovies);
      localStorage.setItem('saved-movies-id', JSON.stringify(savedMoviesId));
      localStorage.setItem('movies', JSON.stringify(newMovies));
      setLoadMovies(newMovies);
      setLoadSavedMovies(newSavedMovies);
      localStorage.setItem('saved-movies', JSON.stringify(newSavedMovies));
    }

    function handleDeleteMovie(movie){
      const movieId = JSON.parse(localStorage.getItem('main-api-movies')).filter((item) =>{
        return Number(item.movieId) == Number(movie.id)
      });
      const jwt = localStorage.getItem('token');
      MainApi.deleteMovie(jwt, movieId[0].id)
      .then((res) => {
        const newSavedMovies = JSON.parse(localStorage.getItem('main-api-movies')).filter((item) => {
          return Number(item.movieId) !== Number(movie.id)
        });
        localStorage.setItem('main-api-movies', JSON.stringify(newSavedMovies));
        changeMovie(movie);
      })
      .catch((err) => console.log(err))
    }

    function handleSaveMovie(movieId){
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
          shortMovies={handleFilterShortMovies}
          isShortMoviesEnable={isShortMoviesEnable}
          isPreloaderEnable={isPreloaderEnable}
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
          saveMovie={handleSaveMovie} 
          isShortMoviesEnable={isShortMoviesEnable}
          shortMovies={handleFilterShortMovies}
          isPreloaderEnable={isPreloaderEnable}
          />
          <ProtectedRoute
          path="/profile"
          renderSubmit={isRenderSubmit}
          loggedIn={isLoggedIn}
          onBurgerButton = {handleNavOpen}
          component={Profile}
          onUpdateUser={handleUpdateUser}
          sighOut={handleSignOut}
          successUpdate={isUpdateSuccess}
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
