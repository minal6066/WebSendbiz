export const mediaActionTypes = {
    UPLOAD_FILE: "UPLOAD_FILE",
    BACK_UPLOAD_FILE: "BACK_UPLOAD_FILE",
    FIRST_UPLOAD_STATUS: "FIRST_UPLOAD_STATUS",
    SECOND_UPLOAD_STATUS: "SECOND_UPLOAD_STATUS",
    THIRD_UPLOAD_STATUS: "THIRD_UPLOAD_STATUS",
    FOURTH_UPLOAD_STATUS: "FOURTH_UPLOAD_STATUS",
    FIFTH_UPLOAD_STATUS: "FIFTH_UPLOAD_STATUS",
    LOADING:"LOADING"
};
export const uploadMedia = (data,isloading) => {
  console.log(data)
  return {
    type: mediaActionTypes.UPLOAD_FILE,
    data,
  };
};
export const backgroundUploadMedia = (back_status, isloading) =>{
	return{
		type: mediaActionTypes.BACK_UPLOAD_FILE,
		back_status,
	}
}
export const uploadMediaFirstStatus = (first_status,isloading) => {
  console.log(first_status,"++++++++++++++++++++++")
  return {
    type: mediaActionTypes.FIRST_UPLOAD_STATUS,
    first_status,
  };
};
export const uploadMediaSecondStatus = (second_status,isloading) => {
  console.log(second_status,"++++++++++++++++++++++")
  return {
    type: mediaActionTypes.SECOND_UPLOAD_STATUS,
    second_status,
  };
};
export const uploadMediaThirdStatus = (third_status,isloading) => {
  console.log(third_status,"++++++++++++++++++++++")
  return {
    type: mediaActionTypes.THIRD_UPLOAD_STATUS,
    third_status,
  };
};
export const uploadMediaFourthStatus = (fourth_status,isloading) => {
  console.log(fourth_status,"++++++++++++++++++++++")
  return {
    type: mediaActionTypes.FOURTH_UPLOAD_STATUS,
    fourth_status,
  };
};
export const uploadMediaFifthStatus = (fifth_status,isloading) => {
  console.log(fifth_status,"++++++++++++++++++++++")
  return {
    type: mediaActionTypes.FIFTH_UPLOAD_STATUS,
    fifth_status,
  };
};
