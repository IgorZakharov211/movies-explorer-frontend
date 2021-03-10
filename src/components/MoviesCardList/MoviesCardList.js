import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { IMAGE_URL } from '../../utils/config';
import notFound from '../../images/no-image.jpg';

function MoviesCardList(props){
  return(
    <section className={`movies-card-list ${props.whereOpen}__movies-card-list`}>
      <div className="movies-card-list__container">
        { props.movies &&
          props.movies.map(({key, id, country, created_at, description, director, duration, image, nameRU, nameEN, trailerLink, year, isSaved})=> {
            let loadImage = `${notFound}`;
            if(image !== null) {
              loadImage = `${IMAGE_URL}${image.url}`
            }
            let time = duration;
            let hours = Math.floor(time / 60);
            let minutes = Math.floor(time % 60);
            if(hours && minutes){
              time = `${hours}ч${minutes}м`;
            } else if(hours){
              time = `${hours}ч`;
            } else{
              time = `${minutes}м`;
            }
            return <MoviesCard key={id} id={id} image={loadImage} name={nameRU} duration={time} trailerLink={trailerLink} isSaved={isSaved} saveMovie={props.saveMovie}/>
          })
        }
      </div>
      <button className="movies-card-list__more" type="button">Ещё</button>
    </section>
  )
}

export default MoviesCardList;