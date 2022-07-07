export const AuthActionTypes = {
    UPDATE_USER_DATA: "UPDATE_USER_DATA",
  };
  export const updateUser = (user) => {
  	console.log(user,"hello")
    return {
      type: AuthActionTypes.UPDATE_USER_DATA,
      user,
    };
  };