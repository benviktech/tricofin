import {
  POST_IDENTIFICATION_SUCCESS,
  LOADING_ERROR,
  POST_CONTACT_SUCCESS,
  FETCH_COUNTRIES_SUCCESS,
} from '../actions/pages';

const initialState = {
  indentifications: [],
  error: '',
  loading: false,
  contact: {},
  countries: [],
};

const individualCustomerIdentification = (state = initialState, action) => {
  switch (action.type) {
    case POST_IDENTIFICATION_SUCCESS:
      return {
        ...state,
        indentifications: action.payload,
        error: '',
        loading: false,
      };
    case POST_CONTACT_SUCCESS:
      return {
        ...state,
        contact: action.payload,
        error: '',
      };
    case FETCH_COUNTRIES_SUCCESS:
      return {
        ...state,
        countries: action.payload,
        contact: {},
        error: '',
      };
    case LOADING_ERROR:
      return {
        ...state,
        error: action.payload,
        contact: {},
      };
    default:
      return state;
  }
};

export default individualCustomerIdentification;
