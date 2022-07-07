import { updateCandidatureActionTypes } from '../Actions/candidate_resumeAction.js';

const defaultState = {
  data: null,
};

const updateCandidatureReducer = (state = { ...defaultState }, action) => {
  switch (action.type) {
    case updateCandidatureActionTypes.UPDATE_CANDIDATURE:
      return {
        ...state,
        data: action.data,
      };
    default:
      return { ...state };
  }
};

export default updateCandidatureReducer;