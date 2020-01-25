import React, { useContext } from 'react';
import logo from '../../public/assets/logo.png';
import PlayerForm from './PlayerForm';
import { store } from './store.js';

const GameStart = () => {

  const globalState = useContext(store);
  const { dispatch } = globalState;

  const handleGameStart = () => {
    if(globalState.state.isSubmitted){
      dispatch({type: 'pageSwap', payload: 'main'});
    } else {
      alert('Please enter your name and click submit before you proceed');
    }
  }

  const handleHowTo = () => {
    document.querySelector('.howto-container').classList.toggle('howto-enter');
  }

  return (
    <article className="game-start">
      <h1 className="none">Blow Your Mind - Web Game</h1>
      <div className="logo"><img src={logo} /></div>
      <PlayerForm />
      <section className="game-buttons">
        <div onClick={handleGameStart}><button>START GAME</button></div>        
        <div><button>LEADERBOARD</button></div>
        <div onClick={handleHowTo}><button>HOW TO PLAY</button></div>
      </section>
      <aside className="howto-container">
        <span className="title-font" onClick={handleHowTo}>X</span>
        <p>Click the red button and solve the riddle, win this game you’ll be fit as a fiddle. There’s only two hints so
          please play nice, for the kill code to win is like rolling dice.
          <br />
          <br />
          Sounds fun, right? Goodluck!</p>
      </aside>
    </article>
  );
}

export default GameStart;
