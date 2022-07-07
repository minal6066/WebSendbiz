import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import jobManagementReducer from './JobManagementReducer';
import appliedJobsReducer from './AppliedJobsReducer';
import companyInfoReducer from './companyInfoReducer';
import candidateInfoSubmitReducer from './candidateInfoSubmitReducer';
import appliedOnJobReducer from './applied_on_jobReducer';
import billingOverViewReducer from './billingOverViewReducer';
import ServiceReducer from './serviceReducer';
import eventReducer from './eventReducer';
import newsReducer from './newsReducer';
import PersistReducer from './updatePersistReducer';
import statsReducer from './statsReducer';
import uploadMediaReducer from './uploadMediaReducer';
import mailBoxReducer from './mailBoxReducer';
import checkChannelReducer from './checkChannelReducer';
import messagesReducer from './messagesReducer';
import OrderReducer from './OrderReducer';

export default combineReducers({
  AuthReducer,
  jobManagementReducer,
  appliedJobsReducer,
  companyInfoReducer,
  candidateInfoSubmitReducer,
  appliedOnJobReducer,
  billingOverViewReducer,
  ServiceReducer,
  eventReducer,
  newsReducer,
  statsReducer,
  mailBoxReducer,
  uploadMediaReducer,
  checkChannelReducer,
  messagesReducer,
  OrderReducer,
});
