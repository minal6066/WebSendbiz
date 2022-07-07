import { OrderActionTypes } from '../Actions/OrderActions';

const defaultState = {
  orderdata: null,
};

const OrderReducer = (state = { ...defaultState }, action) => {
  switch (action.type) {
    case OrderActionTypes.GET_ALL_ORDER:
      return {
        orderdata: action.orderdata,
      };
    default:
      return { ...state };
  }
};

export default OrderReducer;
