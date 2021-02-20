import React from 'react';
import './Promo.css';

function Promo() {
  return (
    <section className="promo main__promo">
      <div className="promo__container">
        <div className="promo__text">
          <h1 className="promo__title">Учебный проект студента факультета 
          <br/> Веб-разработки.</h1>
          <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          <button className="promo__button">Узнать больше</button>
        </div>
        <div className="promo__image"></div>
      </div>
    </section>
  );
}

export default Promo;