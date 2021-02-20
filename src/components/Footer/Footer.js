import React from 'react';
import './Footer.css';

function Footer() {
  return(
    <footer className="footer">
      <div className="footer__container">
        <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
        <div className="footer__row">
          <div className="footer__copyright">© 2020 (доделать!)</div>
          <ul className="footer__items">
            <li className="footer__item">
              <a href="#" className="footer__link">Яндекс.Практикум(?)</a>
            </li>
            <li className="footer__item">
              <a href="#" className="footer__link">Github(?)</a>
            </li>
            <li className="footer__item">
              <a href="#" className="footer__link">Facebook(?)</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer;