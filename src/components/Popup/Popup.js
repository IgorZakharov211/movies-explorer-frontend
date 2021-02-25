import React from 'react';
import './Popup.css';
import { NavLink, Link } from 'react-router-dom';

function Popup(props){
  const popupOpened = props.isOpen ? 'popup_opened' : '';

  return(
    <div className={`popup ${popupOpened}`}>
      <div className="popup__container">
        <button className="popup__close" onClick={props.onClose}></button>
        <nav className="popup__nav">
          <div className="popup__links">
            <Link className="popup__link" to="/">Главная</Link>
            <NavLink to="/movies" className="popup__link" activeClassName="popup__link_active">Фильмы</NavLink>
            <NavLink to="/saved-movies" className="popup__link" activeClassName="popup__link_active">Сохраненные фильмы</NavLink>
          </div>
          <Link to="/profile"><button className="popup__profile"><p className="popup__profile-text">Аккаунт</p></button></Link>
        </nav>
      </div>
    </div>
  )
}

export default Popup;