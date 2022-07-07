import { PersistActionTypes } from '../Actions/updatePersist';
import { REHYDRATE } from 'redux-persist';
const nonPersistedState = {
  
};
const defaultState = {
  data: null,
  isloading: true,
  ...nonPersistedState,
};

const PersistReducer = (state = { ...defaultState }, action) => {
  console.log(action)
  switch (action.type) {
    case PersistActionTypes.UPDATE_PERSIST_DATA:
      return {
        ...state,
        user: action.user,
        isloading: false,
      };
    
    default:
      return { ...state };
  }
};

export default PersistReducer;
