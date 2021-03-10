import React, { useState, useCallback, useEffect } from 'react';
import './SearchForm.css';
import { validators } from '../FormValidator/FormValidator';

function SearchForm(props) {
  const [formValues, setFormValues] = useState({
    movie: '',
  });

  const [errors, setErrors] = useState({
    movie: {
      required: false,
    }
  });

  const { movie } = formValues;
  const isMovieInvalid = Object.values(errors.movie).some(Boolean);
  const isSubmitDisabled = isMovieInvalid
  const disabledButton = (isSubmitDisabled) ? 'search-form__button_disabled': '';
  const renderButton = (props.renderSearch) ? '...' : '';
  const [isShortEnable, setShortEnable] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(props.whereOpen === 'movies'){
      props.searchMovies(movie);
    } else if (props.whereOpen === 'saved-movies'){
      props.searchSavedMovies(movie);
    }
  } 

  const handleShortClick = (e) => {
    if(isShortEnable === false){
      setShortEnable(true);
      localStorage.setItem('short', true);
      props.shortMovies(false);
    } else{
      setShortEnable(false);
      localStorage.setItem('short', false);
      props.shortMovies(true);
    }
  }

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormValues(prevState => ({ ...prevState, [name]: value }));
  }, [setFormValues]);

  useEffect(function validateInputs(){
    const { movie } = formValues;

    const movieValidationResult = Object.keys(validators.movie).map(
      errorKey => {
        const errorResult = validators.movie[errorKey](movie);

        return { [errorKey]: errorResult }
      }
    ).reduce((acc, el) => ({...acc, ...el}), {});
    setErrors({
      movie: movieValidationResult,
    });
  }, [formValues, setErrors]);

  


  return(
    <form className={`search-form ${props.whereOpen}__search-form`} onSubmit={handleSubmit}>
      <fieldset className="search-form__search">
        <input className="search-form__input" placeholder="Фильм" name="movie" onChange={handleInputChange} value={movie}></input>
        <button className={`search-form__button ${disabledButton}`} type="submit" disabled={isSubmitDisabled}>
        {`Поиск${renderButton}`}
        </button>
      </fieldset>
      <fieldset className="search-form__short">
        <label className="search-form__check">
          <input className="search-form__input" type="checkbox" id="short" name="short" onClick={handleShortClick}></input>
          <span className="search-form__switch"></span>
        </label>
        <label className="search-form__checkbox-subtitle" name="short" htmlFor="short">Короткометражки</label>
      </fieldset>
    </form>
  )
}

export default SearchForm;