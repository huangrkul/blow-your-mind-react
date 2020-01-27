import React, { useContext } from 'react';
import { store } from './store.js';

const PlayerForm = () => {

  const globalState = useContext(store);
  const { dispatch } = globalState;
  const difficulty = globalState.state.difficulty;
  const player = globalState.state.player;

  const handleDifficulty = (event) => {
    dispatch({type: event.target.value});
  }

  const handlePlayer = (event) => {
    dispatch({type: 'name', payload: event.target.value});
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    document.querySelector('.player-form form').classList.toggle('none');
    document.querySelector('.player-form > div').classList.toggle('none');
    dispatch({type: 'submit', payload: true});
  }

  return (
    <section className="player-form">
      <form onSubmit={handleSubmit}>
        <ul>
          <li><label htmlFor="name" className="title-font">PLAYER NAME:</label></li>
          <li><input type="text" id="name" autoComplete="off" required maxLength="20" autoFocus="autofocus"
              value={player}
              onChange={handlePlayer}/>
          </li>
          <li><label htmlFor="difficulty" className="title-font">DIFFICULTY:</label></li>
          <li><select id="difficulty" value={difficulty} onChange={handleDifficulty}>
              <option value="easy">Easy (20 mins)</option>
              <option value="normal">Normal (15 mins)</option>
              <option value="hard">Hard (10 mins)</option>
            </select>
          </li>
          <li><input type="submit" value="Submit" /></li>
        </ul>
      </form>
      <div className="none">
        <h2 className="title-font">Welcome {player}!</h2>
        <p>You Chose {difficulty.toUpperCase()} Difficulty, Good luck!</p>
      </div>
    </section>
  );
}

export default PlayerForm;



