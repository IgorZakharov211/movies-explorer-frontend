import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { IMAGE_URL } from '../../utils/config';
import notFound from '../../images/no-image.jpg';

function MoviesCardList(props){
  const [moviesCount, setMoviesCount] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const moviesContainer = document.querySelector('.movies-card-list__container');
  let clickCount = 0;
  let moviesShow = 0;

  function setCounts(){
    
    if(moviesContainer !== null){
      setMoviesCount(moviesContainer.childElementCount);
      if(windowWidth > 1280){
        moviesContainer.style.maxHeight = `1000px`;
      } else if(windowWidth <= 1280 && windowWidth > 1100){
        moviesContainer.style.maxHeight = `1156px`;
      } else if(windowWidth <= 1100 && windowWidth > 906){
        moviesContainer.style.maxHeight = `1000px`;
      } else if(windowWidth <= 906 && windowWidth > 760){
        moviesContainer.style.maxHeight = `1172px`;
      } else if(windowWidth <= 760 && windowWidth > 610){
        moviesContainer.style.maxHeight = `1016px`;
      } else if(windowWidth <= 610 && windowWidth > 320){
        moviesContainer.style.maxHeight = `1465px`;
      } else if(windowWidth <= 320){
        moviesContainer.style.maxHeight = `1275px`;
      }
    }
    setWindowWidth(window.screen.width);
    console.log(moviesCount);
    console.log(windowWidth);
  }
  setTimeout(setCounts, 100);

  function setWindowSize(){
    setWindowWidth(window.screen.width);
  }

  window.addEventListener('resize', setWindowSize)
  setTimeout(setWindowSize, 10000);

  let disabledButton = (
    (moviesCount <= 16 && windowWidth > 1280) || 
    (moviesCount <= 12 && (windowWidth <= 1280 && windowWidth > 906)) ||
    (moviesCount <= 8 && (windowWidth <= 906 && windowWidth > 610)) ||
    (moviesCount <= 5 && windowWidth <= 610)
    ) ? 'movies-card-list__more_disabled' : '';

  function handleMoreButton(){
    document.querySelector('.movies-card-list__more').classList.remove('movies-card-list__more_disabled');
    let step = 0;
    clickCount = clickCount + 1;
    if(windowWidth > 1280){
      step = 250 * clickCount;
      if(moviesShow < moviesCount){
        moviesContainer.style.maxHeight = `${1000+step}px`;
        moviesShow = 16 + clickCount*4;
      } else{
        document.querySelector('.movies-card-list__more').classList.add('movies-card-list__more_disabled');
        clickCount = 0;
      }
    } else if(windowWidth <= 1280 && windowWidth > 1100){
      step = 289 * clickCount;
      if(moviesShow < moviesCount){
        moviesContainer.style.maxHeight = `${1156+step}px`;
        moviesShow = 12 + clickCount*3;
      } else{
        document.querySelector('.movies-card-list__more').classList.add('movies-card-list__more_disabled');
        clickCount = 0;
      }
    } else if(windowWidth <= 1100 && windowWidth > 906){
      step = 250 * clickCount;
      if(moviesShow < moviesCount){
        moviesContainer.style.maxHeight = `${1000+step}px`;
        moviesShow = 12 + clickCount*3;
      } else{
        document.querySelector('.movies-card-list__more').classList.add('movies-card-list__more_disabled');
        clickCount = 0;
      }
    } else if(windowWidth <= 906 && windowWidth > 760){
      step = 293 * clickCount;
      if(moviesShow < moviesCount){
        moviesContainer.style.maxHeight = `${1172+step}px`;
        moviesShow = 8 + clickCount*2;
      } else{
        document.querySelector('.movies-card-list__more').classList.add('movies-card-list__more_disabled');
        clickCount = 0;
      }
    } else if(windowWidth <= 760 && windowWidth > 610){
      step = 254 * clickCount;
      if(moviesShow < moviesCount){
        moviesContainer.style.maxHeight = `${1016+step}px`;
        moviesShow = 8 + clickCount*2;
      } else{
        document.querySelector('.movies-card-list__more').classList.add('movies-card-list__more_disabled');
        clickCount = 0;
      }
    } else if(windowWidth <= 610 && windowWidth > 320){
      step = 293 * clickCount;
      if(moviesShow < moviesCount){
        moviesContainer.style.maxHeight = `${1465+step}px`;
        moviesShow = 5 + clickCount;
      } else{
        document.querySelector('.movies-card-list__more').classList.add('movies-card-list__more_disabled');
        clickCount = 0;
      }
    } else if(windowWidth <= 320){
      step = 255 * clickCount;
      if(moviesShow < moviesCount){
        moviesContainer.style.maxHeight = `${1275+step}px`;
        moviesShow = 5 + clickCount;
      } else{
        document.querySelector('.movies-card-list__more').classList.add('movies-card-list__more_disabled');
        clickCount = 0;
      }
    }
  }

  return(
    <section className={`movies-card-list ${props.whereOpen}__movies-card-list`}>
      <div className="movies-card-list__container">
        { 
        props.movies &&
          props.movies.map(({key, id, country, created_at, description, director, duration, image, nameRU, nameEN, trailerLink, year, isSaved, isShort})=> {
            let loadImage = `${notFound}`;
            if(typeof(image) === 'string'){
              loadImage = image;
            } else if (typeof(image) === 'object'){
              if(image !== null) {
                loadImage = `${IMAGE_URL}${image.url}`
              }
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
            return <MoviesCard 
            key={id} 
            id={id} 
            image={loadImage} 
            name={nameRU} 
            duration={time} 
            trailerLink={trailerLink} 
            isSaved={isSaved} 
            saveMovie={props.saveMovie}
            isShort={isShort}
            isShortMoviesEnable={props.isShortMoviesEnable}
            />
          })
        }
      </div>
      <button className={`movies-card-list__more ${disabledButton}`} type="button" onClick={handleMoreButton}>Ещё</button>
    </section>
  )
}

export default MoviesCardList;