import React, { useContext, useEffect } from 'react';
import { store } from './store.js';
import gameLayer0 from '../../public/assets/game-layer-0.png';
import gameLayer0Left from '../../public/assets/game-layer-0-left.png';
import gameLayer0Center from '../../public/assets/game-layer-0-center.png';
import gameLayer0Right from '../../public/assets/game-layer-0-right.png';
import gameLayer1 from '../../public/assets/game-layer-1.png';
import key1 from '../../public/assets/key1.png';
import key2 from '../../public/assets/key2.png';
import key3 from '../../public/assets/key3.png';
import key4 from '../../public/assets/key4.png';


const GameMain = () => {

  const globalState = useContext(store);
  const { dispatch } = globalState;
  const difficulty = globalState.state.difficulty;
  let gameTimer = 0;
  let intervalTimer = 0;

  const initTimer = (diffLevel) => {
    switch (diffLevel) {
      case 'easy':
        gameTimer = 1200;
        break;
      case 'normal':
        gameTimer = 900;
        break;
      case 'hard':
        gameTimer = 600;
        break;
    }
    displayTime();
    countDown();
  }

  const displayTime = (time) => {
    const timerDiv = document.querySelector('.counter');
    const minValue = Math.floor((gameTimer/60) % 60);
    const secValue = Math.floor(gameTimer % 60);

    const min = minValue < 10 ? `0${minValue}` : minValue;
    const sec = secValue < 10 ? `0${secValue}` : secValue;

    timerDiv.innerHTML = `${min}:${sec}`;
  }

  const countDown = () => {
    intervalTimer = setInterval(() => {
      if(gameTimer > 0) {
        gameTimer --;
        displayTime();
      } else {
        clearInterval(intervalTimer);
        dispatch({type: 'pageSwap', payload: 'lose'})
      }
    }, 1000)
  }

  useEffect(() => {
    initTimer(difficulty);
  }, [gameTimer]);

  return (
    <article>
      <section className="game-box">
        <div className="game-content">
          <div><img src={gameLayer0} /></div>
          <div><img src={gameLayer0Left} /></div>
          <div><img src={gameLayer0Center} /></div>
          <div><img src={gameLayer0Right} /></div>
          <div><img src={gameLayer1} /></div>
          <ul className="game-bases">
            <li className="hide"></li>
            <li className="hide"></li>
            <li className="hide"></li>
          </ul>
          <ul className="game-keys">
            <li className="initial-pos-key1 hide"><img src={key1} /></li>
            <li className="initial-pos-key2 hide"><img src={key2} /></li>
            <li className="initial-pos-key3 hide"><img src={key3} /></li>
          </ul>
          <ul className="game-buttons">
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <section className="counter-box">
            <div>
              <h4>Countdown Timer</h4>
              <p className="counter"></p>
            </div>
            <hr></hr>
            <form>
              <h4>Disengage Code</h4>
              <input maxLength="4" required></input>
              <input type="submit" value="Submit" />
            </form>
          </section>
        </div>
      </section>
    </article>
  );
}

export default GameMain;
