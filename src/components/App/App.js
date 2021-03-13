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
  const [isRenderSearch, setRenderSearch] = React.useState(false);
  const [isNavOpen, setNavOpen] = React.useState(false);
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [isMoviesLoad, setMoviesLoad] = React.useState(false);
  const [isMoviesFound, setMoviesFound] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({_id: '', name: '', email: '', token: ''});
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [savedMoviesId, setSavedMoviesId] = React.useState([]);
  const history = useHistory();

  function getSavedMovieId(){
    const jwt = localStorage.getItem('token');
    const resultGetMovies = [];
    MainApi.getMovies(jwt).then((data) =>{
      data.forEach((item) => { 
        resultGetMovies.push(item.movieId);
      })
    })
    .catch((err) => console.log(err))
    .finally(() => {
      setSavedMoviesId(resultGetMovies)
    });
  }

  function handleSearch(movie, data, whereOpen){
    getSavedMovieId();
    const movies = data.map((item) => ({
      id: (whereOpen === 'movies') ? item.id: item.movieId,
      country: item.country,
      created_at: item.created_at,
      description: item.description,
      director: item.director,
      duration: item.duration,
      image: item.image,
      nameRU: item.nameRU,
      nameEN: item.nameEN,
      trailerLink: (whereOpen === 'movies') ? item.trailerLink : item.trailer,
      year: item.year,
      isSaved: (whereOpen === 'movies') ? savedMoviesId.includes(String(item.id)) : savedMoviesId.includes(String(item.movieId))
    }))
    const result = movies.filter(item => {
      let position = -1;
      while((position = item.nameRU.replace( /^\s+/g, '').toLowerCase().indexOf(movie.toLowerCase(), position + 1)) != -1){
        if(position != -1){
          return item;
        } else{
          return false;
        }
      }
    })
    return result;
  }

  function handleSubmitSearch(movie){
    setRenderSearch(true);
    localStorage.removeItem('movies');
    setMovies('');
    MoviesApi.getMovies().then((data) => {
      const result = handleSearch(movie, data, 'movies');
      if(result.length !== 0){
        setMoviesFound(true)
        setMovies(result);
        localStorage.setItem('movies', JSON.stringify(result));
      } else {
        setMoviesFound(false)
      } 
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() =>{
      setMoviesLoad(true);
      setRenderSearch(false);
    });
  }

  function handleSubmitSavedSearch(movie){
    setRenderSearch(true);
    const jwt = localStorage.getItem('token');
    MainApi.getMovies(jwt).then((data) =>{
      console.log(data)
      const result = handleSearch(movie, data, 'saved-movies');
      if(result.length !== 0){
        setMoviesFound(true)
        setSavedMovies(result);
        localStorage.setItem('saved-movies', JSON.stringify(result));
      } else {
        setMoviesFound(false)
      } 
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() =>{
      setMoviesLoad(true);
      setRenderSearch(false);
    });
  }

  function loadMovies(){
    if(localStorage.getItem('movies') !== null){
      setMovies(JSON.parse(localStorage.getItem('movies')));
      setMoviesFound(true);
      setMoviesLoad(true);
    } else {
      setMoviesFound(false);
      setMoviesLoad(false);
    }
  }

  useEffect(() => {loadMovies()}, [])

  function handleFilterShortMovies(enable){
    if(enable === false && movies !== null){
      const result = movies.filter(item => {
        return item.duration < 40;
      })
      if(result.length !== 0){
        setMoviesFound(true);
        setMovies(result);
      } else{
        setMoviesFound(false);
        setMovies('');
      }
    } else if(enable === true){
      setMoviesFound(true);
      setMovies(JSON.parse(localStorage.getItem('movies')));
    }
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
      ).then((res) => {
        console.log(`Карточка ${res} добавлена`)
        loadMovies();
        }).catch((err) => {
          console.log(err)
        })
    }

    function handleDeleteMovie(movie){
      const jwt = localStorage.getItem('token');
      let resultGetMovie = '';
      MainApi.getMovies(jwt).then((data) =>{
      data.forEach((item) => { 
       if(Number(item.movieId) === Number(movie.id)){
          resultGetMovie= item._id;
      } 
      })
      MainApi.deleteMovie(jwt, resultGetMovie).then((res) => {console.log(`Карточка ${res} удалена`)})
      loadMovies();
      })
    }

    function handleSaveMovie(e){
      const movieId = e.target.parentElement.parentElement.id;
      movies.map((item) => {
        if(item.id == movieId){
          if(item.isSaved === false){
            handleCreateMovie(item);
          } else if (item.isSaved === true){
            handleDeleteMovie(item);
          }
        }
      })
      const newMovies = movies.map((item) => {
        if(item.id == movieId){
          if(item.isSaved === false){
            return {
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
              year: item.year,
              isSaved: true
            }
          } else if(item.isSaved === true) {
            return {
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
              year: item.year,
              isSaved: false
            }
          }
        } else{
          return item
        }
      });
      setMovies(newMovies);
      localStorage.setItem('movies', JSON.stringify(newMovies));
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
          movies={movies}
          searchMovies={handleSubmitSearch}
          shortMovies={handleFilterShortMovies}
          renderSearch={isRenderSearch}
          isMoviesLoad={isMoviesLoad}
          component={Movies}
          saveMovie={handleSaveMovie} 
          isMoviesFound={isMoviesFound}
          />
          <ProtectedRoute
          path="/saved-movies"
          loggedIn={isLoggedIn}
          onBurgerButton = {handleNavOpen}
          isMoviesLoad={isMoviesLoad}
          component={SavedMovies}
          searchSavedMovies={handleSubmitSavedSearch}
          renderSearch={isRenderSearch}
          movies={savedMovies}
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
