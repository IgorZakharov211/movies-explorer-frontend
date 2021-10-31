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
            <h3 className="about-me__name">Игорь</h3>
            <p className="about-me__profession">Фронтенд-разработчик, 23 года</p>
            <p className="about-me__biography">Я живу в городе Дрезна, недалеко от Москвы.
            Увлекся Web-ом пока учился в колледже. После простеньких, лэндингов и небольших игр на JS, понял, что хочу больше. 
            Стал погружаться в мир разработки, сначала сам (learn.JavaScript, уроки на YouTube), а потом и с помощью курсов. 
            Познакомился с основами Backend-разработки, но предпочтение оставил за фронтом.
            Во Frontend нравится визуальная часть, возможность круто реализовать дизайна и наглядность проделанной работы.</p>
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