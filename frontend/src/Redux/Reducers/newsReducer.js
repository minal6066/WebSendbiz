import { NewsActionTypes } from '../Actions/newsActions';

const defaultState = {
  newsdata: null,
  isloading: true,
  newslistdata: null,
  newsonedata: null,
};

const newsReducer = (state = { ...defaultState }, action) => {
  switch (action.type) {
    case NewsActionTypes.GET_ALL_NEWS:
      return {
        newsdata: action.newsdata,
        isloading: false,
      };
    case NewsActionTypes.GET_ONE_NEWS:
      return {
        newsonedata: action.newsonedata,
        isloading: false,
      };
    default:
      return { ...state };
  }
};

export default newsReducer;
