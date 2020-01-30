import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { store } from './store.js';

const GameWin = () => {

  const globalState = useContext(store);
  const stats = globalState.state;
  const { dispatch } = globalState;

  const calcTotal = () => {
    let maxTime = 0;
    let totalScore = 0;

    switch(stats.difficulty) {
      case 'easy':
        maxTime = globalState.state.timeEasy;
        totalScore += 0;
        break;
      case 'normal':
        maxTime = globalState.state.timeNorm;
        totalScore += 100;
        break;
      case 'hard':
        maxTime = globalState.state.timeHard;
        totalScore += 200;
    }

    let timeScore = maxTime - stats.timeLeft;
    totalScore += timeScore;
    totalScore += (stats.chancesLeft * 100);
    totalScore += (stats.hintsLeft * 10);
    updateRank(totalScore);
  }

  const updateRank = (score) => {

    let postPath;
    if(stats.player === '') {
      stats.player = 'Anonymous';
    }
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      postPath = '/postRank';
    } else {
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

  useEffect(() => {
    calcTotal();
    return () => {}
  }, []);

  const handleReturn = () => {
    dispatch({type: 'pageSwap', payload: 'start'});
  }

  return (
    <article>
      <div><button onClick={handleReturn}>PLAY AGAIN</button></div>
    </article>
  );
}

export default GameWin;
