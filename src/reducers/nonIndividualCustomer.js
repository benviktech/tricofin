import {
  POST_NON_INDIVIDUAL_CUSTOMER_SUCCESS,
  LOADING_CONTENT,
  LOADING_ERROR,
} from '../actions/nonIdividualCustomer';

const initialState = {
  nonIndividualCustomer: {},
  error: '',
  loading: false,
};

const nonIndividualCustomersReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_NON_INDIVIDUAL_CUSTOMER_SUCCESS:
      return {
        ...state,
        nonIndividualCustomer: action.payload,
        error: '',
        loading: false,
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

export default nonIndividualCustomersReducer;
