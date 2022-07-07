export const eventsActionTypes = {
  GET_ALL_EVENTS: 'GET_ALL_EVENTS',
  GET_EVENT_DETAIL: 'GET_EVENT_DETAIL',
  GET_EVENT_LIST: 'GET_EVENT_LIST',
};
export const getEventList = (eventdata, isloading) => {
  return {
    type: eventsActionTypes.GET_ALL_EVENTS,
    eventdata,
    isloading,
  };
};
export const getEventDetail = (oneeventdata, isloading) => {
  return {
    type: eventsActionTypes.GET_EVENT_DETAIL,
    oneeventdata,
    isloading,
  };
};
export const getcompanyEventList = (eventList, isloading) => {
  return {
    type: eventsActionTypes.GET_EVENT_LIST,
    eventList,
    isloading,
  };
};
