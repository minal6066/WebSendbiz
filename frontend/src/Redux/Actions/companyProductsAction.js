export const companyProductsActionTypes = {
    GET_COMPANY_PRODUCTS_DATA: "GET_COMPANY_PRODUCTS_DATA",
    LOADING:"LOADING"
  };
export const companyProductsData = (data,isloading) => {
  // console.log(data)
  return {
    type: companyProductsActionTypes.GET_COMPANY_PRODUCTS_DATA,
    data,
    isloading
  };
};
