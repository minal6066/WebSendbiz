export const jobActionTypes = {
    APPLIED_JOB_DATA: "APPLIED_JOB_DATA",
    LOADING:"LOADING"
  };
  export const getAppliedJobs = (data,isloading) => {
    return {
      type: jobActionTypes.APPLIED_JOB_DATA,
      data,
      isloading
    };
  };
