import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

function SavedMovies(props){
  return(
    <div>
      <Header onBurgerButton = {props.onBurgerButton}/>
      <main className="saved-movies">
        <SearchForm whereOpen={'saved-movies'} searchSavedMovies={props.searchSavedMovies}/>
        {
          !props.isSavedMoviesLoad && <Preloader/>
        }
        {
          !props.isSavedMoviesFound && props.isSavedMoviesLoad && <p className="movies__subtitle">Ничего не найдено</p>
        }
        {
          props.isSavedMoviesLoad && <MoviesCardList whereOpen={'saved-movies'} movies={props.movies} saveMovie={props.saveMovie}/>
        }
      </main>
      <Footer />
    </div>
  )
}

export default SavedMovies;