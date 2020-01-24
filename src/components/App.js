import React, { useState } from 'react';
import GameStart from './GameStart';
import GameMain from './GameMain';
import GameWin from './GameWin';
import GameLose from './GameLose';

const components = {
  start: GameStart,
  main: GameMain,
  win: GameWin,
  lose: GameLose
}

const App = () => {

  const [page, setPage] = useState('start');
  const PageToRender = components[page];
  const onNextPage = (selected) => {
    setPage(selected);
  }

  return (
    <main>
      <PageToRender nextPage={onNextPage} />
    </main>
  );
}

export default App;