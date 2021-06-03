import { FetchSystemModuleRequest } from "../utils/api";

export const FETCH_MODULE_INFO_SUCCESS = "FETCH_MODULE_INFO_SUCCESS";
// export const POST_COMPANY_INFO_SUCCESS = "POST_COMPANY_INFO_SUCCESS";
export const LOADING_CONTENT = "LOADING_CONTENT";
export const LOADING_ERROR = "LOADING_ERROR";

export const systemModuleSuccessFetch = (data) => ({
  type: FETCH_MODULE_INFO_SUCCESS,
  payload: data,
});

// export const companyInfoSuccessPost = (data) => ({
//   type: POST_COMPANY_INFO_SUCCESS,
//   payload: data,
// });

export const fetchSystemModules = () => async (dispatch) => {
  const method = "get";
  const path = "api/StaticData/GetSystemModules";
  try {
    dispatch({ type: LOADING_CONTENT });
    const response = await FetchSystemModuleRequest(method, path);
    dispatch(systemModuleSuccessFetch(response.data));
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};
