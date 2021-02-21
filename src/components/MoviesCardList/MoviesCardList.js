import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import card1 from '../../images/movies-cards/card1.jpg';
import card2 from '../../images/movies-cards/card2.jpg';
import card3 from '../../images/movies-cards/card3.jpg';
import card4 from '../../images/movies-cards/card4.jpg';
import card5 from '../../images/movies-cards/card5.jpg';
import card6 from '../../images/movies-cards/card6.jpg';
import card7 from '../../images/movies-cards/card7.jpg';
import card8 from '../../images/movies-cards/card8.jpg';
import card9 from '../../images/movies-cards/card9.jpg';
import card10 from '../../images/movies-cards/card10.jpg';
import card11 from '../../images/movies-cards/card11.jpg';
import card12 from '../../images/movies-cards/card12.jpg';
import card13 from '../../images/movies-cards/card13.jpg';
import card14 from '../../images/movies-cards/card14.jpg';
import card15 from '../../images/movies-cards/card15.jpg';
import card16 from '../../images/movies-cards/card16.jpg';

function MoviesCardList(){
  return(
    <section className="movies-card-list movies__movies-card-list">
      <div className="movies-card-list__container">
        <MoviesCard image={card1} name="33 слова о дизайне" duration="1ч42м"/>
        <MoviesCard image={card2} name="33 слова о дизайне" duration="1ч42м"/>
        <MoviesCard image={card3} name="33 слова о дизайне" duration="1ч42м"/>
        <MoviesCard image={card4} name="33 слова о дизайне" duration="1ч42м"/>
        <MoviesCard image={card5} name="33 слова о дизайне" duration="1ч42м"/>
        <MoviesCard image={card6} name="33 слова о дизайне" duration="1ч42м"/>
        <MoviesCard image={card7} name="33 слова о дизайне" duration="1ч42м"/>
        <MoviesCard image={card8} name="33 слова о дизайне" duration="1ч42м"/>
        <MoviesCard image={card9} name="33 слова о дизайне" duration="1ч42м"/>
        <MoviesCard image={card10} name="33 слова о дизайне" duration="1ч42м"/>
        <MoviesCard image={card11} name="33 слова о дизайне" duration="1ч42м"/>
        <MoviesCard image={card12} name="33 слова о дизайне" duration="1ч42м"/>
        <MoviesCard image={card13} name="33 слова о дизайне" duration="1ч42м"/>
        <MoviesCard image={card14} name="33 слова о дизайне" duration="1ч42м"/>
        <MoviesCard image={card15} name="33 слова о дизайне" duration="1ч42м"/>
        <MoviesCard image={card16} name="33 слова о дизайне" duration="1ч42м"/>
      </div>
      <button className="movies-card-list__more" type="button">Ещё</button>
    </section>
  )
}

export default MoviesCardList;