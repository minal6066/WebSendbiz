export const PersistActionTypes = {
    UPDATE_PERSIST_DATA: "UPDATE_PERSIST_DATA",
  };
  export const updatePersistData = (data) => {
  	console.log(data)
    return {
      type: PersistActionTypes.UPDATE_PERSIST_DATA,
      data,
    };
  };