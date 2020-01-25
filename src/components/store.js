import React, {createContext, useReducer} from 'react';

const initialState = {
  page: 'start',
  player: '',
  difficulty: 'normal',
  isSubmitted: false
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
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };