import { billingOverViewActionTypes } from '../Actions/billingOverViewAction';

const defaultState = {
  isloading:true,
  sub_data:null,
};

const billingOverViewReducer = (state = { ...defaultState }, action) => {
  switch (action.type) {
    case billingOverViewActionTypes.GET_SUB_USER:
      return {
        sub_data: action.sub_data,
        isloading: false
      };

    default:
      return { ...state };
  }
};

export default billingOverViewReducer;