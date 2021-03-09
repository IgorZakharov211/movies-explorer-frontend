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
      <Header onBurgerButton = {props.onBurgerButton} changeMoviesLoad={props.changeMoviesLoad}/>
      <main className="movies">
        <SearchForm whereOpen={'movies'} searchMovies={props.searchMovies}/>
        {
          !props.isMoviesLoad && <Preloader/>
        }
        {
          props.isMoviesLoad && <MoviesCardList whereOpen={'movies'} movies={props.movies}/>
        }
      </main>
      <Footer />
    </div>
  )
}

export default Movies;