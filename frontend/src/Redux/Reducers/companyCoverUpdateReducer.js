import { companyCoverActionTypes } from '../Actions/companyCoverUpdateAction';

const defaultState = {
  data: null,
  isloadding:true
};

const companyCoverUpdate = (state = { ...defaultState }, action) => {
  switch (action.type) {
    case companyCoverActionTypes.UPDATE_CANDIDATE_RESUME:
      return {
        ...state,
        data: action.data,
        isloadding: false
      };
    default:
      return { ...state };
  }
};

export default companyCoverUpdate;