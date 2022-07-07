import { statsActionTypes } from '../Actions/statsAction';

const defaultState = {
    stats_data: null,
};

const statsReducer = (state = { ...defaultState }, action) => {
  switch (action.type) {
    case statsActionTypes.GET_STATISTICS_DATA:
      return {
        stats_data: action.stats_data,
        isloading: false,
      };
    default:
      return { ...state };
  }
};

export default statsReducer;
