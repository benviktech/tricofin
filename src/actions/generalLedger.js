import {
  GetGeneralLedgerSubTypes, PostGeneralLedgerSubTypes,
  UpdateGeneralLedgerSubType, SaveGeneralLedgerID,
  GetGeneralLedgerID, UpdateGeneralLedgerID,
  SaveGeneralLedger, GetGeneralLedgerRequest,
  UpdateGeneralLedgerRequest, VerifyGeneralLedgers,
  CopySingleGltoAccounts, CopyMultipleGlsToBranch,
  CloseGLAccountRequest, UpdateGLParametersRequest,
  FetchGLParametersRequest, SaveTransactionRequest,
  FetchTransactionRequest, TransferTransactionRequest,
  SaveTransactionCodeRequest,
} from '../utils/api';

export const FETCH_GENERAL_LEDGER = 'FETCH_GENERAL_LEDGER';
export const LOADING_CONTENT = 'LOADING_CONTENT';
export const LOADING_ERROR = 'LOADING_ERROR';
export const FETCH_SINGLE_GENERAL_LEDGER = 'FETCH_SINGLE_GENERAL_LEDGER';
export const FETCH_SINGLE_GENERAL_LEDGER_UPDATE = 'FETCH_SINGLE_GENERAL_LEDGER_UPDATE';
export const POST_GENERAL_LEDGER_ID = 'POST_GENERAL_LEDGER_ID';
export const FETCH_SINGLE_GENERAL_LEDGER_DETAILS = 'FETCH_SINGLE_GENERAL_LEDGER_DETAILS';
export const COPY_SINGLE_ACCOUNT_TO_BRANCHES = 'COPY_SINGLE_ACCOUNT_TO_BRANCHES';
export const COPY_MULTIPLE_ACCOUNTS_TO_BRANCH = 'COPY_MULTIPLE_ACCOUNTS_TO_BRANCH';
export const UPDATE_GL_PARAMETERS = 'UPDATE_GL_PARAMETERS';
export const FETCH_GL_PARAMETERS = 'FETCH_GL_PARAMETERS';
export const CASH_TRANSACTION = 'CASH_TRANSACTION';
export const CASH_TRANSACTION_LIST = 'CASH_TRANSACTION_LIST';
export const TRANSFER_TRANSACTION = 'TRANSFER_TRANSACTION';

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

export const singleGeneralLedger = data => ({
  type: FETCH_SINGLE_GENERAL_LEDGER_DETAILS,
  payload: data,
});

export const newSingleGLList = data => ({
  type: COPY_SINGLE_ACCOUNT_TO_BRANCHES,
  payload: data,
});

export const newMultipleGLList = data => ({
  type: COPY_MULTIPLE_ACCOUNTS_TO_BRANCH,
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
    glName: (values.name).toUpperCase(),
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

export const saveGeneralLedger = (data, history) => async dispatch => {
  const path = 'api/Finance/SaveGeneralLedger';
  const method = 'post';
  const values = {
    accountID: `${data.branch}${data.glid}`,
    branchID: data.branch,
    accountName: (data.glName).toUpperCase(),
    accountSeq: '',
    glid: data.glid,
    prevBalance: 0,
    balance: 0,
    shadowBalance: 0,
    unSupervisedCredit: 0,
    unSupervisedDebit: 0,
    creditTurnOver: 0,
    debitTurnOver: 0,
    lastCrTranDate: (new Date()).toISOString(),
    lastCrTranAmt: 0,
    lastDrTranDate: (new Date()).toISOString(),
    lastDrTranAmt: 0,
    isVerified: false,
    verifiedOn: null,
    verifiedBy: '',
    isDeleted: false,
    createdOn: (new Date()).toISOString(),
    createdBy: 'BENVIK',
    modifiedOn: (new Date()).toISOString(),
    modifiedBy: 'BENVIK',
    prevEOYPLBal: 0,
    closedOn: null,
    closedBy: '',
  };
  try {
    dispatch({ type: LOADING_CONTENT });
    const response = await SaveGeneralLedger(method, path, values);
    history.push(`/generaledgermaintenance/${response.data.accountID}`);
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};

export const GetGeneralLedger = accountID => async dispatch => {
  const method = 'get';
  const path = `/api/Finance/GetGeneralLedger/${accountID}`;
  try {
    const response = await GetGeneralLedgerRequest(method, path);
    dispatch(singleGeneralLedger(response.data));
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};

export const UpdateGeneralLedger = data => async dispatch => {
  const method = 'put';
  const path = '/api/Finance/UpdateGeneralLedger';
  try {
    const response = await UpdateGeneralLedgerRequest(method, path, data);
    dispatch(singleGeneralLedger(response.data));
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};

export const verifyGLs = data => async dispatch => {
  const method = 'put';
  const path = '/api/Finance/VerifyGeneralLegders/ILUMU';
  try {
    await VerifyGeneralLedgers(method, path, data);
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};

export const copySingleGl = (idsArray, currentGL) => async dispatch => {
  const method = 'post';
  const path = `/api/Finance/ReplicateGlToBranches/${currentGL}/ILUMU`;
  try {
    const response = await CopySingleGltoAccounts(method, path, idsArray);
    dispatch(newSingleGLList(response.data));
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};

export const copyMultipleGLs = (glList, branchId) => async dispatch => {
  const method = 'post';
  const path = `/api/Finance/ReplicateGlsToBranch/${branchId.branch}/ILUMU`;
  try {
    const response = await CopyMultipleGlsToBranch(method, path, glList);
    dispatch(newMultipleGLList(response?.data));
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};

export const closeGeneralLedgerAccount = (id, history) => async dispatch => {
  const method = 'put';
  const path = `/api/Finance/CloseGeneralLedger/${id}/ILUMU`;
  try {
    await CloseGLAccountRequest(method, path);
    history.push('/generaledgermaintenance');
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};

export const updateGLParameters = data => async dispatch => {
  const method = 'put';
  const path = '/api/Finance/UpdateGeneralLedgerParameters';
  try {
    const response = await UpdateGLParametersRequest(method, path, data);
    dispatch({ type: UPDATE_GL_PARAMETERS, payload: response?.data });
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};

export const fetchGLParameters = () => async dispatch => {
  const method = 'get';
  const path = '/api/Finance/GetGeneralLedgerParameters';
  try {
    const response = await FetchGLParametersRequest(method, path);
    dispatch({ type: FETCH_GL_PARAMETERS, payload: response?.data });
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};

export const saveTransactions = userAccount => async dispatch => {
  const method = 'post';
  const path = '/api/Finance/SaveCashTransaction/ILUMU/000';
  const result = [];
  result.push(userAccount);
  try {
    const response = await SaveTransactionRequest(method, path, result);
    dispatch({ type: CASH_TRANSACTION, payload: response?.data });
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};

export const fectchDailyTransactions = () => async dispatch => {
  const method = 'get';
  const path = '/api/Finance/GetDailyTransactions';
  try {
    const response = await FetchTransactionRequest(method, path);
    dispatch({ type: CASH_TRANSACTION_LIST, payload: response?.data });
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};

export const transferTransaction = data => async dispatch => {
  const method = 'post';
  const path = '/api/Finance/SaveTransferTransaction/ILUMU/000';
  try {
    const response = await TransferTransactionRequest(method, path, data);
    dispatch({ type: TRANSFER_TRANSACTION, payload: response?.data });
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};

export const postTransactionCode = result => async dispatch => {
  const method = 'post';
  const path = '/api/Finance/SaveTransactionCode';
  const data = {
    ...result,
    createdOn: '2021-10-31T13:28:23.634Z',
    createdBy: 'BENVIK',
    modifiedOn: '2021-10-31T13:28:23.634Z',
    modifiedBy: 'BENVIK',
  };
  try {
    const response = await SaveTransactionCodeRequest(method, path, data);
    console.log(response?.data, 'response');
  } catch (error) {
    dispatch({ type: LOADING_ERROR, payload: error.message });
  }
};
