export const companyInfoActionTypes = {
    GET_COMPANY_INFO_DATA: "GET_COMPANY_INFO_DATA",
    LOADING:"LOADING",
    GET_COMPANY_INFO: "GET_COMPANY_INFO",
    ADD_SUB_USER: "ADD_SUB_USER",
    GET_SUB_USER: "GET_SUB_USER",
    GET_APPLIED_ON_JOB: "GET_APPLIED_ON_JOB"
  };
export const companyInfoData = (data,isloading) => {
  // console.log(data)
  return {
    type: companyInfoActionTypes.GET_COMPANY_INFO_DATA,
    data,
    isloading
  };
};
export const getCompanyProfileInfo = (comp_pro_data,isloading) => {
  // console.log(comp_pro_data)
    return {
      type: companyInfoActionTypes.GET_COMPANY_INFO,
      comp_pro_data,
      isloading
    };
  };
export const addSubUserOverView = (user_data) => {
    return {
      type: companyInfoActionTypes.ADD_SUB_USER,
      user_data,
    };
  };
export const getSubUser = (sub_data) => {
    return {
      type: companyInfoActionTypes.GET_SUB_USER,
      sub_data,
    };
  };

export const getAppliedOnJobUser = (applied_user_data) => {
  console.log(applied_user_data)
    return {
      type: companyInfoActionTypes.GET_APPLIED_ON_JOB,
      applied_user_data,
    };
  };
