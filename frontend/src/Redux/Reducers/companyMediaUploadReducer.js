import { UploadMediaActionTypes } from '../Actions/companyMediaUploadAction';

const defaultState = {
  data: null,
};

const companyMediaUpload = (state = { ...defaultState }, action) => {
  switch (action.type) {
    case UploadMediaActionTypes.COMPANY_MEDIA_UPLOAD:
      return {
        ...state,
        data: action.data,
      };
    default:
      return { ...state };
  }
};

export default companyMediaUpload;