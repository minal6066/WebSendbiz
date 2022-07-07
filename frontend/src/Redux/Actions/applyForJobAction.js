export const ApplyJobActionTypes = {
    APPLY_FOR_JOB: "APPLY_FOR_JOB",
    CHANGE_APPLY_JOB_STATUS: "CHANGE_APPLY_JOB_STATUS",
  };
  export const applyForJob = (data) => {
    return {
      type: ApplyJobActionTypes.APPLY_FOR_JOB,
      data,
    };
  };
  export const applyJobStatus = (data) => {
    return {
      type: ApplyJobActionTypes.CHANGE_APPLY_JOB_STATUS,
      data,
    };
  };