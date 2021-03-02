import React from 'react';
import './Profile.css';
import Header from '../Header/Header';

function Profile(props){
  return(
    <div>
      <Header onBurgerButton = {props.onBurgerButton}/>
      <main className="profile">
        <form className="profile__form">
          <h2 className="profile__title">Привет, Игорь!</h2>
          <fieldset className="profile__fieldset">
            <label className="profile__label">Имя</label>
            <input className="profile__input" defaultValue="Игорь" placeholder="Имя"></input>
          </fieldset>
          <fieldset className="profile__fieldset">
            <label className="profile__label">Почта</label>
            <input className="profile__input" defaultValue="Igor1994294@yandex.ru" placeholder="Почта"></input>
          </fieldset>
          <div className="profile__button-box">
            <button className="profile__button" type="submit">Редактировать</button>
            <button className="profile__button profile__button_color_red" type="button">Выйти из аккаунта</button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default Profile;