export const NewsActionTypes = {
  GET_NEWS_LIST: 'GET_NEWS_LIST',
  GET_ALL_NEWS: 'GET_ALL_NEWS',
  GET_ONE_NEWS:'GET_ONE_NEWS'
};
export const getNewsList = (newslistdata) => {
  return {
    type: NewsActionTypes.GET_NEWS_LIST,
    newslistdata,
  };
};
export const getallNewsList = (newsdata) => {
  return {
    type: NewsActionTypes.GET_ALL_NEWS,
    newsdata,
  };
};
export const getonenews = (newsonedata) => {
  return {
    type: NewsActionTypes.GET_ONE_NEWS,
    newsonedata,
  };
};
