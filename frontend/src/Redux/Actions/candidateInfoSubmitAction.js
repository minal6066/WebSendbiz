export const candidateInfoSubmitActionTypes = {
    UPDATE_CANDIDATE_INFO: "UPDATE_CANDIDATE_INFO",
    UPDATE_CANDIDATE_PASSWORD: "UPDATE_CANDIDATE_PASSWORD",
    DELETE_CANDIDATE_RESUME: "DELETE_CANDIDATE_RESUME",
    APPLIED_CANDIDATE_JOBS: "APPLIED_CANDIDATE_JOBS",
    FAVOURITE_CANDIDATE_JOBS: "FAVOURITE_CANDIDATE_JOBS",
    ADD_FAVOURITE_CANDIDATE_JOBS: "ADD_FAVOURITE_CANDIDATE_JOBS",
    DELETE_FAVOURITE_CANDIDATE_JOBS: "DELETE_FAVOURITE_CANDIDATE_JOBS"
  };
  export const updateCandidateInfo = (data) => {
    return {
      type: candidateInfoSubmitActionTypes.UPDATE_CANDIDATE_INFO,
      data,
    };
  };

  export const changePassword = (pass_data) => {
    return {
      type: candidateInfoSubmitActionTypes.UPDATE_CANDIDATE_PASSWORD,
      pass_data,
    };
  };

  export const deleteResume = (resume_data) => {
    return {
      type: candidateInfoSubmitActionTypes.DELETE_CANDIDATE_RESUME,
      resume_data,
    };
  };

  export const getAppliedCandidateJobs = (job_data) => {
    return {
      type: candidateInfoSubmitActionTypes.APPLIED_CANDIDATE_JOBS,
      job_data,
    };
  };
  export const getFavouriteJobs = (fav_data) => {
    return {
      type: candidateInfoSubmitActionTypes.FAVOURITE_CANDIDATE_JOBS,
      fav_data,
    };
  };
  export const addFavouriteJobs = (add_fav_data) => {
    return {
      type: candidateInfoSubmitActionTypes.ADD_FAVOURITE_CANDIDATE_JOBS,
      add_fav_data,
    };
  };

  export const deleteFavouriteJobs = (del_fav_data) => {
    return {
      type: candidateInfoSubmitActionTypes.DELETE_FAVOURITE_CANDIDATE_JOBS,
      del_fav_data,
    };
  };