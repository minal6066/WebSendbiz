export const UploadMediaActionTypes = {
    COMPANY_MEDIA_UPLOAD: "COMPANY_MEDIA_UPLOAD",
  };
  export const companyMediaUpload = (data) => {
    return {
      type: UploadMediaActionTypes.COMPANY_MEDIA_UPLOAD,
      data,
    };
  };