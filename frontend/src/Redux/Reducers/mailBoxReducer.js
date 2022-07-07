import { chatActionTypes } from '../Actions/mailBoxAction';

const defaultState = {
  channelList: null,
  isloading: true,
};

const mailBoxReducer = (state = { ...defaultState }, action) => {
  switch (action.type) {
    case chatActionTypes.GET_ALL_CHANNEL:
      return {
        channelList: action.channelList,
        isloading: false,
      };
    default:
      return { ...state };
  }
};

export default mailBoxReducer;
