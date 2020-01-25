import React, { useContext } from 'react';
import logo from '../../public/assets/logo.png';
import PlayerForm from './PlayerForm';

const GameStart = (props) => {

  return (
    <article className="game-start">
      <h1 className="none">Blow Your Mind - Web Game</h1>
      <div className="logo"><img src={logo} /></div>
      <PlayerForm />
    </article>
  );
}

export default GameStart;
