import { companyServicesActionTypes } from '../Actions/companyServicesAction';

const defaultState = {
  data: null,
  isloading:true
};

const companyServicesReducer = (state = { ...defaultState }, action) => {
  switch (action.type) {
    case companyInfoActionTypes.GET_COMPANY_INFO_DATA:
      return {
        data: action.data,
        isloading:false
      };
    default:
      return { ...state };
  }
};

export default companyServicesReducer;