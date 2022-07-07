export const jobActionTypes = {
  GET_JOB_DATA: 'GET_JOB_DATA',
  MY_JOB_DATA: 'MY_JOB_DATA',
  APPLIED_CANDIDATES_DATA: 'APPLIED_CANDIDATES_DATA',
  JOB_APPLIED_BY_COMPANY: 'JOB_APPLIED_BY_COMPANY',
  JOB_DESCRIPTION: 'JOB_DESCRIPTION',
  GET_ONE_APPLIED_JOB: 'GET_ONE_APPLIED_JOB',
  GET_COMPANY_LIST: 'GET_COMPANY_LIST',
  LOADING: 'LOADING',
  RELOAD_COMPONENT: 'RELOAD_COMPONENT',
};
export const jobManagementData = (jobdata, isloading) => {
  return {
    type: jobActionTypes.GET_JOB_DATA,
    jobdata,
    isloading,
  };
};
export const myjobManagementData = (myjobData, isloading) => {
  return {
    type: jobActionTypes.MY_JOB_DATA,
    myjobData,
    isloading,
  };
};
export const appliedCandidatesData = (candidateData, isloading) => {
  return {
    type: jobActionTypes.APPLIED_CANDIDATES_DATA,
    candidateData,
    isloading,
  };
};
export const JobsAppliedbyCompany = (appliedCandidateData, isloading) => {
  return {
    type: jobActionTypes.JOB_APPLIED_BY_COMPANY,
    appliedCandidateData,
    isloading,
  };
};
export const getjobDescription = (decriptionData, isloading) => {
  return {
    type: jobActionTypes.JOB_DESCRIPTION,
    decriptionData,
    isloading,
  };
};
export const getOneAppliedJob = (appliedJobData, isloading) => {
  return {
    type: jobActionTypes.GET_ONE_APPLIED_JOB,
    appliedJobData,
    isloading,
  };
};
export const getCompanyList = (companyList, isloading) => {
  return {
    type: jobActionTypes.GET_COMPANY_LIST,
    companyList,
    isloading,
  };
};

export const reloadComponent = () => {
  return {
    type: jobActionTypes.RELOAD_COMPONENT,
  };
};
