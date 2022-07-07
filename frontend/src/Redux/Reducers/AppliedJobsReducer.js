import { jobActionTypes } from '../Actions/AppliedJobsActions';

const defaultState = {
  data: null,
  isloading:true
};

const appliedJobsReducer = (state = { ...defaultState }, action) => {
  switch (action.type) {
    case jobActionTypes.APPLIED_JOB_DATA:
      return {
        data: action.data,
        isloading:false
      };
    default:
      return { ...state };
  }
};

export default appliedJobsReducer;