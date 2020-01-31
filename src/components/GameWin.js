import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { store } from './store.js';
import { setAni, formatTime } from '../js/snippets.js';

//game assets
import win1 from '../../public/assets/win1.png';
import win2 from '../../public/assets/win2.png';
import win3 from '../../public/assets/win3.png';
import win4 from '../../public/assets/win4.png';
import win5 from '../../public/assets/win5.png';
import win6 from '../../public/assets/win6.png';

const GameWin = () => {

  const globalState = useContext(store);
  const stats = globalState.state;
  const { dispatch } = globalState;

  const calcTotal = () => {
    let totalScore = 0;

    switch(stats.difficulty) {
      case 'easy':
        totalScore += globalState.state.timeEasy;
        break;
      case 'normal':
        totalScore += globalState.state.timeNorm;
        break;
      case 'hard':
        totalScore += globalState.state.timeHard;
    }

    let timeScore = totalScore - stats.timeLeft;
    totalScore -= timeScore;
    totalScore += (stats.chancesLeft * 10);
    totalScore += (stats.hintsLeft * 10);
    document.querySelector('.stat-box h3').innerHTML = `Total Score: ${totalScore}`;
    updateRank(totalScore);
    winAnimation();
  }

  const updateRank = (score) => {

    let postPath;
    if(stats.player === '') {
      stats.player = '????';
    }
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      postPath = '/postRank';
    } else {
      postPath = 'https://huangrkul-blow-your-mind.herokuapp.com/postRank';
    }

    axios.post(postPath, {
      player: stats.player,
      difficulty: stats.difficulty,
      time: stats.timeLeft,
      chance: stats.chancesLeft,
      hint: stats.hintsLeft,
      total: score
    })
  }

  const winAnimation = () => {
    setAni('.win1', 0, 'zoom-enter');
    setAni('.win2', 150, 'zoom-enter');
    setAni('.win3', 550, 'enter-bottom');
    setAni('.win4', 620, 'enter-bottom');
    setAni('.win5', 800, 'fadezoombump');
    setAni('.win6', 1200, 'fadezoombump-hero');
    setAni('.stat-box', 2000, 'reveal-score');
  }

  useEffect(() => {
    calcTotal();
    window.scrollTo(0, 0);
    return () => {}
  }, []);

  return (
    <article>
      <section className="win-box">
        <img className="win1 hide" src={win1} />
        <img className="win2 hide" src={win2} />
        <img className="win3 hide" src={win3} />
        <img className="win4 hide" src={win4} />
        <img className="win5 hide" src={win5} />
        <img className="win6 hide" src={win6} />
      </section>
      <section className="stat-box hide">
        <div>
          <ul>
            <li>Player:</li>
            <li>{globalState.state.player}</li>
            <li>Difficulty:</li>
            <li>{globalState.state.difficulty}</li>
            <li>Time Left</li>
            <li>{formatTime(globalState.state.timeLeft)}</li>
            <li>Chances Left:</li>
            <li>{globalState.state.chancesLeft}</li>
            <li>Hints Left:</li>
            <li>{globalState.state.hintsLeft}</li>
          </ul>
          <h3 className="title-font"></h3>
          <div className="end-menu" onClick={() => dispatch({type: 'pageSwap', payload: 'start'})}><button>Main Menu</button></div>
        </div>
      </section>
    </article>
  );
}

export default GameWin;
