export const OrderActionTypes = {
  GET_ALL_ORDER: 'GET_ALL_ORDER',
};
export const getAllOrders = (orderdata) => {
  return {
    type: OrderActionTypes.GET_ALL_ORDER,
    orderdata,
  };
};
