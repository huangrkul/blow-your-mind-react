import React, { useEffect, useContext } from 'react';
import { store } from './store.js';
import { setAni } from '../js/snippets.js';

//image assets
import lose1 from '../../public/assets/lose1.png';
import lose2 from '../../public/assets/lose2.png';
import lose3 from '../../public/assets/lose3.png';
import lose4 from '../../public/assets/lose4.png';
import lose5 from '../../public/assets/lose5.png';
import lose6 from '../../public/assets/lose6.png';
import lose7 from '../../public/assets/lose7.png';
import lose8 from '../../public/assets/lose8.png';
import lose9 from '../../public/assets/lose9.png';
import lose9a from '../../public/assets/lose9a.png';
import lose9b from '../../public/assets/lose9b.png';

const GameLose = () => {

  const globalState = useContext(store);
  const { dispatch } = globalState;

  useEffect(() => {
    setAni('.lose-box img:nth-child(1)', 0, 'zoom-enter');
    setAni('.lose-box img:nth-child(2)', 150, 'zoom-enter');
    setAni('.lose-box img:nth-child(3)', 300, 'zoom-enter');
    setAni('.lose-box img:nth-child(4)', 450, 'zoom-enter');
    setAni('.lose-box img:nth-child(5)', 600, 'zoom-enter');
    setAni('.lose-box img:nth-child(6)', 700, 'zoom-enter');
    setAni('.lose-box img:nth-child(7)', 800, 'zoom-enter');
    setAni('.lose-box img:nth-child(8)', 900, 'zoom-enter');
    setAni('.lose-box img:nth-child(9)', 1500, 'fadezoombump');
    setAni('.lose-box img:nth-child(10)', 1800, 'fadezoombump');
    setAni('.lose-box img:nth-child(11)', 2100, 'fadezoombump');
  })

  return (
    <article className="game-lose">
      <section className="lose-box">
        <img className="hide" src={lose1} />
        <img className="hide" src={lose2} />
        <img className="hide" src={lose3} />
        <img className="hide" src={lose4} />
        <img className="hide" src={lose5} />
        <img className="hide" src={lose6} />
        <img className="hide" src={lose7} />
        <img className="hide" src={lose8} />
        <img className="hide" src={lose9} />
        <img className="hide" src={lose9a} />
        <img className="hide" src={lose9b} />
      </section>
      <div className="end-menu" onClick={() => dispatch({type: 'pageSwap', payload: 'start'})}><button>Main Menu</button></div>
    </article>
  );
}

export default GameLose;
