export const companyCoverActionTypes = {
    UPDATE_COMPANY_COVER: "UPDATE_COMPANY_COVER",
  };
  export const companyCoverUpdate = (data) => {
    return {
      type: companyCoverActionTypes.UPDATE_COMPANY_COVER,
      data,
    };
  };