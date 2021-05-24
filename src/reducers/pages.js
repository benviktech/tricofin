import { POST_IDENTIFICATION_SUCCESS, LOADING_ERROR } from '../actions/pages';

const initialState = {
  indentifications: [],
  error: '',
  loading: false,
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
