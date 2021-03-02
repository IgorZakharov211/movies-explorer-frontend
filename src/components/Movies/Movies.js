import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Movies(props){
  return(
    <div>
      <Header onBurgerButton = {props.onBurgerButton}/>
      <main className="movies">
        <SearchForm whereOpen={'movies'}/>
        <MoviesCardList whereOpen={'movies'}/>
      </main>
      <Footer />
    </div>
  )
}

export default Movies;