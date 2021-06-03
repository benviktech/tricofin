import {
  PostSystemUserRequest,
  UpdateSystemUserRequest,
  DeleteSystemUserRequest,
} from "../utils/api";

export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const LOADING_CONTENT = "LOADING_CONTENT";
export const LOADING_ERROR = "LOADING_ERROR";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const RESET_USER_ALERT = "RESET_USER_ALERT";

export const createUserSuccessPost = (data) => {
  return {
    type: CREATE_USER_SUCCESS,
    payload: data,
  };
};

export const updateUserSuccessPost = (data) => {
  return {
    type: UPDATE_USER_SUCCESS,
    payload: data,
  };
};

export const deleteUserSuccess = (data) => {
  return {
    type: DELETE_USER_SUCCESS,
    payload: data,
  };
};

export const createSystemUser = (data) => async (dispatch) => {
  const path = "api/System/SaveSystemUser";
  const method = "post";

  const userData = {
    userName: data.userName,
    roleID: data.roleID,
    userPassword: data.userpassword,
    surName: data.surName,
    otherNames: data.otherNames,
    phoneNo1: data.phoneNo1,
    phoneNo2: data.phoneNo2,
    isCashier: data.isCashier,
    cashierGL: "00056778",
    passwordNeverExpires: data.passwordNeverExpires,
    mustChangePassword: data.mustChangePassword,
    tempRole: data.tempRole,
    tempRoleID: data.tempRoleID,
    tempExpiryDate: data.tempExpiryDate,
    isDisabled: data.isDisabled,
    isDeleted: data.isDeleted,
    isVerified: data.isVerified,
    verifiedOn: new Date(),
    verifiedBy: "BENEVIK",
    createdOn: new Date(),
    createdBy: "BENEVIK",
    modifiedOn: new Date(),
    modifiedBy: "BENEVIK",
  };

  try {
    dispatch({ type: LOADING_CONTENT });
    console.log(userData);
    const response = await PostSystemUserRequest(method, path, userData);
    dispatch(createUserSuccessPost(response.data));
    console.log(response.data);
  } catch (error) {
    console.log("am here");
    console.log(error.message);
  }
};

export const updateSystemUser = (data) => async (dispatch) => {
  const path = "api/System/UpdateSystemUser";
  const method = "put";

  const userData = {
    userName: data.userName,
    roleID: data.roleID,
    userPassword: data.userPassword,
    surName: data.surName,
    otherNames: data.otherNames,
    phoneNo1: data.phoneNo1,
    phoneNo2: data.phoneNo2,
    isCashier: data.isCashier,
    cashierGL: data.cashierGL,
    passwordNeverExpires: data.passwordNeverExpires,
    mustChangePassword: data.mustChangePassword,
    tempRole: data.tempRole,
    tempRoleID: data.tempRoleID,
    tempExpiryDate: data.tempExpiryDate,
    isDisabled: data.isDisabled,
    isDeleted: data.isDeleted,
    isVerified: data.isVerified,
    verifiedOn: "2021-06-01T00:50:40.606Z",
    verifiedBy: "BENEVIK",
    createdOn: "2021-06-01T00:50:40.606Z",
    createdBy: "BENEVIK",
    modifiedOn: "2021-06-01T00:50:40.606Z",
    modifiedBy: "BENEVIK",
  };

  try {
    dispatch({ type: LOADING_CONTENT });
    console.log(userData);
    const response = await UpdateSystemUserRequest(method, path, userData);
    dispatch(updateUserSuccessPost(response.data));
    console.log(response.data);
  } catch (error) {
    console.log("am here");
    console.log(error.message);
  }
};

export const deleteSystemUser = (data) => async (dispatch) => {
  const userName = data.userName;
  const path = `api/System/DeleteSystemUser/${userName}`;
  const method = "delete";
  try {
    const response = await DeleteSystemUserRequest(method, path);
    dispatch(deleteUserSuccess(userName));
  } catch (error) {
    console.log("am here");
    console.log(error.message);
  }
};
