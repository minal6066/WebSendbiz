export const chatActionTypes = {
  CHECK_FOR_CHANNEL: 'CHECK_FOR_CHANNEL',
};
export const checkforChannel = (chatHistory) => {
  return {
    type: chatActionTypes.CHECK_FOR_CHANNEL,
    chatHistory,
  };
};
