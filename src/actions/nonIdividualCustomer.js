import {
  PostNonIndividualCustomersRequest,
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
    bizName: data.bizName,
    tradingName: data.tradingName,
    econID: parseInt(data.econID, 10),
    indSecID: parseInt(data.indSecID, 10),
    bizTypeID: parseInt(data.bizTypeID, 10),
    regDate: data.regDate,
    activityDescription: data.activityDescription,
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
    console.log(history, 'history information');
    console.log(response.data, 'history information');
    // history.push(`/viewindividualcustomerform/${response.data.custID}`);
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};
