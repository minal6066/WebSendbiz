import { CandidateResumeActionTypes } from '../Actions/candidate_resumeAction.js';

const defaultResumeState = {
  candidate: null,
};

const AuthReducer = (state = { ...defaultResumeState }, action) => {
  switch (action.type) {
    case CandidateResumeActionTypes.UPDATE_CANDIDATE_RESUME:
      return {
        ...state,
        candidate: action.candidate,
      };
    default:
      return { ...state };
  }
};

export default AuthReducer;