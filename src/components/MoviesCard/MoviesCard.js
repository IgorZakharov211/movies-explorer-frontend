import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard(props){
  const activeSavedButton = (props.isSaved) ? 'movies-card__save_active' : '';
  function handleSaveMovie(e){
    props.saveMovie(e);
  }

  return(
    <div className='movies-card' id={props.id}>
      <a className="movies-card__link" href={props.trailerLink}><img className="movies-card__image" alt={props.name} src={props.image}></img></a>
      <div className="movies-card__info">
        <div className="movies-card__text">
          <h2 className="movies-card__name">{props.name}</h2>
          <p className="movies-card__duration">{props.duration}</p>
        </div>
        <Switch>
          <Route path="/movies">
            <button className={`movies-card__save ${activeSavedButton}`} onClick={handleSaveMovie}></button>
          </Route>
          <Route path="/saved-movies">
            <button className="movies-card__remove" onClick={handleSaveMovie}></button>
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default MoviesCard;