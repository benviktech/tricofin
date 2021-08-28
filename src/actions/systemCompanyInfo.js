/* eslint-disable no-unused-vars */

import { toast } from 'react-toastify';
import {
  FetchCompanyInfoRequest,
  UpdateCompanyInfoRequest,
} from '../utils/api';

export const FETCH_COMPANY_INFO_SUCCESS = 'FETCH_COMPANY_INFO_SUCCESS';
export const POST_COMPANY_INFO_SUCCESS = 'POST_COMPANY_INFO_SUCCESS';
export const LOADING_CONTENT = 'LOADING_CONTENT';
export const LOADING_ERROR = 'LOADING_ERROR';

export const companyInfoSuccessFetch = data => ({
  type: FETCH_COMPANY_INFO_SUCCESS,
  payload: data,
});

export const companyInfoSuccessPost = data => ({
  type: POST_COMPANY_INFO_SUCCESS,
  payload: data,
});

export const fetchCompanyInfo = () => async dispatch => {
  const method = 'get';
  const path = '/api/System/GetSystemSettings';
  try {
    dispatch({ type: LOADING_CONTENT });
    const response = await FetchCompanyInfoRequest(method, path);
    dispatch(companyInfoSuccessFetch(response.data));
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};

export const updateCompanyInfo = data => async dispatch => {
  const method = 'put';
  const path = 'api/System/UpdateSystemSettings';
  const result = {
    companyID: data.companyID,
    companyName: data.companyName,
    pAddress: data.pAddress,
    boxAddress: data.boxAddress,
    email: data.email,
    phone: data.phone,
    website: data.website,
    pswdHistory: parseInt(data.pswdHistory, 10),
    pswdAge: parseInt(data.pswdAge, 10),
    pswdLength: parseInt(data.pswdLength, 10),
    lockSysPeriod: parseInt(data.lockSysPeriod, 10),
    availableBalance: data.availableBalance,
    totalBalance: data.availableBalance,
    createdOn: data.createdOn,
    createdBy: data.createdBy,
    modifiedOn: data.modifiedOn,
    modifiedBy: data.modifiedBy,
  };

  try {
    dispatch({ type: LOADING_CONTENT });
    const response = await UpdateCompanyInfoRequest(method, result, path);
    toast.success(`Company ${data.companyID}'s Info Edited Successfully`);
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
    toast.error(`Editing Company  ${data.userName}'s info Failed`);
  }
};
