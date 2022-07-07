export const chatActionTypes = {
  GET_ALL_CHANNEL: 'GET_ALL_CHANNEL',
};
export const getAllChannel = (channelList) => {
  return {
    type: chatActionTypes.GET_ALL_CHANNEL,
    channelList,
  };
};
