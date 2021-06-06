import {
  PostNonIndividualCustomersRequest,
  GetNonIndividualCustomerRequest,
  UpdateNonIndividualCustomersRequest,
} from '../utils/api';

export const POST_NON_INDIVIDUAL_CUSTOMER_SUCCESS = 'POST_NON_INDIVIDUAL_CUSTOMER_SUCCESS';
export const LOADING_CONTENT = 'LOADING_CONTENT';
export const LOADING_ERROR = 'LOADING_ERROR';

export const nonIndividualCustomersSuccessFetch = data => ({
  type: POST_NON_INDIVIDUAL_CUSTOMER_SUCCESS,
  payload: data,
});

export const postNonIndividualCustomers = (data, history) => async dispatch => {
  const method = 'post';
  const path = '/api/Customers/SaveNonIndividualCustomer';

  const values = {
    bizName: (data.bizName).toUpperCase(),
    tradingName: (data.tradingName).toUpperCase(),
    econID: parseInt(data.econID, 10),
    indSecID: parseInt(data.indSecID, 10),
    bizTypeID: parseInt(data.bizTypeID, 10),
    regDate: data.regDate,
    activityDescription: (data.activityDescription).toUpperCase(),
    custTypeID: data.custTypeID,
    riskProfileID: data.riskProfileID,
    isDeleted: false,
    createdBy: 'BENVIK',
    createdOn: (new Date()).toISOString(),
    modifiedBy: 'BENVIK',
    modifiedOn: (new Date()).toISOString(),
  };

  try {
    dispatch({ type: LOADING_CONTENT });
    const response = await PostNonIndividualCustomersRequest(method, values, path);
    dispatch(nonIndividualCustomersSuccessFetch(response.data));
    history.push(`/viewnonindividualcustomerform/${response.data.custID}`);
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};

export const updateNonIndividualCustomer = (data, history, id) => async dispatch => {
  const method = 'put';
  const path = '/api/Customers/UpdateNonIndividualCustomer';
  const result = {
    custID: id,
    bizName: (data.bizName).toUpperCase(),
    tradingName: (data.tradingName).toUpperCase(),
    econID: parseInt(data.econID, 10),
    indSecID: parseInt(data.indSecID, 10),
    bizTypeID: parseInt(data.bizTypeID, 10),
    regDate: data.regDate,
    activityDescription: (data.activityDescription).toUpperCase(),
    custTypeID: data.custTypeID,
    riskProfileID: data.riskProfileID,
    isDeleted: false,
    createdBy: 'BENVIK',
    createdOn: (new Date()).toISOString(),
    modifiedBy: 'BENVIK',
    modifiedOn: (new Date()).toISOString(),
  };

  try {
    dispatch({ type: LOADING_CONTENT });
    const response = await UpdateNonIndividualCustomersRequest(method, result, path);
    history.push(`/viewnonindividualcustomerform/${response.data.custID}`);
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};

export const fetchSingleNonIndividualCustomer = CustId => async dispatch => {
  const method = 'get';
  const path = `/api/Customers/GetNonIndividualCustomer/${CustId}`;
  try {
    dispatch({ type: LOADING_CONTENT });
    const response = await GetNonIndividualCustomerRequest(method, path);
    dispatch(nonIndividualCustomersSuccessFetch(response.data));
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};
