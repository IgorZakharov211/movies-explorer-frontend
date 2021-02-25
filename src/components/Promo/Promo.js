import React from 'react';
import './Promo.css';

function Promo() {
  return (
    <section className="promo main__promo">
      <div className="promo__container">
        <div className="promo__text">
          <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
          <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          <a className="promo__button" type="button" href="https://praktikum.yandex.ru/profile/web/">Узнать больше</a>
        </div>
        <div className="promo__image"></div>
      </div>
    </section>
  );
}

export default Promo;