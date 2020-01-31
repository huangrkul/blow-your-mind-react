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
    <main id="top">
      <header className="dis-none">
        <h1>Blow Your Mind - Web Game</h1>
      </header>
      <PageToRender />
      <footer>
        <div>	&copy; <a href="http://willhuanganimator.com" target="_blank">willhuanganimator.com 2020</a></div>
        <div>Check out original <a href="http://willhuanganimator.com/projects/blow-your-mind/" target="_blank">version & team</a></div>
      </footer>
    </main>
  );
}

export default App;