export const companyServicesActionTypes = {
    GET_COMPANY_SERVICES_DATA: "GET_COMPANY_SERVICES_DATA",
    LOADING:"LOADING"
  };
export const companyServicesData = (data,isloading) => {
  // console.log(data)
  return {
    type: companyServicesActionTypes.GET_COMPANY_SERVICES_DATA,
    data,
    isloading
  };
};
