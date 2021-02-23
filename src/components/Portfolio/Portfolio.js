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
            <p className="portfolio__arrow">↗</p>
          </a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" href="#">
          Адаптивный сайт(добавь!)
            <p className="portfolio__arrow">↗</p>
          </a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" href="#">
          Одностраничное приложение(добавь!)
            <p className="portfolio__arrow">↗</p>
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;