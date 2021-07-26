/* eslint-disable no-param-reassign */
import {
  FETCH_GENERAL_LEDGER,
  LOADING_CONTENT,
  LOADING_ERROR,
  FETCH_SINGLE_GENERAL_LEDGER,
  FETCH_SINGLE_GENERAL_LEDGER_UPDATE,
} from '../actions/generalLedger';

const initialState = {
  error: '',
  loading: false,
  subTypeList: [],
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
    case FETCH_SINGLE_GENERAL_LEDGER:
      return {
        ...state,
        error: '',
        loading: false,
        subTypeList: [...state.subTypeList, action.payload],
      };
    case FETCH_SINGLE_GENERAL_LEDGER_UPDATE:
      return {
        ...state,
        error: '',
        loading: false,
        subTypeList: state.subTypeList.map(
          content => (content.glSubTypeID === action.payload.glSubTypeID
            // ? { ...content, glSubType: action.payload.glSubType } : content),
            ? action.payload : content),
        ),
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
