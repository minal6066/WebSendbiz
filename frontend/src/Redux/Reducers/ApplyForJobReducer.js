import { ApplyJobActionTypes } from '../Actions/applyForJobAction.js';

const defaultState = {
  data: null,
  aplied_data: null,
  isloading: true
};

const ApplyJobReducer = (state = { ...defaultState }, action) => {
  switch (action.type) {
    case ApplyJobActionTypes.APPLY_FOR_JOB:
      return {
        ...state,
        data: action.data,
      };
    case companyInfoActionTypes.CHANGE_APPLY_JOB_STATUS:
      return {
        aplied_data: action.data,
        isloading: false
      };
    default:
      return { ...state };
  }
};

export default ApplyJobReducer;