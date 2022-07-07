import { companyInfoActionTypes } from '../Actions/companyInfoAction';

const defaultState = {
  data: null,
  comp_pro_data:null,
  user_data:null,
  aplied_data:null,
  isloading:true,
  sub_data:null,
  applied_user_data:null,
  jobloading:true
};

const companyInfoReducer = (state = { ...defaultState }, action) => {
  switch (action.type) {
    case companyInfoActionTypes.GET_COMPANY_INFO_DATA:
      return {
        data: action.data,
        isloading:false
      };
    case companyInfoActionTypes.GET_COMPANY_INFO:
      // console.log(action.comp_pro_data)
      return {
        comp_pro_data: action.comp_pro_data,
        jobloading: false
      };
    

    case companyInfoActionTypes.ADD_SUB_USER:
      return {
        user_data: action.user_data,
        isloading: false
      };

    case companyInfoActionTypes.GET_SUB_USER:
      console.log(action.sub_data)
      return {
        sub_data: action.sub_data,
        isloading: false
      };

    case companyInfoActionTypes.GET_APPLIED_ON_JOB:
      return {
        applied_user_data: action.applied_user_data,
        isloading: false
      };
    default:
      return { ...state };
  }
};

export default companyInfoReducer;