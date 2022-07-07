import { candidateInfoSubmitActionTypes } from '../Actions/candidateInfoSubmitAction';

const defaultState = {
  data: null,
  pass_data: null,
  resume_data: null,
  job_data: null,
  fav_data: null,
  add_fav_data: null,
  del_fav_data:null,
  isLoading: true,
};

const candidateInfoSubmitReducer = (state = { ...defaultState }, action) => {
  switch (action.type) {
    case candidateInfoSubmitActionTypes.UPDATE_CANDIDATE_INFO:
      return {
        data: action.data,
        isLoading: false,
      };
    case candidateInfoSubmitActionTypes.UPDATE_CANDIDATE_PASSWORD:
      return {
        pass_data: action.pass_data,
        isLoading: false,
      };
    case candidateInfoSubmitActionTypes.DELETE_CANDIDATE_RESUME:
      return {
        resume_data: action.resume_data,
        isLoading: false,
      };
    case candidateInfoSubmitActionTypes.APPLIED_CANDIDATE_JOBS:
      return {
        job_data: action.job_data,
        isLoading: false,
      };
    case candidateInfoSubmitActionTypes.FAVOURITE_CANDIDATE_JOBS:
      return {
        fav_data: action.fav_data,
        isLoading: false,
      };
    case candidateInfoSubmitActionTypes.ADD_FAVOURITE_CANDIDATE_JOBS:
      return {
        add_fav_data: action.add_fav_data,
        isLoading: false,
      };
    case candidateInfoSubmitActionTypes.DELETE_FAVOURITE_CANDIDATE_JOBS:
      return {
        del_fav_data: action.del_fav_data,
        isLoading: false,
      };
    default:
      return { ...state };
  }
};

export default candidateInfoSubmitReducer;