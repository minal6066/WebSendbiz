export const chatActionTypes = {
  GET_ALL_MESSAGES: 'GET_ALL_MESSAGES',
};

export const getAllMessages = (messages) => {
  return {
    type: chatActionTypes.GET_ALL_MESSAGES,
    messages,
  };
};
