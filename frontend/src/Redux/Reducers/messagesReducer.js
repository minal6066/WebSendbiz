import { chatActionTypes } from '../Actions/messagesAction';

const defaultState = {
  messages: [],
  isloading: true,
};

const messagesReducer = (state = { ...defaultState }, action) => {
  switch (action.type) {
    case chatActionTypes.GET_ALL_MESSAGES:
      return {
        ...state,
        messages: action.messages,
        // isloading: false,
      };
    default:
      return { ...state };
  }
};

export default messagesReducer;
