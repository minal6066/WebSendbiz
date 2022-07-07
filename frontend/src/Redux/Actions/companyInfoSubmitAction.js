export const companyInfoSubmitActionTypes = {
    UPDATE_COMPANY_INFO: "UPDATE_COMPANY_INFO",
    
  };
  export const updateCompanyInfo = (data) => {
    return {
      type: companyInfoSubmitActionTypes.UPDATE_COMPANY_INFO,
      data,
    };
  };
  