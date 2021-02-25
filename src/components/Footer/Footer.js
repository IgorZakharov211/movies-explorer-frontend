import React from 'react';
import './Footer.css';

function Footer() {
  return(
    <footer className="footer">
      <div className="footer__container">
        <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
        <div className="footer__box">
          <div className="footer__copyright">&copy; Захаров И.А., 2021 </div>
          <nav>
            <ul className="footer__items">
              <li className="footer__item">
                <a href="https://praktikum.yandex.ru/" className="footer__link">Яндекс.Практикум</a>
              </li>
              <li className="footer__item">
                <a href="https://github.com/IgorZakharov211" className="footer__link">Github</a>
              </li>
              <li className="footer__item">
                <a href="https://www.facebook.com/profile.php?id=100007457354645" className="footer__link">Facebook</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer;