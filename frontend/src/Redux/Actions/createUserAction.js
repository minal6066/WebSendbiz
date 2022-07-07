export const CreateUserActionTypes = {
    CREATE_USER: "CREATE_USER",
  };
  export const createUser = (user) => {
    return {
      type: CreateUserActionTypes.CREATE_USER,
      user,
    };
  };