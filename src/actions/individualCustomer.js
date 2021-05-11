import {
  FetchIndividualCustomersRequest,
  PostIndividualCustomersRequest,
  GetIndividualCustomersRequest,
  UpdateIndividualCustomersRequest,
} from '../utils/api';

export const FETCH_INDIVIDUAL_CUSTOMER_SUCCESS = 'FETCH_INDIVIDUAL_CUSTOMER_SUCCESS';
export const POST_INDIVIDUAL_CUSTOMER_SUCCESS = 'POST_INDIVIDUAL_CUSTOMER_SUCCESS';
export const GET_INDIVIDUAL_CUSTOMER_SUCCESS = 'GET_INDIVIDUAL_CUSTOMER_SUCCESS';
export const LOADING_CONTENT = 'LOADING_CONTENT';
export const LOADING_ERROR = 'LOADING_ERROR';

export const individualCustomersSuccessFetch = data => ({
  type: FETCH_INDIVIDUAL_CUSTOMER_SUCCESS,
  payload: data,
});

export const individualCustomersSuccessPost = data => ({
  type: POST_INDIVIDUAL_CUSTOMER_SUCCESS,
  payload: data,
});

export const individualCustomersSuccessGet = data => ({
  type: GET_INDIVIDUAL_CUSTOMER_SUCCESS,
  payload: data,
});

export const fetchIndividualCustomers = () => async dispatch => {
  const method = 'get';
  const path = '/api/Customers/GetIndividualCustomers';
  try {
    dispatch({ type: LOADING_CONTENT });
    const response = await FetchIndividualCustomersRequest(method, path);
    dispatch(individualCustomersSuccessFetch(response.data));
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};

export const postIndividualCustomers = (values, history) => async dispatch => {
  const data = {
    title: values.title,
    surName: values.surName.toUpperCase(),
    foreName1: values.foreName1.toUpperCase(),
    foreName2: values.foreName2,
    foreName3: values.foreName3,
    dateofbirth: values.dateofbirth,
    genderID: values.genderID,
    nationalityID: values.nationalityID.split('')[0],
    rAddress: values.rAddress.toUpperCase(),
    maritalStatusID: parseInt(values.maritalStatusID, 10),
    custTypeID: values.custTypeID,
    riskProfileID: values.riskProfileID,
    phone1: values.phone1,
    phone2: values.phone2,
    phone3: values.phone3,
    emailID1: values.emailID1,
    emailID2: values.emailID2,
    createdOn: (new Date()).toISOString(),
    createdBy: 'BENVIK',
    modifiedOn: (new Date()).toISOString(),
    modifiedBy: 'BENVIK',
  };

  const method = 'post';
  const path = '/api/Customers/SaveIndividualCustomer';
  try {
    dispatch({ type: LOADING_CONTENT });
    const response = await PostIndividualCustomersRequest(method, data, path);
    dispatch(individualCustomersSuccessPost(response.data));
    history.push(`/viewindividualcustomerform/${response.data.custID}`);
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};

export const fetchSingleIndividualCustomer = CustId => async dispatch => {
  console.log('inside individual customer');
  const method = 'get';
  const path = `/api/Customers/GetIndividualCustomer/${CustId}`;
  try {
    const response = await GetIndividualCustomersRequest(method, path);
    console.log(response.data, 'created user information');
    dispatch(individualCustomersSuccessGet(response.data));
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};

export const updateIndividualCustomer = (data, history) => async dispatch => {
  const method = 'put';
  const path = '/api/Customers/UpdateIndividualCustomer';
  const result = {
    custID: data.custID,
    title: data.title,
    surName: data.surName,
    foreName1: data.foreName1,
    foreName2: data.foreName2,
    foreName3: data.foreName3,
    dateofbirth: data.dateofbirth,
    genderID: data.genderID,
    nationalityID: data.nationalityID.split('')[0],
    rAddress: data.rAddress,
    maritalStatusID: parseInt(data.maritalStatusID, 10),
    custTypeID: data.custTypeID,
    riskProfileID: data.riskProfileID,
    phone1: data.phone1,
    phone2: data.phone2,
    phone3: data.phone3,
    emailID1: data.emailID1,
    emailID2: data.emailID2,
    createdOn: data.createdOn,
    createdBy: data.createdBy,
    modifiedOn: data.modifiedOn,
    modifiedBy: data.modifiedBy,
  };

  try {
    dispatch({ type: LOADING_CONTENT });
    const response = await UpdateIndividualCustomersRequest(method, result, path);
    history.push(`/viewindividualcustomerform/${response.data.custID}`);
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};
