import { jobActionTypes } from '../Actions/JobManagementAction';

const defaultState = {
  jobData: null,
  myjobData: null,
  candidateData: null,
  appliedCandidateData: null,
  decriptionData: null,
  isLoading: true,
  appliedJobData: null,
  companyList: null,
};

const jobManagementReducer = (state = { ...defaultState }, action) => {
  switch (action.type) {
    case jobActionTypes.GET_JOB_DATA:
      return {
        jobdata: action.jobdata,
        isLoading: false,
      };
    case jobActionTypes.MY_JOB_DATA:
      return {
        myjobData: action.myjobData,
        isLoading: false,
      };
    case jobActionTypes.APPLIED_CANDIDATES_DATA:
      return {
        candidateData: action.candidateData,
        isLoading: false,
      };
    case jobActionTypes.JOB_APPLIED_BY_COMPANY:
      return {
        appliedCandidateData: action.appliedCandidateData,
        isLoading: false,
      };
    case jobActionTypes.JOB_DESCRIPTION:
      return {
        decriptionData: action.decriptionData,
        isLoading: false,
      };
    case jobActionTypes.GET_ONE_APPLIED_JOB:
      return {
        appliedJobData: action.appliedJobData,
        isLoading: false,
      };
    case jobActionTypes.GET_COMPANY_LIST:
      return {
        companyList: action.companyList,
        isLoading: false,
      };
    case jobActionTypes.RELOAD_COMPONENT:
      return {
        defaultState,
      };
    default:
      return { ...state };
  }
};

export default jobManagementReducer;
