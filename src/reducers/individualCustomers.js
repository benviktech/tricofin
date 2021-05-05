import {
  GET_INDIVIDUAL_CUSTOMER_SUCCESS,
  LOADING_CONTENT,
  LOADING_ERROR,
} from '../actions/individualCustomer';

const initialState = {
  individualCustomer: {},
  error: '',
  loading: false,
};

const individualCustomersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INDIVIDUAL_CUSTOMER_SUCCESS:
      return {
        ...state,
        individualCustomers: action.payload,
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

export default individualCustomersReducer;
