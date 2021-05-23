import { POST_IDENTIFICATION_SUCCESS } from '../actions/pages';

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
    default:
      return state;
  }
};

export default individualCustomerIdentification;
