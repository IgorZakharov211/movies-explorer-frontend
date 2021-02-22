import React from 'react';
import './SearchForm.css';

function SearchForm(props) {
  return(
    <form className={`search-form ${props.whereOpen}__search-form`}>
      <fieldset className="search-form__search">
        <input className="search-form__input" placeholder="Фильм"></input>
        <button className="search-form__button" type="submit">Поиск</button>
      </fieldset>
      <fieldset className="search-form__short">
        <label className="search-form__check">
          <input className="search-form__input" type="checkbox" id="short" name="short"></input>
          <span className="search-form__switch"></span>
        </label>
        <label className="search-form__checkbox-subtitle" name="short" htmlFor="short">Короткометражки</label>
      </fieldset>
    </form>
  )
}

export default SearchForm;