import { companyProductsActionTypes } from '../Actions/companyProductsAction';

const defaultState = {
  data: null,
  isloading:true
};

const companyProductsReducer = (state = { ...defaultState }, action) => {
  switch (action.type) {
    case companyInfoActionTypes.GET_COMPANY_PRODUCTS_DATA:
      return {
        data: action.data,
        isloading:false
      };
    default:
      return { ...state };
  }
};

export default companyProductsReducer;