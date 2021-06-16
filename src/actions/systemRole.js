import {
  FetchSystemRoleRequest,
  PostSystemsRoleRequest,
  UpdateSystemsRoleRequest,
  DeleteSystemsRoleRequest,
} from "../utils/api";

export const FETCH_ROLE_INFO_SUCCESS = "FETCH_ROLE_INFO_SUCCESS";
export const LOADING_CONTENT = "LOADING_CONTENT";
export const LOADING_ERROR = "LOADING_ERROR";
export const CREATE_ROLE_SUCCESS = "CREATE_ROLE_SUCCESS";
export const UPDATE_ROLE_SUCCESS = "UPDATE_ROLE_SUCCESS";
export const RESET_ROLE_ALERT = "RESET_ROLE_ALERT";
export const DELETE_ROLE_SUCCESS = "DELETE_ROLE_SUCCESS";

export const systemRoleSuccessFetch = (data) => ({
  type: FETCH_ROLE_INFO_SUCCESS,
  payload: data,
});

export const systemRoleSuccessPost = (data) => ({
  type: CREATE_ROLE_SUCCESS,
  payload: data,
});

export const systemRoleSuccessUpdate = (data) => ({
  type: UPDATE_ROLE_SUCCESS,
  payload: data,
});

export const systemRoleSuccessDelete = (data) => ({
  type: DELETE_ROLE_SUCCESS,
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
    dispatch(systemRoleSuccessFetch(response.data));
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};

export const UpdateSystemRole = (data) => async (dispatch) => {
  const method = "put";
  const path = "/api/System/UpdateRole";
  try {
    console.log(data);
    const response = await UpdateSystemsRoleRequest(method, path, data);
    dispatch(systemRoleSuccessUpdate(response.data));
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};

export const DeleteSystemRole = (data) => async (dispatch) => {
  const roleID = data.roleID;
  const method = "delete";
  const path = `​/api​/System​/DeleteRole​/${roleID}`;
  try {
    const response = await DeleteSystemsRoleRequest(method, path, data);
    dispatch(systemRoleSuccessDelete(roleID));
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};
