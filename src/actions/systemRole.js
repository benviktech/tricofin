import { FetchSystemRoleRequest, PostSystemsRoleRequest } from "../utils/api";

export const FETCH_ROLE_INFO_SUCCESS = "FETCH_ROLE_INFO_SUCCESS";
export const LOADING_CONTENT = "LOADING_CONTENT";
export const LOADING_ERROR = "LOADING_ERROR";

export const systemRoleSuccessFetch = (data) => ({
  type: FETCH_ROLE_INFO_SUCCESS,
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
  console.log(data, "before submission");
  try {
    const response = await PostSystemsRoleRequest(method, path, data);
    console.log(response.data, "role posted successfully");
    dispatch(systemRoleSuccessFetch(response.data));
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};
