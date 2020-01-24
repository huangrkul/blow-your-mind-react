import React from 'react';

const GameStart = (props) => {
  return (
    <article>
      <div>this is GameStart</div>
      <button onClick={() => props.nextPage('lose')}>gameLose</button>
    </article>
  );
}

export default GameStart;
