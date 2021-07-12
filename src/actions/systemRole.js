import {
  FetchSystemRoleRequest,
  PostSystemsRoleRequest,
  UpdateSystemsRoleRequest,
  DeleteSystemsRoleRequest,
} from "../utils/api";
import { toast } from "react-toastify";

export const FETCH_ROLE_INFO_SUCCESS = "FETCH_ROLE_INFO_SUCCESS";
export const CREATE_ROLE_INFO_SUCCESS = "CREATE_ROLE_INFO_SUCCESS";
export const UPDATE_ROLE_INFO_SUCCESS = "UPDATE_ROLE_INFO_SUCCESS";
export const LOADING_CONTENT = "LOADING_CONTENT";
export const LOADING_ERROR = "LOADING_ERROR";

export const systemRoleSuccessFetch = (data) => ({
  type: FETCH_ROLE_INFO_SUCCESS,
  payload: data,
});
export const systemRoleSuccessCreate = (data) => ({
  type: CREATE_ROLE_INFO_SUCCESS,
  payload: data,
});
export const systemRoleSuccessUpdate = (data) => ({
  type: UPDATE_ROLE_INFO_SUCCESS,
  payload: data,
});

export const fetchSystemRoles = () => async (dispatch) => {
  const method = "get";
  const path = "api/System/GetRoles";
  try {
    dispatch({ type: LOADING_CONTENT });
    const response = await FetchSystemRoleRequest(method, path);
    dispatch(systemRoleSuccessFetch(response.data));
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};

export const createSystemRole = (data) => async (dispatch) => {
  const method = "post";
  const path = "api/System/SaveRole";
  try {
    const response = await PostSystemsRoleRequest(method, path, data);
    dispatch(systemRoleSuccessCreate(response.data));
    toast.success(`Role ${data.roleID} Created Successfully`);
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
    toast.error(`Adding Role ${data.roleID} Failed`);
  }
};

export const UpdateSystemRole = (data) => async (dispatch) => {
  const method = "put";
  const path = "/api/System/UpdateRole";
  try {
    const response = await UpdateSystemsRoleRequest(method, path, data);
    dispatch(systemRoleSuccessUpdate(response.data));
    toast.success(`Role ${data.roleID} Updated Successfully`);
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
    toast.error(`Updating Role ${data.roleID} Failed`);
  }
};

export const DeleteSystemRole = (data) => async (dispatch) => {
  const method = "delete";
  const path = `​/api​/System​/DeleteRole​/${data.roleID}`;
  try {
    const response = await DeleteSystemsRoleRequest(method, path, data);
    toast.success(`Role ${data.roleID} Removed Successfully`);
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
    toast.error(`Removing Role ${data.roleID} Failed`);
  }
};
