import React, { useState, useCallback, useEffect } from 'react';
import './Profile.css';
import Header from '../Header/Header';
import {  CurrentUserContext  } from '../../contexts/CurrentUserContext';
import { validators } from '../FormValidator/FormValidator';

function Profile(props){
  const currentUser = React.useContext(CurrentUserContext);

  const [formValues, setFormValues] = useState({
    name: currentUser.name,
    email: currentUser.email
  });

  const [errors, setErrors] = useState({
    name: {
      required: false,
      minLength: false,
      maxLength: false,
      containValidValue: false
    },
    email: {
      required: false,
      isEmail: false
    }
  });

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormValues(prevState => ({ ...prevState, [name]: value }));
  }, [setFormValues]);

  useEffect(function validateInputs(){
    const { name, email } = formValues;

    const nameValidationResult = Object.keys(validators.name).map(
      errorKey => {
        const errorResult = validators.name[errorKey](name);

        return { [errorKey]: errorResult }
      }
    ).reduce((acc, el) => ({...acc, ...el}), {});
    const emailValidationResult = Object.keys(validators.email).map(
      errorKey => {
        const errorResult = validators.email[errorKey](email);

        return { [errorKey]: errorResult }
      }
    ).reduce((acc, el) => ({...acc, ...el}), {});

    setErrors({
      name: nameValidationResult,
      email: emailValidationResult
    });
  }, [formValues, setErrors]);

  const { name, email } = formValues;
  const isNameInvalid = Object.values(errors.name).some(Boolean);
  const isEmailInvalid = Object.values(errors.email).some(Boolean);
  const isSubmitDisabled = isNameInvalid || isEmailInvalid;
  const renderButton = (props.renderSubmit) ? '...' : '';

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser(name, email);
  } 

  return(
    <div>
      <Header onBurgerButton = {props.onBurgerButton} changeMoviesLoad={props.changeMoviesLoad}/>
      <main className="profile">
        <form className="profile__form" action="#" method="POST" name="profile" onSubmit={handleSubmit}>
          <h2 className="profile__title">Привет, {currentUser.name}!</h2>
          <fieldset className="profile__fieldset">
            <label className="profile__label" htmlFor="name">Имя</label>
            <input className="profile__input" value={name} placeholder="Имя" onChange={handleInputChange} name="name"></input>
          </fieldset>
          <fieldset className="profile__fieldset">
            <label className="profile__label" htmlFor="email">Почта</label>
            <input className="profile__input" value={email} placeholder="Почта" onChange={handleInputChange} name="email"></input>
          </fieldset>
          <div className="profile__button-box">
            <button className="profile__button" type="submit" disabled={isSubmitDisabled}>{`Редактировать${renderButton}`}</button>
            <button className="profile__button profile__button_color_red" type="button" onClick={props.sighOut}>Выйти из аккаунта</button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default Profile;