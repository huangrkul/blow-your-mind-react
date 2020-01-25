import React, { useContext } from 'react';
import GameStart from './GameStart';
import GameMain from './GameMain';
import GameWin from './GameWin';
import GameLose from './GameLose';
import { store } from './store.js';

const components = {
  start: GameStart,
  main: GameMain,
  win: GameWin,
  lose: GameLose
}

const App = () => {
  const globalState = useContext(store);
  const PageToRender = components[globalState.state.page];
  return (
    <main>
      <PageToRender />
    </main>
  );
}

export default App;