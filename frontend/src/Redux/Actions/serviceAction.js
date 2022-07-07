export const ServiceActionTypes = {
  GET_SERVICE_LIST: 'GET_SERVICE_LIST',
  GET_ALL_SERVICES: 'GET_ALL_SERVICES',
  GET_ONE_SERVICE: 'GET_ONE_SERVICE',
};
export const getServiceList = (servicelistdata) => {
  return {
    type: ServiceActionTypes.GET_SERVICE_LIST,
    servicelistdata,
  };
};
export const getAllServiceList = (servicedata) => {
  return {
    type: ServiceActionTypes.GET_ALL_SERVICES,
    servicedata,
  };
};
export const getOneService = (oneservicedata) => {
  return {
    type: ServiceActionTypes.GET_ONE_SERVICE,
    oneservicedata,
  };
};
