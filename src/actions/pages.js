import {
  PostIdentificationSuccessRequest,
  GetIdentificationSuccessRequest,
  PostContactSuccessRequest,
  FetchCountriesDataRequest,
  DeleteIdentificationSuccessRequest,
  UpdateContactSuccessRequest,
  SaveCustomerDirector,
  GetCustomerDirector,
} from '../utils/api';

export const POST_IDENTIFICATION_SUCCESS = 'POST_IDENTIFICATION_SUCCESS';
export const SAVE_DIRECTOR_SUCCESS = 'SAVE_DIRECTOR_SUCCESS';
export const FETCH_COUNTRIES_SUCCESS = 'FETCH_COUNTRIES_SUCCESS';
export const POST_CONTACT_SUCCESS = 'POST_CONTACT_SUCCESS';
export const LOADING_CONTENT = 'LOADING_CONTENT';
export const LOADING_ERROR = 'LOADING_ERROR';

export const individualCustomerIdentification = data => ({
  type: POST_IDENTIFICATION_SUCCESS,
  payload: data,
});

export const individualCustomerContact = data => ({
  type: POST_CONTACT_SUCCESS,
  payload: data,
});

export const fetchDirectorSuccess = data => ({
  type: SAVE_DIRECTOR_SUCCESS,
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
    const result = `${error.message} 5055`;
    dispatch({ type: LOADING_ERROR, payload: result });
  }
};

export const deletCustomerIdentification = (idType, cudId) => async dispatch => {
  const method = 'delete';
  const path = `/api/Customers/DeleteCustomerIdentification/${cudId}/${idType}`;
  try {
    dispatch({ type: LOADING_CONTENT });
    const response = await DeleteIdentificationSuccessRequest(method, path);
    dispatch(individualCustomerIdentification(response.data));
  } catch (error) {
    const result = `${error.message} 5055`;
    dispatch({ type: LOADING_ERROR, payload: result });
  }
};

export const getCustomerIdentification = id => async dispatch => {
  const method = 'get';
  const path = `/api/Customers/GetCustomerIdentifications/${id}`;
  try {
    const response = await GetIdentificationSuccessRequest(method, path);
    dispatch(individualCustomerIdentification(response.data));
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};

export const postCustomerContact = data => async dispatch => {
  const method = 'post';
  const path = '/api/Customers/SaveContactInformation';
  try {
    dispatch({ type: LOADING_CONTENT });
    const response = await PostContactSuccessRequest(method, path, data);
    dispatch(individualCustomerContact(response.data));
  } catch (error) {
    const result = `${error.message} 5050`;
    dispatch({ type: LOADING_ERROR, payload: result });
  }
};

export const updateCustomerContact = data => async dispatch => {
  const method = 'put';
  const path = '/api/Customers/UpdateContactInformation';
  try {
    dispatch({ type: LOADING_CONTENT });
    const response = await UpdateContactSuccessRequest(method, path, data);
    dispatch(individualCustomerContact(response.data));
  } catch (error) {
    const result = `${error.message} 5050`;
    dispatch({ type: LOADING_ERROR, payload: result });
  }
};

export const fetchCountriesData = () => async dispatch => {
  const method = 'get';
  const path = '/api/StaticData/GetCountries';
  try {
    const response = await FetchCountriesDataRequest(method, path);
    dispatch({ type: FETCH_COUNTRIES_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};

export const saveCustomerDirector = data => async dispatch => {
  const method = 'post';
  const path = '/api/Customers/SaveNonIndividualCustomerDirector';
  try {
    const response = await SaveCustomerDirector(method, path, data);
    dispatch(fetchDirectorSuccess(response.data));
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};

export const getCustomerDirector = CustId => async dispatch => {
  const method = 'get';
  const path = `/api/Customers/GetNonIndividualCustomerDirectors/${CustId}`;
  try {
    const response = await GetCustomerDirector(method, path);
    dispatch(fetchDirectorSuccess(response.data));
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};
