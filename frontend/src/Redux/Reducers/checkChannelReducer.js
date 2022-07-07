import { chatActionTypes } from '../Actions/checkChannel';

const defaultState = {
  chatHistory: null,
  isloading: true,
};

const checkChannelReducer = (state = { ...defaultState }, action) => {
  switch (action.type) {
    case chatActionTypes.CHECK_FOR_CHANNEL:
      return {
        chatHistory: action.chatHistory,
        isloading: false,
      };
    default:
      return { ...state };
  }
};

export default checkChannelReducer;
