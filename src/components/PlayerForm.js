import React, { useState, useEffect } from 'react';


const PlayerForm = (props) => {

  const [difficulty, setDifficulty] = useState('normal');
  const [player, setPlayer] = useState('');

  const handleDifficulty = (event) => {
    setDifficulty(event.target.value);
  }

  const handlePlayer = (event) => {
    setPlayer(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  useEffect(() => {
    console.log(difficulty);
    console.log(player);
  }, [difficulty])

  return (
    <section className="player-form">
      <form onSubmit={handleSubmit}>
        <ul>
          <li><label htmlFor="name" className="title-font">PLAYER NAME:</label></li>
          <li><input 
              type="text" 
              id="name" 
              autoComplete="off" 
              required="required" 
              autoFocus="autofocus"  
              size="14" 
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
    </section>
  );
}

export default PlayerForm;



