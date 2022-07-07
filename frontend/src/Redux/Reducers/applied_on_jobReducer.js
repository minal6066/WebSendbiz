import { companyInfoActionTypes } from '../Actions/companyInfoAction';

const defaultState = {
  isloading:true,
  applied_user_data:null,
};

const appliedOnJobReducer = (state = { ...defaultState }, action) => {
  switch (action.type) {
    case companyInfoActionTypes.GET_APPLIED_ON_JOB:
      return {
        applied_user_data: action.applied_user_data,
        isloading: false
      };
    default:
      return { ...state };
  }
};

export default appliedOnJobReducer;