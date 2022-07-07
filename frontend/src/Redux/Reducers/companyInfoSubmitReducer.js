import { companyInfoSubmitActionTypes } from '../Actions/companyInfoSubmitAction';

const defaultState = {
  data: null,
  comp_data: null,
  isLoading: true
};

const companyInfoReducer = (state = { ...defaultResumeState }, action) => {
  switch (action.type) {
    case companyInfoSubmitActionTypes.UPDATE_COMPANY_INFO:
      return {
        data: action.data,
        isLoading: false
      };
    case companyInfoSubmitActionTypes.UPDATE_COMPANY_INFO:
      return {
        comp_data: action.data,
        isLoading: false
      };
    default:
      return { ...state };
  }
};

export default companyInfoReducer;