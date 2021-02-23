import React from 'react';
import Photo from '../../images/about-me-photo.jpg';
import './AboutMe.css';

function AboutMe() {
  return(
    <section className="about-me main__about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__text">
          <div>
            <h3 className="about-me__name">Виталий</h3>
            <p className="about-me__profession">Фронтенд-разработчик, 30 лет</p>
            <p className="about-me__biography">Я родился и живу в Саратове, закончил факультет 
            экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. 
            С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, 
            начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          </div>
           <ul className="about-me__items">
            <li className="about-me__item">
              <a className="about-me__link" href="#">Facebook(добавь)</a>
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