import React from 'react';
import './Portfolio.css';

function Portfolio() {
  return(
    <section className="portfolio main__portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__items">
        <li className="portfolio__item">
          <a className="portfolio__link" href="#">
          Статичный сайт(добавь!)
            <div className="portfolio__arrow"></div>
          </a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" href="#">
          Адаптивный сайт(добавь!)
            <div className="portfolio__arrow"></div>
          </a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" href="#">
          Одностраничное приложение(добавь!)
            <div className="portfolio__arrow"></div>
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;