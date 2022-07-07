export const CandidateResumeActionTypes = {
    UPDATE_CANDIDATE_RESUME: "UPDATE_CANDIDATE_RESUME",
  };
  export const updateCandidateResume = (candidate) => {
    return {
      type: CandidateResumeActionTypes.UPDATE_CANDIDATE_RESUME,
      candidate,
    };
  };