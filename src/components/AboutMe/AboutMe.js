import React from 'react';
import Photo from '../../images/about-me-photo.png';
import './AboutMe.css';

function AboutMe() {
  return(
    <section className="about-me main__about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__text">
          <div>
            <h3 className="about-me__name">Игорь</h3>
            <p className="about-me__profession">Фронтенд-разработчик, 22 года</p>
            <p className="about-me__biography">Я живу в городе Дрезна, недалеко от Москвы.
             Изучать программирование начал во время учебы в колледже. 
             Где учился по специальности «Программирование в компьютерных системах и комплексах». 
             На 3 курсе познакомился с html/css, а позднее и JavaScript. После окончания учебы и службы в армии продолжил изучение самостоятельно, 
             а в Мае 2020 года решил изучать Веб-разработку с поддержкой ЯндексПрактикума.</p>
          </div>
           <ul className="about-me__items">
            <li className="about-me__item">
              <a className="about-me__link" href="https://www.facebook.com/profile.php?id=100007457354645">Facebook</a>
            </li>
            <li className="about-me__item">
              <a className="about-me__link" href="https://github.com/IgorZakharov211">Github</a>
            </li>
           </ul>
        </div>
        <img className="about-me__photo" alt="Фотография" src={Photo}/>
      </div>
    </section>
  )
}

export default AboutMe;