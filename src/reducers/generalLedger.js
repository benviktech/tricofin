/* eslint-disable no-param-reassign */
import {
  FETCH_GENERAL_LEDGER, LOADING_CONTENT, LOADING_ERROR,
  FETCH_SINGLE_GENERAL_LEDGER, FETCH_SINGLE_GENERAL_LEDGER_UPDATE, POST_GENERAL_LEDGER_ID,
  FETCH_SINGLE_GENERAL_LEDGER_DETAILS, COPY_SINGLE_ACCOUNT_TO_BRANCHES,
  FETCH_GL_PARAMETERS, UPDATE_GL_PARAMETERS, CASH_TRANSACTION, CASH_TRANSACTION_LIST,
  DELETE_FIXED_ASSETS_PRODUCT, FETCHED_FIXED_ASSETS_PRODUCT, COPY_MULTIPLE_ACCOUNTS_TO_BRANCH,
  FETCHED_FIXED_ASSET_LIST, DELETE_FIXED_ASSET, BATCH_TRANSACTIONS_LIST, SUCCESS_MESSAGE,
  CLEAR_ERROR,
} from '../actions/generalLedger';

const initialState = {
  error: '',
  loading: false,
  subTypeList: [],
  generalLedgerID: {},
  generalLedger: {},
  newCopiedList: [],
  newCopiedMultipleList: [],
  glParametersList: [],
  updatedGlParameter: {},
  cashTransactionList: [],
  fixedAssestPrdtsList: [],
  fixedAssetList: [],
  batchTransactionsList: [],
  successRequest: false,
};

const generalLedgerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GENERAL_LEDGER:
      return {
        ...state, subTypeList: action.payload, error: '', loading: false,
      };
    case DELETE_FIXED_ASSET:
      return {
        ...state,
        fixedAssetList: state.fixedAssetList.filter(
          element => element.accountID !== action.payload,
        ),
        error: '',
        loading: false,
      };
    case BATCH_TRANSACTIONS_LIST:
      return {
        ...state, batchTransactionsList: action.payload, error: '', loading: false,
      };
    case FETCHED_FIXED_ASSET_LIST:
      return {
        ...state, fixedAssetList: action.payload, error: '', loading: false,
      };
    case FETCHED_FIXED_ASSETS_PRODUCT:
      return {
        ...state, fixedAssestPrdtsList: action.payload, error: '', loading: false,
      };
    case DELETE_FIXED_ASSETS_PRODUCT:
      return {
        ...state,
        fixedAssestPrdtsList: state.fixedAssestPrdtsList.filter(
          element => element.productID !== action.payload,
        ),
        error: '',
        loading: false,
      };
    case CASH_TRANSACTION:
      return {
        ...state,
        cashTransactionList: [...state.cashTransactionList, action.payload[0]],
        error: '',
        loading: false,
        successRequest: true,
      };
    case CASH_TRANSACTION_LIST:
      return {
        ...state, cashTransactionList: action.payload, error: '', loading: false,
      };
    case POST_GENERAL_LEDGER_ID:
      return {
        ...state, generalLedgerID: action.payload, error: '', loading: false,
      };
    case FETCH_SINGLE_GENERAL_LEDGER:
      return {
        ...state,
        error: '',
        loading: false,
        subTypeList: [...state.subTypeList, action.payload],
      };
    case FETCH_SINGLE_GENERAL_LEDGER_DETAILS:
      return {
        ...state, error: '', loading: false, generalLedger: action.payload,
      };
    case FETCH_SINGLE_GENERAL_LEDGER_UPDATE:
      return {
        ...state,
        error: '',
        loading: false,
        subTypeList: state.subTypeList.map(
          content => (content.glSubTypeID === action.payload.glSubTypeID
            ? action.payload : content),
        ),
      };
    case COPY_SINGLE_ACCOUNT_TO_BRANCHES:
      return {
        ...state, error: '', loading: false, newCopiedList: action.payload,
      };
    case COPY_MULTIPLE_ACCOUNTS_TO_BRANCH:
      return {
        ...state, error: '', loading: false, newCopiedMultipleList: action.payload,
      };
    case LOADING_CONTENT:
      return { ...state, loading: true, error: '' };
    case LOADING_ERROR:
      return { ...state, loading: false, error: action.payload };
    case FETCH_GL_PARAMETERS:
      return { ...state, loading: false, glParametersList: action.payload };
    case UPDATE_GL_PARAMETERS:
      return {
        ...state,
        loading: false,
        updatedGlParameter: action.payload,
        glParametersList: state.glParametersList.map(
          content => (content.serialID === action.payload.serialID
            ? action.payload : content),
        ),
      };
    case SUCCESS_MESSAGE:
      return {
        ...state,
        loading: false,
        successRequest: true,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        loading: false,
        successRequest: false,
        error: '',
      };
    default:
      return state;
  }
};

export default generalLedgerReducer;
