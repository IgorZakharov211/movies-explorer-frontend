import React from 'react';
import './Portfolio.css';

function Portfolio() {
  return(
    <section className="portfolio main__portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__items">
        <li className="portfolio__item">
          <a className="portfolio__link" href="https://igorzakharov211.github.io/how-to-learn/">
          Статичный сайт
            <p className="portfolio__arrow">↗</p>
          </a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" href="https://igorzakharov211.github.io/russian-travel/">
          Адаптивный сайт
            <p className="portfolio__arrow">↗</p>
          </a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" href="https://igorzakharov211.github.io/creation-landing/">
          Адаптивный, одностраничный сайт "Создание"
            <p className="portfolio__arrow">↗</p>
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;
