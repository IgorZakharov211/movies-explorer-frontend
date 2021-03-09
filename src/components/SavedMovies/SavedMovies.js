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
      <Header onBurgerButton = {props.onBurgerButton} changeMoviesLoad={props.changeMoviesLoad}/>
      <main className="saved-movies">
        <SearchForm whereOpen={'saved-movies'}/>
        {
          !props.isMoviesLoad && <Preloader/>
        }
        {
          props.isMoviesLoad && <MoviesCardList whereOpen={'saved-movies'} movies={props.movies}/>
        }
      </main>
      <Footer />
    </div>
  )
}

export default SavedMovies;