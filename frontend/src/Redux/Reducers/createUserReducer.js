import { CreateUserActionTypes } from '../Actions/createUserAction.js';

const defaultUserState = {
  user: null,
};

const createUserReducer = (state = { ...defaultUserState }, action) => {
  switch (action.type) {
    case CreateUserActionTypes.CREATE_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return { ...state };
  }
};

export default createUserReducer;