import axios from "axios";
import moment from "moment";
import { MapKey } from '../Shared/imageUrlPath';
import { dispatchAction } from '../Redux/Store/index';
import {
  uploadMediaFirstStatus,
  uploadMediaSecondStatus,
  uploadMediaThirdStatus,
  uploadMediaFourthStatus,
  uploadMediaFifthStatus
} from '../Redux/Actions/uploadMediaAction'
// import Cookies from "js-cookie";
// import USER_ROLES from "./roles"
//axios global configuration
axios.defaults.baseURL =
//   process.env.NODE_ENV === "production"
    // ? 
    "https://api.sendbiz.com/"
    //  "http://localhost:3000/";
// axios.defaults.withCredentials = true

axios.defaults.headers.post["Content-Type"] = "application/json";

const showPosition =  (position) =>{
    // console.log(position.coords)
    var ls = require('local-storage');
    ls.set('lat',position.coords.latitude);
    ls.set('long',position.coords.longitude)
    // return position.coords
  };

let HELPERS = {
  // showPosition: (position) =>{
  //   console.log(position.coords)
  //   return position.coords
  // },
  getLatLong: () =>{
    if (navigator.geolocation){
      navigator.geolocation.watchPosition(showPosition);
      
    }else {
      console.log("not found")
    }

  },
  isNumber: (value) =>{
    return (value===Number(value))?"number":"string"
  },
  
  getLocation: (lat,long) =>{
    // return await new Promise((resolve, reject) => {
    return axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + lat + ',' + long + '&key='+MapKey.key)//AIzaSyCq_buWKq5SczlpLmaxxpgQD7zZTNGGXL4') 
    
  // })
  },
  changesSaved: ( func )=>{
    try {
      if (HELPERS.savedHandle !== null) {
        HELPERS.log("saved: Clearing old interval...");
        clearInterval(HELPERS.savedHandle);
      }

      HELPERS.log("saved state....");
      HELPERS.savedHandle = setInterval(() => {
        HELPERS.log("PING: Pinging");
        func();
      }, 60 * 1000);
    } catch (e) {
      HELPERS.log(e);
    }
  },
  log: (...args) => {
    if (process.env.NODE_ENV !== "production") {
      console.log("$$woken$$", ...args);
    }
  },
  error: (...args) => {
    if (process.env.NODE_ENV !== "production") {
      console.error("$$woken$$", ...args);
    }
  },
  getCookie: (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  },
  // removeCookie: (key) => {
  //     if (key)
  //         Cookies.remove(key)
  // },
  // setCookie: (key, value) => {
  //     if (key && value)
  //         Cookies.set(key, value)
  // },
  // isRoleAssigned: () => {
  //     return !!Cookies.get("roleCode");
  // },
  // isLoggedIn: () => {
  //     return localStorage.getItem("isLoggedIn");
  // },
  request: (config) => {
    config.headers = config.headers ? config.headers : {};
    const csrfTokenEl = document.querySelector("[name=csrfmiddlewaretoken]");
    const csrfToken =
      HELPERS.getCookie("csrftoken") || (csrfTokenEl && csrfTokenEl.value);
    if (csrfToken) {
      config.headers["X-CSRFToken"] = csrfToken;
    }

    console.log("$$woken$$", config);
    return axios.request(config).then((response) => {
      return response;
    })
    .catch(
      err=>{
        console.log('err in helper........................................................................................................', err)
        // if (err.response.status===403){
        //   localStorage.setItem('token', null)
        //   window.location.href = "/signin";
        // }
        // else{
        //   throw new Error("Error");
        // }
      }
    )
  },
  // ========================upload company media on company profile===========
  uploadFirstFile : (file,uploadUrl) => {
    let uploadImage = ""
    console.log("data.url",uploadUrl);
      fetch(uploadUrl, {
        method: 'PUT',
        mode: 'cors',
        body: file,
      })
        .then((resp) => { 
          console.log(resp, 'llll')
          let upload_status = {upload_first:true}
          dispatchAction(uploadMediaFirstStatus(upload_status))
          })
        .catch((err) => console.log(err));
  },
  uploadSecondFile : (file,uploadUrl) => {
    let uploadImage = ""
    console.log("data.url",uploadUrl);
      fetch(uploadUrl, {
        method: 'PUT',
        mode: 'cors',
        body: file,
      })
        .then((resp) => { 
          console.log(resp, 'llll')
          let upload_status = {upload_second:true}
          dispatchAction(uploadMediaSecondStatus(upload_status))
        })
        .catch((err) => console.log(err));
  },
  uploadThirdFile : (file,uploadUrl) => {
    let uploadImage = ""
    console.log("data.url",uploadUrl);
      fetch(uploadUrl, {
        method: 'PUT',
        mode: 'cors',
        body: file,
      })
        .then((resp) => { 
          console.log(resp, 'llll')
          let upload_status = {upload_third:true}
          dispatchAction(uploadMediaThirdStatus(upload_status))
          })
        .catch((err) => console.log(err));
  },
  uploadFourthFile : (file,uploadUrl) => {
    let uploadImage = ""
    console.log("data.url",uploadUrl);
      fetch(uploadUrl, {
        method: 'PUT',
        mode: 'cors',
        body: file,
      })
        .then((resp) => { 
          console.log(resp, 'llll')
          let upload_status = {upload_fourth:true}
          dispatchAction(uploadMediaFourthStatus(upload_status))
          })
        .catch((err) => console.log(err));
  },
  uploadFifthFile : (file,uploadUrl) => {
    let uploadImage = ""
    console.log("data.url",uploadUrl);
      fetch(uploadUrl, {
        method: 'PUT',
        mode: 'cors',
        body: file,
      })
        .then((resp) => { 
          console.log(resp, 'llll')
          let upload_status = {upload_fifth:true}
          dispatchAction(uploadMediaFifthStatus(upload_status))
          })
        .catch((err) => console.log(err));
  },
  // uploadCompanyMedia : (files) => {
  //   let row_data = {
  //     "media": {
  //           "fileName": fileName,
  //           "fileType": file.img_type
  //       }
  //   }
  //   console.log(row_data,"row_data")
  //   APIManager.companyMediaSubmit(row_data)
  //   .then((response) => {
  //     console.log(response)
  //     if(response.data.isSuccess){
  //       message.info("Updated Successfully");
  //     }
  //   })
  //   .catch((err) =>
  //     message.error("Something went wrong.")
  //   );
  // },
// ========================end upload company media on company profile===========
  secureRequest: (config) => {
    config.headers = config.headers ? config.headers : {};
    const token = localStorage.getItem("token");
    if (token) {
    const authToken = JSON.parse(localStorage.getItem('token') || false);
      config.headers["Authorization"] = 'Bearer ' + authToken;
      config.headers['Access-Control-Allow-Credentials']= true;
    }
    console.log(config);
    return HELPERS.request(config);
  },
  debounce: (func, delay) => {
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  },
  debounceFormChanges: (func) => {
    return HELPERS.debounce(func, 1000);
  },
  getUserId: () => localStorage.getItem("user_id"),
  // convertDateTime: (string, format) => {
  //     return moment(string).format(format);
  // },
  // getAcronym: (string) => {
  //     return string.match(/\b(\w)/g).join("")
  // },
  // removeASCII: (string) => {
  //     return string.replace(/[^\x20-\x7E]/g, “”);
  // },
  // trimObj: (obj) => {
  //     if (!Array.isArray(obj) && typeof obj != "object") return obj;
  //     return Object.keys(obj).reduce(function (acc, key) {
  //         acc[key.replace(/[^\x20-\x7E]/g, “”)] = typeof obj[key] == "string" ? obj[key].replace(/[^\x20-\x7E]/g, “”) : obj[key];
  //         return acc;
  //     }, Array.isArray(obj) ? [] : {});
  // },
  // trimJSON: (obj) => {
  //     if (!Array.isArray(obj) && typeof obj != "object") return obj;
  //     return Object.keys(obj).reduce(function (acc, key) {
  //         acc[key.trim()] = typeof obj[key] == "string" ? obj[key].trim() : obj[key];
  //         return acc;
  //     }, Array.isArray(obj) ? [] : {});
  // },
  converToFormData: (obj, rootName, ignoreList) => {
    var formData = new FormData();
    function appendFormData(data, root) {
      if (!ignore(root)) {
        root = root || "";
        if (data instanceof File) {
          formData.append(root, data);
        } else if (Array.isArray(data)) {
          for (var i = 0; i < data.length; i++) {
            appendFormData(data[i], root + "[" + i + "]");
          }
        } else if (typeof data === "object" && data) {
          for (var key in data) {
            if (data.hasOwnProperty(key)) {
              if (root === "") {
                appendFormData(data[key], key);
              } else {
                appendFormData(data[key], root + "." + key);
              }
            }
          }
        } else {
          if (data !== null && typeof data !== "undefined") {
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
  },
  // updatedConvertToFormData: (obj, rootName, ignoreList) => {
  //     var formData = new FormData();
  //     function appendFormData(data, root) {
  //         if (!ignore(root)) {
  //             root = root || "";
  //             if (data instanceof File) {
  //                 formData.append(root, data);
  //             } else if (Array.isArray(data)) {
  //                 for (var i = 0; i < data.length; i++) {
  //                     appendFormData(data[i], root + "[" + i + "]");
  //                 }
  //             } else if (typeof data === "object" && data) {
  //                 for (var key in data) {
  //                     if (data.hasOwnProperty(key)) {
  //                         if (root === "") {
  //                             appendFormData(data[key], key);
  //                         } else {
  //                             appendFormData(data[key], root + key);
  //                         }
  //                     }
  //                 }
  //             } else {
  //                 if (data !== null && typeof data !== "undefined") {
  //                     formData.append(root, data);
  //                 }
  //             }
  //         }
  //     }
  //     function ignore(root) {
  //         return Array.isArray(ignoreList)
  //             && ignoreList.some(function (x) { return x === root; });
  //     }
  //     appendFormData(obj, rootName);
  //     return formData;
  // },
  // getUserRoles: (roles) => {
  //     if (roles.length) {
  //         let filteredRoles = roles.filter(role => {
  //             return role.name && role.name.startsWith("role_");
  //         });
  //         let newRoles = filteredRoles.map(role => {
  //             return USER_ROLES[role.name];
  //         });
  //         return newRoles;
  //     }
  //     return [];
  // },
  // getNameInitials: (firstName, lastName) => {
  //     let initials = "";
  //     if (firstName.length > 0) initials += firstName[0];
  //     if (lastName.length > 0) initials += lastName[0];
  //     return initials
  // },
  // getFileNameFromURL: (url) => {
  //     let a = url.split("/");
  //     return a[a.length - 1];
  // },
  // modifyURL: (params) => {
  //     let roleCode = HELPERS.getCookie("roleCode");
  //     const filter_obj = params;
  //     const url = new URL(`api/v1/teams/export-sp_val/${roleCode}`, window.location.origin);
  //     Object.keys(params).forEach(key => {
  //         url.searchParams.append(key, filter_obj[key])
  //     });
  //     console.log("url print", url);
  //     return url;
  // },
  // modifyURLTimesheet: (params) => {
  //     const filter_obj = params;
  //     const url = new URL(`api/v1/timesheets/dump-timesheet-data/`, window.location.origin);
  //     Object.keys(params).forEach(key => {
  //         url.searchParams.append(key, filter_obj[key])
  //     });
  //     console.log("url print", url);
  //     return url;
  // },
  // isLocalHost: () => {
  //     return Boolean(
  //         window.location.hostname === "localhost" ||
  //         // [::1] is the IPv6 localhost address.
  //         window.location.hostname === "[::1]" ||
  //         // 127.0.0.1/8 is considered localhost for IPv4.
  //         window.location.hostname.match(
  //             /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  //         )
  //     );
  // },
  // formatErrors : (errors) =>{
  //     return errors.map((err ) => err.errors[0])
  // }
};

export default HELPERS;
