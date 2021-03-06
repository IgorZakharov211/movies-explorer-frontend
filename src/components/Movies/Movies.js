import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

function Movies(props){
  return(
    <div>
      <Header onBurgerButton = {props.onBurgerButton}/>
      <main className="movies">
        <SearchForm whereOpen={'movies'} searchMovies={props.searchMovies} shortMovies={props.shortMovies}/>
        {
          props.isPreloaderEnable && <Preloader/>
        }
        {
          !props.isMoviesFound && props.isMoviesLoad && <p className="movies__subtitle">Ничего не найдено</p>
        }
        {
          props.isMoviesLoad && <MoviesCardList whereOpen={'movies'} movies={props.movies} saveMovie={props.saveMovie} isMoviesFound={props.isMoviesFound} isShortMoviesEnable={props.isShortMoviesEnable}/>
        }
        
      </main>
      <Footer />
    </div>
  )
}

export default Movies;