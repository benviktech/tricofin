import { FetchCompanyInfoRequest } from "../utils/api";

export const FETCH_COMPANY_INFO_SUCCESS = "FETCH_COMPANY_INFO_SUCCESS";
export const POST_COMPANY_INFO_SUCCESS = "POST_COMPANY_INFO_SUCCESS";
export const LOADING_CONTENT = "LOADING_CONTENT";
export const LOADING_ERROR = "LOADING_ERROR";

export const companyInfoSuccessFetch = (data) => ({
  type: FETCH_COMPANY_INFO_SUCCESS,
  payload: data,
});

export const companyInfoSuccessPost = (data) => ({
  type: POST_COMPANY_INFO_SUCCESS,
  payload: data,
});

export const fetchCompanyInfo = () => async (dispatch) => {
  const method = "get";
  const path = "api/System/GetRoles";
  try {
    dispatch({ type: LOADING_CONTENT });
    const response = await FetchCompanyInfoRequest(method, path);
    dispatch(companyInfoSuccessFetch(response.data));
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};
