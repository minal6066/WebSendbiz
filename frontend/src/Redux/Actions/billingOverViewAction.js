export const billingOverViewActionTypes = {
    GET_SUB_USER: "GET_SUB_USER",
  };


export const getSubUser = (sub_data) => {
    return {
      type: billingOverViewActionTypes.GET_SUB_USER,
      sub_data,
    };
  };

