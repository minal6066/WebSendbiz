export const appliedOnJobActionTypes = {
    GET_APPLIED_ON_JOB: "GET_APPLIED_ON_JOB"
  };

export const getAppliedOnJobUser = (applied_user_data) => {
  console.log(applied_user_data)
    return {
      type: appliedOnJobActionTypes.GET_APPLIED_ON_JOB,
      applied_user_data,
    };
  };

