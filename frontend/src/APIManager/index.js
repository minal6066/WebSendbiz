import axios from 'axios';
import { dispatchAction } from '../Redux/Store/index';
import { updateUser } from '../Redux/Actions/AuthAction';
import { Alert, message } from 'antd';
import HELPERS from './helper';
import {
  jobManagementData,
  myjobManagementData,
  appliedCandidatesData,
  JobsAppliedbyCompany,
  getjobDescription,
  getOneAppliedJob,
  getCompanyList,
} from '../Redux/Actions/JobManagementAction';
import {
  getServiceList,
  getAllServiceList,
  getOneService,
} from '../Redux/Actions/serviceAction';
import { updateCandidateResume } from '../Redux/Actions/candidate_resumeAction';
import { getAppliedJobs } from '../Redux/Actions/AppliedJobsActions';
import { createUser } from '../Redux/Actions/createUserAction';
import {
  companyInfoData,
  getCompanyProfileInfo,
  addSubUserOverView,
} from '../Redux/Actions/companyInfoAction';
import { getSubUser } from '../Redux/Actions/billingOverViewAction';
import { getAppliedOnJobUser } from '../Redux/Actions/applied_on_jobAction';
import {
  updateCandidateInfo,
  changePassword,
  deleteResume,
  getAppliedCandidateJobs,
  getFavouriteJobs,
  addFavouriteJobs,
  deleteFavouriteJobs,
} from '../Redux/Actions/candidateInfoSubmitAction';
import {
  getEventList,
  getEventDetail,
  getcompanyEventList,
} from '../Redux/Actions/eventsAction';
import { companyCoverUpdate } from '../Redux/Actions/companyCoverUpdateAction';
import {
  applyForJob,
  applyJobStatus,
} from '../Redux/Actions/applyForJobAction';
import { updateCandidatureInfo } from '../Redux/Actions/updateCandidatureAction';
import { companyMediaUpload } from '../Redux/Actions/companyMediaUploadAction';
import { companyServicesData } from '../Redux/Actions/companyServicesAction';
import { companyProductsData } from '../Redux/Actions/companyProductsAction';
import { getallNewsList, getonenews } from '../Redux/Actions/newsActions';
import { getstatsData } from '../Redux/Actions/statsAction';
import { getAllChannel } from '../Redux/Actions/mailBoxAction';
import { checkforChannel } from '../Redux/Actions/checkChannel';
import { getAllMessages } from '../Redux/Actions/messagesAction';
import { getAllOrders } from '../Redux/Actions/OrderActions';

class APIManager {
  constructor() {
    var ls = require('local-storage');
    var tok = ls.get('token');
    console.log(tok);
    this.axiosInstance = axios.create({
      baseURL: 'https://api.sendbiz.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
        Authorization: `Bearer ${tok}`,
        // 'Content-Type': 'multipart/form-data'
      },
    });
    console.log('bearer token:');
  }

  converToFormData = (obj, rootName, ignoreList) => {
    var formData = new FormData();
    function appendFormData(data, root) {
      if (!ignore(root)) {
        root = root || '';
        if (data instanceof File) {
          formData.append(root, data);
        } else if (Array.isArray(data)) {
          for (var i = 0; i < data.length; i++) {
            appendFormData(data[i], root + '[' + i + ']');
          }
        } else if (typeof data === 'object' && data) {
          for (var key in data) {
            if (data.hasOwnProperty(key)) {
              if (root === '') {
                appendFormData(data[key], key);
              } else {
                appendFormData(data[key], root + '.' + key);
              }
            }
          }
        } else {
          if (data !== null && typeof data !== 'undefined') {
            formData.append(root, data);
          }
        }
      }
    }
    function ignore(root) {
      return (
        Array.isArray(ignoreList) &&
        ignoreList.some(function (x) {
          return x === root;
        })
      );
    }
    appendFormData(obj, rootName);
    return formData;
  };

  jobList = (page, job_type, experience, posted_on, searchQuery, sector) => {
    if (
      page === undefined ||
      job_type === undefined ||
      experience === undefined ||
      posted_on === undefined ||
      searchQuery === undefined ||
      sector === undefined
    ) {
      page = '';
      job_type = '';
      experience = '';
      posted_on = '';
      searchQuery = '';
      sector = '';
    }
    console.log(searchQuery);
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get(
          `jobs?limit=20&page=${page}&job_type=${job_type}&min_experience=${experience}&create=${posted_on}&search=${searchQuery}&sector=${sector}`
        )
        .then((response) => {
          dispatchAction(jobManagementData(response.data));
          resolve(response);
        })
        .catch(() => {
          reject();
        });
    });
  };
  companyList = async (page, search) => {
    if (search === undefined) {
      search = '';
    }
    return await new Promise((resolve, reject) => {
      console.log(page, 'lllll current page');
      this.axiosInstance
        .get(`company_list?limit=20&page=${page}&search=${search}`)
        .then((response) => {
          dispatchAction(getCompanyList(response.data));
          resolve(response);
          console.log(response, 'company list');
        })
        .catch(() => {
          reject();
        });
    });
  };
  serviceList = (page) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get(`services/company?limit=10&page=${page}`)
        .then((response) => {
          dispatchAction(getServiceList(response.data));
          resolve(response);
          console.log(response, 'service list');
        })
        .catch(() => {
          reject();
        });
    });
  };
  allNewsList = (page) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get(`news?limit=5&page=${page}`)
        .then((response) => {
          dispatchAction(getallNewsList(response.data));
          resolve(response);
          console.log(response, 'news list');
        })
        .catch(() => {
          reject();
        });
    });
  };

  newsList = (page) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get(`news/company?limit=10&page=${page}`)
        .then((response) => {
          // dispatchAction(getallNewsList(response.data));
          resolve(response);
          console.log(response, 'news list');
        })
        .catch(() => {
          reject();
        });
    });
  };

  getAllOrders = async (sort,searchQuery) => {
    return await new Promise((resolve, reject) => {
      this.axiosInstance
        .get(`/orders?sort=${sort}&_id=${searchQuery}`)
        .then((response) => {
          resolve(response);
          console.log(response, 'Company_ID');
          dispatchAction(getAllOrders(response.data));
        })
        .catch(() => {
          reject();
        });
    });
  };
  addService = async (params) => {
    return await new Promise((resolve, reject) => {
      this.axiosInstance
        .post(`services`, params)
        .then((response) => {
          // dispatchAction(getServiceList(response.data));
          resolve(response);
          console.log(response, 'service added');
        })
        .catch(() => {
          reject();
        });
    });
  };
  addEvent = async (params) => {
    return await new Promise((resolve, reject) => {
      this.axiosInstance
        .post(`/events`, params)
        .then((response) => {
          // dispatchAction(getServiceList(response.data));
          resolve(response);
          console.log(response, 'service added');
        })
        .catch(() => {
          reject();
        });
    });
  };
  addNews = async (params) => {
    return await new Promise((resolve, reject) => {
      this.axiosInstance
        .post(`/news`, params)
        .then((response) => {
          // dispatchAction(getServiceList(response.data));
          resolve(response);
          console.log(response, 'service added');
        })
        .catch(() => {
          reject();
        });
    });
  };
  likeEvent = (id) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .post(`events/${id}/likes`)
        .then((response) => {
          // dispatchAction(getServiceList(response.data));
          resolve(response);
          console.log(response, 'service added');
        })
        .catch(() => {
          reject();
        });
    });
  };
  commentEvent = (id, params) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .post(`events/${id}/comment/`, params)
        .then((response) => {
          // dispatchAction(getServiceList(response.data));
          resolve(response);
          console.log(response, 'comment added');
        })
        .catch(() => {
          reject();
        });
    });
  };
  changeActiveStatus = (id) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .post(`services/${id}/toggle-status`)
        .then((response) => {
          // dispatchAction(getServiceList(response.data));
          resolve(response);
          console.log(response, 'service added');
        })
        .catch(() => {
          reject();
        });
    });
  };
  newsActiveStatus = (id) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .post(`news/${id}/toggle-status`)
        .then((response) => {
          // dispatchAction(getServiceList(response.data));
          resolve(response);
          console.log(response, 'service added');
        })
        .catch(() => {
          reject();
        });
    });
  };
  productActiveStatus = (id) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .post(`products/${id}/toggle-status`)
        .then((response) => {
          // dispatchAction(getServiceList(response.data));
          resolve(response);
          console.log(response, 'service added');
        })
        .catch(() => {
          reject();
        });
    });
  };
  deleteJob = (id) => {
    return new Promise((resolve, reject) => {
      const param = { isDeleted: true };
      this.axiosInstance
        .delete('jobs/' + id, param)
        .then((response) => {
          console.log(response, 'skadfkn');
          dispatchAction(getjobDescription(response.data));
          resolve(response);
          console.log('job is deleted.');
        })
        .catch(() => {
          reject();
        });
    });
  };

  deleteIntersted = (id) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .delete('interested/one/' + id)
        .then((response) => {
          console.log(response, 'skadfkn');
          resolve(response);
        })
        .catch(() => {
          reject();
        });
    });
  };
  editJob = (id, params) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .patch('edit_job/' + id, params)
        .then((response) => {
          console.log(response, 'job is edited');
          // dispatchAction(getjobDescription(response.data));
          resolve(response);
        })
        .catch(() => {
          reject();
        });
    });
  };
  sortEvents = (sort, searchQuery) => {
    //console.log(params,'params');
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get(`events/company?search=${searchQuery}&sort=${sort}`)
        .then((response) => {
          console.log(response, 'events sorted');
          // dispatchAction(getjobDescription(response.data));
          resolve(response);
        })
        .catch(() => {
          reject();
        });
    });
  };
  sortProducts = (sort, searchQuery) => {
    //console.log(params,'params');
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get(`products/company?search=${searchQuery}&sort=${sort}`)
        .then((response) => {
          console.log(response, 'events sorted');
          // dispatchAction(getjobDescription(response.data));
          resolve(response);
        })
        .catch(() => {
          reject();
        });
    });
  };
  sortNews = (sort, searchQuery) => {
    //console.log(params,'params');
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get(`news/company?search=${searchQuery}&sort=${sort}`)
        .then((response) => {
          console.log(response, 'events sorted');
          // dispatchAction(getjobDescription(response.data));
          resolve(response);
        })
        .catch(() => {
          reject();
        });
    });
  };
  sortServices = (sort, searchQuery) => {
    //console.log(params,'params');
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get(`services/company?search=${searchQuery}&sort=${sort}`)
        .then((response) => {
          console.log(response, 'events sorted');
          // dispatchAction(getjobDescription(response.data));
          resolve(response);
        })
        .catch(() => {
          reject();
        });
    });
  };
  getJobDescription = (id) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get('jobs/' + id)
        .then((response) => {
          console.log(response, 'skadfkn');
          dispatchAction(getjobDescription(response.data));
          resolve(response);
          console.log('this is the job');
        })
        .catch(() => {
          reject();
        });
    });
  };
  getStaticsData = () => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get('get-view-stats/2021')
        .then((response) => {
          console.log(response, 'skadfkn');
          dispatchAction(getstatsData(response.data));
          resolve(response);
        })
        .catch(() => {
          reject();
        });
    });
  };
  appliedJobs = () => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get('applied_on_my_job?applied_by_type=2')
        .then((response) => {
          dispatchAction(getAppliedJobs(response.data));
          resolve(response);
          console.log(response, 'ddd');
        })
        .catch(() => {
          reject();
        });
    });
  };
  changeJobActiveStatus = (id) => {
    console.log(id, 'this.ist id');
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .patch(`job_active_status/${id}`)
        .then((response) => {
          // dispatchAction(getAppliedJobs(response.data));
          resolve(response);
          console.log(response, 'ddd');
        })
        .catch(() => {
          reject();
        });
    });
  };
  myJobs = (page) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get(`myjobs?limit=10&page=${page}`)
        .then((response) => {
          dispatchAction(myjobManagementData(response.data));
          resolve(response);
          console.log(response, 'tushar');
        })
        .catch(() => {
          reject();
        });
    });
  };
  createInterested = (category, param) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .post(`/interested/${category}`, param)
        .then((response) => {
          resolve(response);
          console.log(response, 'tushar');
        })
        .catch(() => {
          reject();
        });
    });
  };
  createMessage = (param) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .post(`/mailbox/message`, param)
        .then((response) => {
          resolve(response);
        })
        .catch(() => {
          reject();
        });
    });
  };
  listChannnel = () => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get(`mailbox/message?limit=10&page=1`)
        .then((response) => {
          resolve(response);
          dispatchAction(getAllChannel(response.data));
        })
        .catch(() => {
          reject();
        });
    });
  };
  checkChannel = (id) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get(`mailbox/message/channel/${id}`)
        .then((response) => {
          resolve(response);
          dispatchAction(checkforChannel(response.data));
          console.log(response);
        })
        .catch(() => {
          reject();
        });
    });
  };
  changePasswordforCompany = (params) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .patch('/change_password', params)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  };
  listChat = (id, page) => {
    console.log(page);
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get(`mailbox/message/${id}?page=${page}&limit=10`)
        .then((response) => {
          resolve(response);
          dispatchAction(getAllMessages(response.data));
        })
        .catch(() => {
          reject();
        });
    });
  };
  getInterstedList = (pageNumber, category) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get(`/interested/${category}?limit=10&page=${pageNumber}`)
        .then((response) => {
          resolve(response);
        })
        .catch(() => {
          reject();
        });
    });
  };
  Login = (params) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .post('login', params)
        .then((response) => {
          dispatchAction(updateUser(response.data));
          resolve(response);
        })
        .catch(() => {
          reject();
        });
    });
  };

  Signup = (params) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .post('register', params)
        .then((response) => {
          dispatchAction(createUser(response.data));
          resolve(response);
        })
        .catch(() => {
          reject();
        });
    });
  };

  getAppliedCandidates = () => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get('applied_on_my_job?applied_by_type=1')
        .then((response) => {
          resolve(response);
          dispatchAction(appliedCandidatesData(response.data));
          console.log(response, 'applied candidates');
        })
        .catch(() => {
          reject();
        });
    });
  };

  getAllServices = (page, price, search, company) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get(`services?limit=10`)
        .then((response) => {
          resolve(response);
          dispatchAction(getAllServiceList(response.data));
          console.log(response, 'applied candidates');
        })
        .catch(() => {
          reject();
        });
    });
  };
  getAllEvents = (page, date, search) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get(`events?limit=10&page=${page}&sort=${date}&search=${search}`)
        .then((response) => {
          resolve(response);
          dispatchAction(getEventList(response.data));
          console.log(response, 'applied candidates');
        })
        .catch(() => {
          reject();
        });
    });
  };

  preSignedUrl = (data) => {
    return new Promise((resolve, reject) => {
      console.log(data, 'llllllllllllllll');
      this.axiosInstance
        .post('get-presigned-url', data)
        .then((response) => {
          resolve(response);
          //dispatchAction(getAllServiceList(response.data));
          console.log(response, 'presigned url resp');
        })
        .catch(() => {
          reject();
        });
    });
  };

  getoneEvent = (id) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get(`/events/${id}`)
        .then((response) => {
          resolve(response);
          dispatchAction(getEventDetail(response.data));
          console.log(response, 'applied candidates');
        })
        .catch(() => {
          reject();
        });
    });
  };
  getEventList = (page) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get(`events/company?limit=10&page=${page}`)
        .then((response) => {
          resolve(response);
          dispatchAction(getcompanyEventList(response.data));
          console.log(response, 'applied candidates');
        })
        .catch(() => {
          reject();
        });
    });
  };
  deleteEvent = (id) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .delete(`events/${id}`)
        .then((response) => {
          resolve(response);
          //  dispatchAction(getcompanyEventList(response.data));
          console.log(response, 'event is deleted');
        })
        .catch(() => {
          reject();
        });
    });
  };
  deleteNews = (id) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .delete(`news/${id}`)
        .then((response) => {
          resolve(response);
          //  dispatchAction(getcompanyEventList(response.data));
          console.log(response, 'event is deleted');
        })
        .catch(() => {
          reject();
        });
    });
  };
  editEvent = (id, params) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .patch(`events/${id}`, params)
        .then((response) => {
          resolve(response);
          //  dispatchAction(getcompanyEventList(response.data));
          console.log(response, 'event is deleted');
        })
        .catch(() => {
          reject();
        });
    });
  };
  editService = (id, params) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .patch(`services/${id}`, params)
        .then((response) => {
          resolve(response);
          //  dispatchAction(getcompanyEventList(response.data));
          console.log(response, 'event is deleted');
        })
        .catch(() => {
          reject();
        });
    });
  };
  editNews = (id, params) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .patch(`news/${id}`, params)
        .then((response) => {
          resolve(response);
          //  dispatchAction(getcompanyEventList(response.data));
          console.log(response, 'event is deleted');
        })
        .catch(() => {
          reject();
        });
    });
  };
  getOneService = (id) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get(`services/${id}`)
        .then((response) => {
          resolve(response);
          dispatchAction(getOneService(response.data));
          console.log(response, 'applied candidates');
        })
        .catch(() => {
          reject();
        });
    });
  };

  getOneNews = (id) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get(`news/${id}`)
        .then((response) => {
          resolve(response);
          dispatchAction(getonenews(response.data));
          console.log(response, 'applied candidates');
        })
        .catch(() => {
          reject();
        });
    });
  };
  resumeJobsAppliedbyCompany = () => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get('get_all_applied_jobs')
        .then((response) => {
          dispatchAction(JobsAppliedbyCompany(response.data));
          resolve(response);
        })
        .catch(() => {
          reject();
        });
    });
  };
  resumeGetOneAppliedJob = (id) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get('get_one_applied_job/' + id)
        .then((response) => {
          dispatchAction(getOneAppliedJob(response.data));
          resolve(response);
          console.log(response, 'ddd');
        })
        .catch(() => {
          reject();
        });
    });
  };

  addjob = (data) => {
    return HELPERS.secureRequest({
      url: `/add_job`,
      method: 'POST',
    });
  };

  appliedCandidate = () => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get('applied_on_my_job?applied_by_type=1')
        .then((response) => {
          dispatchAction(JobsAppliedbyCompany(response.data));
          resolve(response);
        })
        .catch(() => {
          reject();
        });
    });
  };
  AddNewCard = (params) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .post('payments/customers/payment-methods', params)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  };
  GETALLCard = () => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get('payments/customers/payment-methods')
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  DeleteOneCard = (id) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .delete(`payments/customers/payment-methods/${id}`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  submitPaymemt = (params) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .post('payments/add-billing', params)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  CandidateResume = (params) => {
    const authToken = JSON.parse(localStorage.getItem('token') || false);
    this.axiosInstance = axios.create({
      baseURL: 'https://api.sendbiz.com/',

      timeout: 10000,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Credentials': true,
        Authorization: 'Bearer ' + authToken,
      },
    });
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .patch('/candidate_upload_resume', params)
        .then((response) => {
          dispatchAction(updateCandidateResume(response.data));
          resolve(response);
        })
        .catch(() => {
          reject();
        });
    });
  };

  companyInfo = async () => {
    const authToken = JSON.parse(localStorage.getItem('token') || false);
    console.log(authToken);
    this.axiosInstance = axios.create({
      baseURL: 'https://api.sendbiz.com/',

      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
        Authorization: 'Bearer ' + authToken,
      },
    });
    return await new Promise((resolve, reject) => {
      this.axiosInstance
        .get('myprofile')
        .then((response) => {
          dispatchAction(companyInfoData(response.data));
          resolve(response);
        })
        .catch(() => {
          reject();
        });
    });
  };

  candidateInfoSubmit = (params) => {
    const authToken = JSON.parse(localStorage.getItem('token') || false);
    this.axiosInstance = axios.create({
      baseURL: 'https://api.sendbiz.com/',

      timeout: 10000,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Credentials': true,
        Authorization: 'Bearer ' + authToken,
      },
    });
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .patch('update_candidate_profile', params)
        .then((response) => {
          dispatchAction(updateCandidateInfo(response.data));
          resolve(response);
        })
        .catch(() => {
          reject();
        });
    });
  };

  companyCoverUpdate = (params) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .patch('upload_company_identity', params)
        .then((response) => {
          dispatchAction(companyCoverUpdate(response.data));
          resolve(response);
        })
        .catch(() => {
          reject();
        });
    });
  };

  applyForJob = (params) => {
    const authToken = JSON.parse(localStorage.getItem('token') || false);
    this.axiosInstance = axios.create({
      baseURL: 'https://api.sendbiz.com/',

      timeout: 10000,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Credentials': true,
        Authorization: 'Bearer ' + authToken,
      },
    });
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .post('apply_job', params)
        .then((response) => {
          dispatchAction(applyForJob(response.data));
          resolve(response);
        })
        .catch(() => {
          reject();
        });
    });
  };

  candidatureSubmit = (params) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .patch('update_candidate_candidature', params)
        .then((response) => {
          dispatchAction(updateCandidatureInfo(response.data));
          resolve(response);
        })
        .catch(() => {
          reject();
        });
    });
  };

  checkPremiumDetail = () => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get('premium-detail')
        .then((response) => {
          //dispatchAction(updateCandidatureInfo(response.data));
          resolve(response);
        })
        .catch(() => {
          reject();
        });
    });
  };

  companyInfoSubmit = (params) => {
    console.log(params);
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .patch('edit_company', params)
        .then((response) => {
          dispatchAction(updateCandidateInfo(response.data));
          resolve(response);
        })
        .catch(() => {
          reject();
        });
    });
  };

  companyMediaSubmit = (params) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .patch('upload_company_media', params)
        .then((response) => {
          dispatchAction(companyMediaUpload(response.data));
          resolve(response);
        })
        .catch(() => {
          reject();
        });
    });
  };

  GetCompanyServices = () => {
    return new Promise((resolve, reject) => {
      this.axiosInstance.get('services').then((response) => {
        dispatchAction(companyServicesData(response.data));
      });
    });
  };
  changeCandidatePassword = (params) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .patch('change_password', params)
        .then((response) => {
          dispatchAction(changePassword(response.data));
          resolve(response);
        })
        .catch(() => {
          reject();
        });
    });
  };

  deleteCandidateResume = (params) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .patch('candidate_delete_resume/' + params)
        .then((response) => {
          dispatchAction(deleteResume(response.data));
          resolve(response);
        })
        .catch(() => {
          reject();
        });
    });
  };
  deleteService = (id) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .delete(`services/${id}`)
        .then((response) => {
          //   dispatchAction(deleteResume(response.data));
          resolve(response);
        })
        .catch(() => {
          reject();
        });
    });
  };
  appliedCandidateJobs = (params) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get('get_all_applied_jobs')
        .then((response) => {
          dispatchAction(getAppliedCandidateJobs(response.data));
          resolve(response);
        })
        .catch(() => {
          reject();
        });
    });
  };

  companyDetail = (params) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get('company_detail?comp_id=' + params)
        .then((response) => {
          dispatchAction(getCompanyProfileInfo(response.data));
          resolve(response);
        })
        .catch(() => {
          reject();
        });
    });
  };

  favouriteJobs = (params) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get('favjobs/')
        .then((response) => {
          dispatchAction(getFavouriteJobs(response.data));
          resolve(response);
        })
        .catch(() => {
          reject();
        });
    });
  };
  promoteEntities = (params) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .post('payments/sponsor-entity', params)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  };

  submitfavouriteJobs = (params) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .post('favjobs/', params)
        .then((response) => {
          dispatchAction(addFavouriteJobs(response.data));
          resolve(response);
        })
        .catch(() => {
          reject();
        });
    });
  };

  delfavouriteJobs = (params) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .patch('favjobs/' + params)
        .then((response) => {
          dispatchAction(deleteFavouriteJobs(response.data));
          resolve(response);
        })
        .catch(() => {
          reject();
        });
    });
  };
  changeApplyJobStatus = (params, data) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .patch('update_apply_job_status/' + params, data)
        .then((response) => {
          dispatchAction(applyJobStatus(response.data));
          resolve(response);
        })
        .catch(() => {
          reject();
        });
    });
  };

  createSubUser = (data) => {
    const authToken = JSON.parse(localStorage.getItem('token') || false);
    this.axiosInstance = axios.create({
      baseURL: 'https://api.sendbiz.com/',

      timeout: 10000,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Credentials': true,
        Authorization: 'Bearer ' + authToken,
      },
    });
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .post('add_sub_user', data)
        .then((response) => {
          dispatchAction(addSubUserOverView(response.data));
          resolve(response);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  };

  getSubUserList = async (page, sort_by) => {
    if (page === undefined) {
      page = '';
    }
    if (sort_by === undefined) {
      sort_by = '';
    }
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get(`get_sub_user?limit=20&page=${page}&sort_by=${sort_by}`)
        .then((response) => {
          dispatchAction(getSubUser(response.data));
          resolve(response);
        })
        .catch(() => {
          reject();
        });
    });
  };

  getAppliedOnJobList = (params) => {
    console.log(params);
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get('applied_on_my_job/' + params)
        .then((response) => {
          console.log(response);
          dispatchAction(getAppliedOnJobUser(response.data));
          resolve(response);
        })
        .catch(() => {
          reject();
        });
    });
  };

  getAllProducts = (page) => {
    return HELPERS.secureRequest({
      url: `products?limit=10&page=${page}`,
      method: 'GET',
    });
  };

  getOneProduct = (id) => {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get(`products/${id}`)
        .then((response) => {
          resolve(response);
          // dispatchAction(getOneService(response.data));
          console.log(response, 'applied candidates');
        })
        .catch(() => {
          reject();
        });
    });
  };

  getAllCompanyProducts = (page) => {
    return new Promise((resolve, reject) => {
      HELPERS.secureRequest({
        url: `products/company?limit=10&page=${page}`,
        method: 'GET',
      })
        .then((response) => {
          console.log('API resp', response);
          dispatchAction(companyProductsData(response.data));
          resolve(response);
        })
        .catch(() => {
          reject();
        });
    });
  };
  patchCompanyProduct = (id, params) => {
    // const data = this.converToFormData(params);
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .patch(`products/${id}`, params)
        .then((response) => {
          console.log('API resp', response);
          resolve(response);
        })
        .catch(() => {
          reject();
        });
    });
  };
  postCompanyProduct = (params) => {
    // const data = this.converToFormData(params);
    return HELPERS.secureRequest({
      url: `products`,
      method: 'POST',
      data: params,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
  deleteCompanyProduct = (id) => {
    return HELPERS.secureRequest({
      url: `products/${id}`,
      method: 'DELETE',
    });
  };
  uploadProductMedia = (id, data, options) => {
    return HELPERS.secureRequest({
      url: `products/${id}/media/`,
      method: 'POST',
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      ...options,
    });
  };
  deleteProductMedia = (prod_id, media_id) => {
    return HELPERS.secureRequest({
      url: `products/${prod_id}/media/${media_id}`,
      method: 'DELETE',
    });
  };

  // ========================sort and search functions==================
  allProductsSortAndSearch = (page, searchQuery, price, company) => {
    return HELPERS.secureRequest({
      url: `products?limit=10&page=${page}${searchQuery}${price}&sort=${price}${company}`,
      method: 'GET',
    });
  };

  companyListSortAndSearch = (page, search) => {
    return HELPERS.secureRequest({
      url: `company_list?limit=20&page=${page}&search=${search}`,
      method: 'GET',
    });
  };

  allServicesSortAndSearch = (page, category, company, price, search) => {
    return HELPERS.secureRequest({
      url: `services?limit=10&page=${page}${category}${company}${price}${search}`,
      method: 'GET',
    });
  };

  allEventsSortAndSearch = (page, date, search) => {
    return HELPERS.secureRequest({
      url: `events?limit=10&page=${page}&sort=${date}&search=${search}`,
      method: 'GET',
    });
  };
  allJobsSearchLanding = (page, search) => {
    return HELPERS.secureRequest({
      url: `jobs?limit=5&page=${page}&search=${search}`,
      method: 'GET',
    });
  };
  allProductsSearchLanding = (page, searchQuery) => {
    return HELPERS.secureRequest({
      url: `products?limit=10&page=${page}&search=${searchQuery}`,
      method: 'GET',
    });
  };
  allServicesSearchLanding = (page, search) => {
    return HELPERS.secureRequest({
      url: `services?limit=10&page=${page}&search=${search}`,
      method: 'GET',
    });
  };
  allEventsSearchLanding = (page, search) => {
    return HELPERS.secureRequest({
      url: `events?limit=10&page=${page}&search=${search}`,
      method: 'GET',
    });
  };

  newsListSearchLanding = (page, search) => {
    return HELPERS.secureRequest({
      url: `news/company?limit=10&page=${page}&search=${search}`,
      method: 'GET',
    });
  };
  subuserSortAndSearch = (page, search, sort_by) => {
    console.log(sort_by);
    return HELPERS.secureRequest({
      url: `get_sub_user?limit=20&page=${page}${sort_by}&search=${search}`,
      method: 'GET',
    });
  };
  myJobsSortAndSearch = (page, search) => {
    console.log(page, 'page');
    return HELPERS.secureRequest({
      url: `myjobs?limit=10&page=${page}&search=${search}`,
      method: 'GET',
    });
  };
  allNewsListSortAndSearch = (page, search, company, location) => {
    return HELPERS.secureRequest({
      url: `news?limit=5&page=${page}&search=${search}`,
      method: 'GET',
    });
  };
 
  jobListSuggestions = (search) => {
    return HELPERS.secureRequest({
      url: `jobs?limit=5&page=${1}&search=${search}`,
      method: 'GET',
    });
  };
  allProductsSuggestions = (search) => {
    return HELPERS.secureRequest({
      url: `products?limit=5&page=${1}&search=${search}`,
      method: 'GET',
    });
  };
  allServicesSuggestions = (search) => {
    return HELPERS.secureRequest({
      url: `services?limit=5&page=${1}&search=${search}`,
      method: 'GET',
    });
  };
  allNewsListSuggestions = (search) => {
    return HELPERS.secureRequest({
      url: `news?limit=5&page=${1}&search=${search}`,
      method: 'GET',
    });
  };
  allEventsSuggestions = (search) => {
    return HELPERS.secureRequest({
      url: `events?limit=5&page=${1}&search=${search}`,
      method: 'GET',
    });
  };

  allJobCategories = (pageNumber, search) => {
    return HELPERS.secureRequest({
      url: `job-title-list?sort=categoryName&search=${search}`,
      method: 'GET',
    });
  };

  allServiceCategories = (pageNumber, search) => {
    return HELPERS.secureRequest({
      url: `entity-category/service?sort=categoryName&search=${search}`,
      method: 'GET',
    });
  };

  allProductCategories = (pageNumber, search) => {
    return HELPERS.secureRequest({
      url: `entity-category/service?sort=categoryName&search=${search}`,
      method: 'GET',
    });
  };

  checkCompanyId = async (company_id) => {
    console.log('company id:', company_id, typeof company_id);
    const companyId = parseInt(company_id, 10);
    console.log(typeof companyId);
    return await HELPERS.request({
      url: `check_company_id?company_id=${companyId}`,
      method: 'GET',
    });
    // return await new Promise((resolve,reject) => {
    //   this.axiosInstance
    //   .get(`check_company_id`,company_id)
    //   .then((response) => {
    //     resolve(response);
    //     console.log(response , "Company_ID");
    //   })
    //   .catch(() => {
    //     reject();
    //   });
    // })
  };
}
export default new APIManager();
