import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import logo from '../../public/assets/logo.png';
import PlayerForm from './PlayerForm';
import HowTo from './HowTo';
import { store } from './store.js';
import { formatTime } from '../js/snippets.js';

function Rank(data) {
  this.player = data.player_name;
  this.difficulty = data.difficulty;
  this.time = formatTime(data.time_left);
  this.chance = data.chances_left;
  this.hint = data.hints_left;
  this.total = data.total;
}

const GameStart = () => {
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const ladder = globalState.state.ranks;

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

  const handleRanking = () => {
    if(globalState.state.rank === null) {

    } else {
      document.querySelector('.leaderboard').classList.toggle('lead-enter');
    }
  }

  const sortRank = (allRanks) => {
    allRanks.sort((a, b) => {
      const aTotal = a.total;
      const bTotal = b.total;
      return bTotal - aTotal;
    })
    dispatch({type: 'showRanks', payload: allRanks});
  }

  useEffect(() => {
    let rankPath;
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      rankPath = '/showRanks';
    } else {
      rankPath = 'https://huangrkul-blow-your-mind.herokuapp.com/showRanks';
    }
    axios.get(rankPath)
      .then(res => {
        const rankData = res.data.rows;
        const allRanks = [];
        rankData.forEach(row => {
          const newRow = new Rank(row);
          allRanks.push(newRow);
        })
        sortRank(allRanks);
      })
  },[])

  return (
    <article className="game-start">
      <div className="logo"><img src={logo} /></div>
      <PlayerForm />
      <section className="menu-buttons">
        <div onClick={handleGameStart}><button>START GAME</button></div>        
        <div onClick={handleRanking}><button>LEADERBOARD</button></div>
        <div onClick={handleHowTo}><button>HOW TO PLAY</button></div>
      </section>
      <HowTo />
      <aside className="leaderboard">
        <div>
          <ul className="title-font">
            <li>Player Name</li>
            <li>Difficulty</li>
            <li>Time Left</li>
            <li>Chances Left</li>
            <li>Hints Left</li>
            <li>Total Score</li>
          </ul>
          {ladder.map((rank,idx) => {
            return (
              <ul key={idx}>
                <li>{rank.player}</li>
                <li>{rank.difficulty}</li>
                <li>{rank.time}</li>
                <li>{rank.chance}</li>
                <li>{rank.hint}</li>
                <li>{rank.total}</li>
              </ul>
            )
          })}
        </div>
      </aside>
    </article>
  );
}

export default GameStart;
