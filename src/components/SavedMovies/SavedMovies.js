import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


function SavedMovies(props){
  return(
    <div>
      <Header onBurgerButton = {props.onBurgerButton}/>
      <main className="saved-movies">
        <SearchForm whereOpen={'saved-movies'}/>
        <MoviesCardList whereOpen={'saved-movies'}/>
      </main>
      <Footer />
    </div>
  )
}

export default SavedMovies;