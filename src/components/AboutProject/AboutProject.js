import { func } from 'prop-types';
import React from 'react';
import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project main__about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__text">
        <div className="about-project__column">
          <h3 className="about-project__title about-project__title_size_small">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__subtitle">Составление плана, работу над бэкендом, 
          вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about-project__column">
          <h3 className="about-project__title about-project__title_size_small">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__subtitle">У каждого этапа был мягкий и жёсткий дедлайн, 
          которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about-project__bar">
        <div className="about-project__column-bar">
          <div className="about-project__weak about-project__weak_color_green">1 неделя</div>
          <p className="about-project__weak-descript">Back-end</p>
        </div>
        <div className="about-project__column-bar">
          <div className="about-project__weak">4 недели</div>
          <p className="about-project__weak-descript">Front-end</p>
        </div>
      </div>
    </section>
  );
};

export default AboutProject;