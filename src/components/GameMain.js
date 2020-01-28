import React, { useContext, useEffect } from 'react';
import HowTo from './HowTo';
import { store } from './store.js';
import { setAni } from '../js/snippets.js';
import riddles from '../js/riddles.json';

//game assets
import logoSm from '../../public/assets/logo-sm.png';
import gameLayer0 from '../../public/assets/game-layer-0.png';
import gameLayer0Left from '../../public/assets/game-layer-0-left.png';
import gameLayer0Center from '../../public/assets/game-layer-0-center.png';
import gameLayer0Right from '../../public/assets/game-layer-0-right.png';
import gameLayer1 from '../../public/assets/game-layer-1.png';
import key1 from '../../public/assets/key1.png';
import key2 from '../../public/assets/key2.png';
import key3 from '../../public/assets/key3.png';
import key4 from '../../public/assets/key4.png';

const allRiddles = [];

function Riddle(data) {
  this.riddle = data.riddle;
  this.hint = data.hint;
  this.answer = data.answer;
}

const GameMain = () => {

  const globalState = useContext(store);
  const { dispatch } = globalState;
  
  //game variables
  let score = 0;
  let chances = 3;
  let hints = 3;
  let finalCode = '';
  let isRiddleInProgress = false;
  let isAniInProgress = false;
  let isSameRiddle = false;

  //key objects randomized
  const keys = [key1, key2, key3, key4];
  keys.sort(function() { return 0.5 - Math.random() });
  
  //counter variables
  let gameTimer = 0;
  let intervalTimer = 0;
  let currentRiddle = null;
  let currentButton = null;

  /////game initialization//////
  const populateRiddles = (path) => {
    path.forEach(riddle => {
      let entry = new Riddle(riddle);
      allRiddles.push(entry);
    })
    allRiddles.sort(function() { return 0.5 - Math.random() });
  }

  const displayTime = () => {
    const timerDiv = document.querySelector('.counter');
    const minValue = Math.floor((gameTimer/60) % 60);
    const secValue = Math.floor(gameTimer % 60);

    const min = minValue < 10 ? `0${minValue}` : minValue;
    const sec = secValue < 10 ? `0${secValue}` : secValue;

    timerDiv.innerHTML = `${min}:${sec}`;
    if(gameTimer < 10) {
      setAni('.counter',0,'pulse');
      timerDiv.classList.remove('pulse');
    }
  }

  const displayChances = () => {
    const displayDiv = document.querySelector('.riddle-box form span');
    displayDiv.innerHTML = `Chances left: ${chances}`;
  }

  const displayHints = () => {
    const displayDiv = document.querySelector('#hints');
    displayDiv.innerHTML = hints;
  }

  const generateCode = () => {
    for(let i=0; i<4; i++) {
      let randNum = Math.floor(Math.random() * 10);
      finalCode += randNum.toString();
    }
    console.log(finalCode);
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

  const initTimer = () => {
    const diffLevel = globalState.state.difficulty;
    let jsonPath;
    switch (diffLevel) {
      case 'easy':
        gameTimer = 900;
        jsonPath = riddles.easy;
        break;
      case 'normal':
        gameTimer = 600;
        jsonPath = riddles.normal;
        break;
      case 'hard':
        gameTimer = 300;
        jsonPath = riddles.hard;
        break;
    }
    populateRiddles(jsonPath);
    displayTime();
    displayChances();
    displayHints();
    generateCode();
    countDown();
  }

  useEffect(() => {
    initTimer();
    return () => {
      clearInterval(intervalTimer);
    }
  }, [globalState.state.page]);

  /////game initialization end//////

  ////Riddle logic/////

  const handleHint = () => {
    const hintBox = document.querySelector('.hint-box');
    const hintContent = document.querySelector('.hint-box p');
    if(isRiddleInProgress) {
      if(hints > 0) {
        hintContent.innerHTML = currentRiddle.hint;
        hintBox.classList.toggle('aside-enter');
        if (!isSameRiddle) {
          hints--;
          isSameRiddle = true;
          displayHints();
        }
      } else {
        hintContent.innerHTML = 'Sorry, you ran out of hints';
        hintBox.classList.toggle('aside-enter');
      }
    }
  }

  const handleHowTo = () => {
    document.querySelector('.howto-container').classList.toggle('howto-enter');
  }

  const handleCodeSubmit = (event) => {
    event.preventDefault();
    const input = document.querySelector('#inputCode').value;
    if(input === finalCode) {
      dispatch({type: 'updateRank', time: gameTimer, chance: chances, hint: hints});
      dispatch({type: 'pageSwap', payload: 'win'});
    } else {
      dispatch({type: 'pageSwap', payload: 'lose'}); 
    }
  }

  const revealCode = () => {
    document.querySelector('.final-code p').innerHTML = finalCode;
    document.querySelector('.final-code').classList.toggle('aside-enter');
  }

  const correctAnimation = () => {
    let currentKey;
    let currentBase;
    let currentPipe;
    switch(currentButton) {
      case 'riddle1':
        currentBase = '.game-bases li:first-child';
        currentKey = '.game-keys li:first-child';
        currentPipe = '.game-content > div:nth-child(2)';
        break;
      case 'riddle2':
        currentBase = '.game-bases li:nth-child(2)';
        currentKey = '.game-keys li:nth-child(2)';
        currentPipe = '.game-content > div:nth-child(3)';
        break;
      case 'riddle3':
        currentBase = '.game-bases li:last-child';
        currentKey = '.game-keys li:last-child';
        currentPipe = '.game-content > div:nth-child(4)';
        break;
    }
    setAni(currentBase,0,'hide','remove');
    setAni(currentKey,0,'hide','remove');
    setAni(`.${currentButton}`,0,'button-away');
    setAni(`.${currentButton}`,600,'vis-none');
    setAni(currentKey,600,'','clear');
    setAni(currentPipe,1200,'hide','remove');
    
    setTimeout(() => {
      isRiddleInProgress = false;
      isAniInProgress = false;
      if(score === 3) {
        revealCode();
      }
    },1600)
  }

  const handleCorrect = () => {
    isAniInProgress = true;
    isSameRiddle = false;
    score++;
    //clear board and values
    document.querySelector('#riddle').innerHTML = '';
    document.querySelector('#answer').value = '';
    const hintBox = document.querySelector('.hint-box');
    if(hintBox.classList.contains('aside-enter')) {
      hintBox.classList.toggle('aside-enter');
    }
    correctAnimation();
  }

  const handleIncorrect = () => {
    if(chances > 1) {
      chances--;
      setAni('#answer',0,'shake');
      setAni('#answer',750,'shake','remove');
      document.querySelector('#answer').value = '';
      displayChances();
    } else {
      dispatch({type: 'pageSwap', payload: 'lose'})
    }
  }

  const handleAnswer = (event) => {
    event.preventDefault();
    if(isRiddleInProgress && !isAniInProgress){
      const answer = document.querySelector('#answer').value;
      if(answer.toLowerCase() === currentRiddle.answer){
        handleCorrect();
      } else {
        handleIncorrect();
      }
    }
  }

  const startRiddle = (event) => {
    currentButton = event.target.classList[0];
    if(!isRiddleInProgress){
      isRiddleInProgress = true;
      currentRiddle = allRiddles[score];
      document.querySelector('#riddle').innerHTML = currentRiddle.riddle;
    }
  }

  return (
    <article className="main-game">
      <section><img src={logoSm} title="Back to Home" onClick={() => dispatch({type: 'pageSwap', payload: 'start'})}/></section>
      <section className="game-box">
        <div className="game-content">
          <div><img src={gameLayer0} /></div>
          <div className="hide"><img src={gameLayer0Left} /></div>
          <div className="hide"><img src={gameLayer0Center} /></div>
          <div className="hide"><img src={gameLayer0Right} /></div>
          <div><img src={gameLayer1} /></div>
          <ul className="game-bases">
            <li className="hide"></li>
            <li className="hide"></li>
            <li className="hide"></li>
          </ul>
          <ul className="game-keys">
            <li className="initial-pos-key1 hide"><img src={keys[0]} /></li>
            <li className="initial-pos-key2 hide"><img src={keys[1]} /></li>
            <li className="initial-pos-key3 hide"><img src={keys[2]} /></li>
          </ul>
          <ul className="game-buttons">
            <li className="riddle1" onClick={startRiddle}></li>
            <li className="riddle2" onClick={startRiddle}></li>
            <li className="riddle3" onClick={startRiddle}></li>
          </ul>
          <section className="counter-box">
            <div>
              <h4>Countdown Timer</h4>
              <p className="counter"></p>
            </div>
            <hr></hr>
            <form onSubmit={handleCodeSubmit}>
              <h4>Disengage Code</h4>
              <input id="inputCode" maxLength="4" required autoComplete="off" />
              <input type="submit" value="Submit" />
            </form>
          </section>
        </div>
      </section>
      <section className="riddle-box">
        <div>
          <h3 className="title-font">-Riddle-</h3>
          <p id="riddle">Click on the red buttons to start the game!</p>
          <form onSubmit={handleAnswer}>
            <input id="answer" maxLength="20" required autoComplete="off" placeholder="Answer..." />
            <input type="submit" value="Submit" />
            <span></span>
          </form>
        </div>
        <div className="help-buttons">
          <div><button onClick={handleHowTo}>How to Play</button></div>
          <div><button onClick={handleHint}>Hint:<span id="hints"></span></button></div>
        </div>
      </section>
      <HowTo />
      <aside className="hint-box">
        <span className="title-font" onClick={handleHint}>X</span>
        <p></p>
      </aside>
      <aside className="final-code title-font">
        <p></p>
      </aside>
    </article>
  );
}

export default GameMain;
