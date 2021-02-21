import React from 'react';
import './MoviesCard.css';

function MoviesCard(props){
  return(
    <div className="movies-card">
      <img className="movies-card__image" alt="1 фотография" src={props.image}></img>
      <div className="movies-card__info">
        <div className="movies-card__text">
          <h2 className="movies-card__name">{props.name}</h2>
          <p className="movies-card__duration">{props.duration}</p>
        </div>
        <label className="movies-card__check">
          <input className="movies-card__input" type="checkbox" name="save" value="check"></input>
          <span className="movies-card__switch"></span>
        </label>
      </div>
    </div>
  )
}

export default MoviesCard;