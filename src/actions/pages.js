import {
  PostIdentificationSuccessRequest,
  GetIdentificationSuccessRequest,
  PostContactSuccessRequest,
} from '../utils/api';

export const POST_IDENTIFICATION_SUCCESS = 'POST_IDENTIFICATION_SUCCESS';
export const LOADING_CONTENT = 'LOADING_CONTENT';
export const LOADING_ERROR = 'LOADING_ERROR';

export const individualCustomerIdentification = data => ({
  type: POST_IDENTIFICATION_SUCCESS,
  payload: data,
});

export const postCustomerIdentification = data => async dispatch => {
  const method = 'post';
  const path = '/api/Customers/SaveCustomerIdentification';
  try {
    dispatch({ type: LOADING_CONTENT });
    const response = await PostIdentificationSuccessRequest(method, path, data);
    dispatch(individualCustomerIdentification(response.data));
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};

export const getCustomerIdentification = id => async dispatch => {
  const method = 'get';
  const path = `/api/Customers/GetCustomerIdentifications/${id}`;
  try {
    const response = await GetIdentificationSuccessRequest(method, path);
    dispatch(individualCustomerIdentification(response.data));
  } catch (error) {
    console.log(error.message);
  }
};

export const postCustomerContact = data => async dispatch => {
  const method = 'post';
  const path = '/api/Customers/SaveContactInformation';
  console.log(data, 'before submission');
  try {
    dispatch({ type: LOADING_CONTENT });
    const response = await PostContactSuccessRequest(method, path, data);
    console.log(response.data, 'after submission');
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};
