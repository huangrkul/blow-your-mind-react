import React, {createContext, useReducer} from 'react';

const initialState = {
  page: 'main',
  player: '',
  difficulty: 'normal',
  timeLeft: 0,
  chancesLeft: 0,
  hintsLeft: 0,
  isSubmitted: false,
  ranks: [],
  timeEasy: 900,
  timeNorm: 600,
  timeHard: 300
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'pageSwap':
        return {...state, page: action.payload};
      case 'easy': case 'normal': case 'hard':
        return {...state, difficulty: action.type};
      case 'name':
        return {...state, player: action.payload};
      case 'submit':
        return {...state, isSubmitted: action.payload};
      case 'updateRank':
        return {...state, timeLeft: action.time, chancesLeft: action.chance, hintsLeft: action.hint};
      case 'showRanks':
        return {...state, ranks: action.payload};
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };