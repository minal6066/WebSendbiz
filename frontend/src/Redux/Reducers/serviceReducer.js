import { ServiceActionTypes } from '../Actions/serviceAction';

const defaultState = {
  servicelistdata: null,
  servicedata: null,
  isloading: true,
  oneservicedata: null,
};

const ServiceReducer = (state = { ...defaultState }, action) => {
  switch (action.type) {
    case ServiceActionTypes.GET_SERVICE_LIST:
      return {
        servicelistdata: action.servicelistdata,
        isloading: false,
      };
    case ServiceActionTypes.GET_ALL_SERVICES:
      return {
        servicedata: action.servicedata,
        isloading: false,
      };
    case ServiceActionTypes.GET_ONE_SERVICE:
      return {
        oneservicedata: action.oneservicedata,
        isloading: false,
      };
    default:
      return { ...state };
  }
};

export default ServiceReducer;
