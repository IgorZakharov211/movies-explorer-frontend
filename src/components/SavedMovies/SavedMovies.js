import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';


function SavedMovies(){
  return(
    <main className="saved-movies">
      <SearchForm whereOpen={'saved-movies'}/>
      <MoviesCardList whereOpen={'saved-movies'}/>
    </main>
  )
}

export default SavedMovies;