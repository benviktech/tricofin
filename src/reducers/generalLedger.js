/* eslint-disable no-param-reassign */
import {
  FETCH_GENERAL_LEDGER,
  LOADING_CONTENT,
  LOADING_ERROR,
  FETCH_SINGLE_GENERAL_LEDGER,
  FETCH_SINGLE_GENERAL_LEDGER_UPDATE,
  POST_GENERAL_LEDGER_ID,
  FETCH_SINGLE_GENERAL_LEDGER_DETAILS,
  COPY_SINGLE_ACCOUNT_TO_BRANCHES,
  COPY_MULTIPLE_ACCOUNTS_TO_BRANCH,
} from '../actions/generalLedger';

const initialState = {
  error: '',
  loading: false,
  subTypeList: [],
  generalLedgerID: {},
  generalLedger: {},
  newCopiedList: [],
  newCopiedMultipleList: [],
};

const generalLedgerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GENERAL_LEDGER:
      return {
        ...state,
        subTypeList: action.payload,
        error: '',
        loading: false,
      };
    case POST_GENERAL_LEDGER_ID:
      return {
        ...state,
        generalLedgerID: action.payload,
        error: '',
        loading: false,
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
        ...state,
        error: '',
        loading: false,
        generalLedger: action.payload,
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
        ...state,
        error: '',
        loading: false,
        newCopiedList: action.payload,
      };
    case COPY_MULTIPLE_ACCOUNTS_TO_BRANCH:
      return {
        ...state,
        error: '',
        loading: false,
        newCopiedMultipleList: action.payload,
      };
    case LOADING_CONTENT:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case LOADING_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default generalLedgerReducer;
