import {
  PostSystemUserRequest,
  UpdateSystemUserRequest,
  DeleteSystemUserRequest,
} from "../utils/api";
import { toast } from "react-toastify";

export const LOADING_CONTENT = "LOADING_CONTENT";
export const LOADING_ERROR = "LOADING_ERROR";

export const createSystemUser = (data) => async (dispatch) => {
  const path = "api/System/SaveSystemUser";
  const method = "post";

  const userData = {
    userName: data.userName,
    roleID: data.roleID,
    userPassword: data.userPassword,
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
    const response = await PostSystemUserRequest(method, path, userData);
    toast.success(`User ${data.userName} Created Successfully`);
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
    toast.error(`Adding User ${data.userName} Failed`);
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
    toast.success(`User ${data.userName} Updated Successfully`);
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
    toast.error(`Updating User ${data.userName} Failed`);
  }
};

export const deleteSystemUser = (data) => async (dispatch) => {
  const path = `api/System/DeleteSystemUser/${data.userName}`;
  const method = "delete";
  try {
    const response = await DeleteSystemUserRequest(method, path);
    toast.success(`User ${data.userName} Deleted Successfully`);
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
    toast.error(`Deleting User ${data.userName} Failed`);
  }
};
