import { eventsActionTypes } from '../Actions/eventsAction';

const defaultState = {
  eventdata: null,
  oneeventdata: null,
  isloading: true,
  eventList: null,
};

const eventReducer = (state = { ...defaultState }, action) => {
  switch (action.type) {
    case eventsActionTypes.GET_ALL_EVENTS:
      return {
        eventdata: action.eventdata,
        isloading: false,
      };
    case eventsActionTypes.GET_EVENT_DETAIL:
      return {
        oneeventdata: action.oneeventdata,
        isloading: false,
      };
    case eventsActionTypes.GET_EVENT_LIST:
      return {
        eventList: action.eventList,
        isloading: false,
      };
    default:
      return { ...state };
  }
};

export default eventReducer;
