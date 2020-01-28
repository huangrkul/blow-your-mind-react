import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { store } from './store.js';

const GameWin = () => {

  const globalState = useContext(store);
  // const { dispatch } = globalState;

  const updateRank = () => {

    let dataPath;
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      dataPath = '/rank';
    } else {
    }
    
    axios.post(dataPath, {
      firstName: 'Fred',
      lastName: 'Flintstone'
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  useEffect(() => {
    updateRank();
    return () => {}
  }, []);


  return (
    <article>
      <div>this is GameWin</div>
    </article>
  );
}

export default GameWin;
