import {
  GetGeneralLedgerSubTypes,
  PostGeneralLedgerSubTypes,
  UpdateGeneralLedgerSubType,
} from '../utils/api';

export const FETCH_GENERAL_LEDGER = 'FETCH_GENERAL_LEDGER';
export const LOADING_CONTENT = 'LOADING_CONTENT';
export const LOADING_ERROR = 'LOADING_ERROR';
export const FETCH_SINGLE_GENERAL_LEDGER = 'FETCH_SINGLE_GENERAL_LEDGER';
export const FETCH_SINGLE_GENERAL_LEDGER_UPDATE = 'FETCH_SINGLE_GENERAL_LEDGER_UPDATE';

export const fetchGeneralLedgerSubTypes = data => ({
  type: FETCH_GENERAL_LEDGER,
  payload: data,
});

export const singleGeneralLedgerSubTypes = data => ({
  type: FETCH_SINGLE_GENERAL_LEDGER,
  payload: data,
});

export const changeGeneralLedgerSubTypes = data => ({
  type: FETCH_SINGLE_GENERAL_LEDGER_UPDATE,
  payload: data,
});

export const getGeneralLedgerSubTypes = () => async dispatch => {
  const path = 'api/Finance/GetGeneralLedgerSubTypes';
  const method = 'get';
  try {
    dispatch({ type: LOADING_CONTENT });
    const response = await GetGeneralLedgerSubTypes(method, path);
    dispatch(fetchGeneralLedgerSubTypes(response.data));
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};

export const postGeneralLedgerSubTypes = data => async dispatch => {
  const path = '/api/Finance/SaveGeneralLedgerSubType';
  const method = 'post';
  const values = {
    glSubType: data.description,
    glTypeID: data.subtype,
    createdOn: '2021-07-24T20:16:20.638Z',
    createdBy: 'BENVIK',
    modifiedOn: '2021-07-24T20:16:20.638Z',
    modifiedBy: 'BENVIK',
  };
  try {
    dispatch({ type: LOADING_CONTENT });
    const response = await PostGeneralLedgerSubTypes(method, path, values);
    dispatch(singleGeneralLedgerSubTypes(response.data));
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};

export const updateGeneralLedgerSubType = data => async dispatch => {
  const path = '/api/Finance/UpdateGeneralLedgerSubType';
  const method = 'put';
  try {
    dispatch({ type: LOADING_CONTENT });
    const response = await UpdateGeneralLedgerSubType(method, path, data);
    console.log(response.data, 'updated data');
    dispatch(changeGeneralLedgerSubTypes(response.data));
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};
