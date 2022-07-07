import { AuthActionTypes } from '../Actions/AuthAction';
import { REHYDRATE } from 'redux-persist';
const nonPersistedState = {
  info: {
    email: '',
  },
};
const defaultAuthState = {
  user: null,
  isloading: true,
  ...nonPersistedState,
};

const AuthReducer = (state = { ...defaultAuthState }, action) => {
  
  switch (action.type) {
    case AuthActionTypes.UPDATE_USER_DATA:
      console.log(action,"hello action")
      return {
        ...state,
        user: action.user,
        isloading: false,
      };
    case REHYDRATE:
      let oldState = (action.payload || {}).AuthReducer;
      return {
        ...oldState,
        ...nonPersistedState,
      };
    default:
      return { ...state };
  }
};

export default AuthReducer;
