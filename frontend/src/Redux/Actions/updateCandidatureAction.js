export const updateCandidatureActionTypes = {
    UPDATE_CANDIDATURE: "UPDATE_CANDIDATURE",
  };
  export const updateCandidatureInfo = (data) => {
    return {
      type: updateCandidatureActionTypes.UPDATE_CANDIDATURE,
      data,
    };
  };