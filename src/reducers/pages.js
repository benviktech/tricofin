import {
  POST_IDENTIFICATION_SUCCESS,
  LOADING_ERROR,
  POST_CONTACT_SUCCESS,
} from '../actions/pages';

const initialState = {
  indentifications: [],
  error: '',
  loading: false,
  contact: {},
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
    case LOADING_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default individualCustomerIdentification;
