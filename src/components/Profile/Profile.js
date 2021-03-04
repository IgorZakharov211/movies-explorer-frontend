import React from 'react';
import './Profile.css';
import Header from '../Header/Header';
import {  CurrentUserContext  } from '../../contexts/CurrentUserContext';

function Profile(props){
  const [name, setName] = React.useState('Имя');
  const [email, setEmail] = React.useState('E-mail');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]); 

  function handleNameChange(e){
    setName(e.target.value);
  }

  function handleEmailChange(e){
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser(name, email);
  } 

  return(
    <div>
      <Header onBurgerButton = {props.onBurgerButton}/>
      <main className="profile">
        <form className="profile__form" action="#" method="POST" name="profile" onSubmit={handleSubmit}>
          <h2 className="profile__title">Привет, {currentUser.name}!</h2>
          <fieldset className="profile__fieldset">
            <label className="profile__label">Имя</label>
            <input className="profile__input" value={name} placeholder="Имя" onChange={handleNameChange}></input>
          </fieldset>
          <fieldset className="profile__fieldset">
            <label className="profile__label">Почта</label>
            <input className="profile__input" value={email} placeholder="Почта" onChange={handleEmailChange}></input>
          </fieldset>
          <div className="profile__button-box">
            <button className="profile__button" type="submit">Редактировать</button>
            <button className="profile__button profile__button_color_red" type="button" onClick={props.sighOut}>Выйти из аккаунта</button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default Profile;