import React, {createContext, useReducer} from 'react';

const initialState = {
  page: 'start',
  player: '',
  difficulty: 'normal'
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'toGameStart': case 'toGameMain': case 'toGameWin': case 'toGameLose':
        return {...state, page: action.payload};
      case 'easy': case 'normal': case 'hard':
        return {...state, difficulty: action.type};
      case 'name':
        return {...state, player: action.payload};
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };