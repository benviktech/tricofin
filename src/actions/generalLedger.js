import {
  GetGeneralLedgerSubTypes,
  PostGeneralLedgerSubTypes,
  UpdateGeneralLedgerSubType,
  SaveGeneralLedgerID,
  GetGeneralLedgerID,
  UpdateGeneralLedgerID,
} from '../utils/api';

export const FETCH_GENERAL_LEDGER = 'FETCH_GENERAL_LEDGER';
export const LOADING_CONTENT = 'LOADING_CONTENT';
export const LOADING_ERROR = 'LOADING_ERROR';
export const FETCH_SINGLE_GENERAL_LEDGER = 'FETCH_SINGLE_GENERAL_LEDGER';
export const FETCH_SINGLE_GENERAL_LEDGER_UPDATE = 'FETCH_SINGLE_GENERAL_LEDGER_UPDATE';
export const POST_GENERAL_LEDGER_ID = 'POST_GENERAL_LEDGER_ID';

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

export const postGeneralLedgerID = data => ({
  type: POST_GENERAL_LEDGER_ID,
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
    createdOn: (new Date()).toISOString(),
    createdBy: 'BENVIK',
    modifiedOn: (new Date()).toISOString(),
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
    dispatch(changeGeneralLedgerSubTypes(response.data));
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};

export const saveGeneralLedgerID = (values, history) => async dispatch => {
  const path = '/api/Finance/SaveGeneralLedgerID';
  const method = 'post';
  const data = {
    glName: values.name,
    glType: values.glMainType,
    glSubType: values.glSubType,
    createdOn: (new Date()).toISOString(),
    createdBy: 'BENVIK',
    modifiedOn: (new Date()).toISOString(),
    modifiedBy: 'BENVIK',
  };
  try {
    dispatch({ type: LOADING_CONTENT });
    const response = await SaveGeneralLedgerID(method, path, data);
    history.push(`/genlidentification/${response.data.glid}`);
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};

export const getGeneralLedgerID = id => async dispatch => {
  const path = `/api/Finance/GetGeneralLedgerID/${id}`;
  const method = 'get';
  try {
    dispatch({ type: LOADING_CONTENT });
    const response = await GetGeneralLedgerID(method, path);
    dispatch(postGeneralLedgerID(response.data));
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};

export const updateGeneralLedgerID = data => async dispatch => {
  const path = '/api/Finance/UpdateGeneralLedgerID';
  const method = 'put';
  try {
    dispatch({ type: LOADING_CONTENT });
    const response = await UpdateGeneralLedgerID(method, path, data);
    dispatch(postGeneralLedgerID(response?.data));
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};
