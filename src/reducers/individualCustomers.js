import {
  GET_INDIVIDUAL_CUSTOMER_SUCCESS,
  LOADING_CONTENT,
  LOADING_ERROR,
  FETCH_INDIVIDUAL_CUSTOMER_SUCCESS,
  FETCH_IMAGE_SUCCESS,
  FETCH_IMAGE_FAILURE,
} from '../actions/individualCustomer';

const initialState = {
  individualCustomer: {},
  error: '',
  loading: false,
  individualCustomers: [],
  imageInfo: {},
};

const individualCustomersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INDIVIDUAL_CUSTOMER_SUCCESS:
      return {
        ...state,
        individualCustomer: action.payload,
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
    case FETCH_INDIVIDUAL_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        individualCustomers: action.payload,
      };
    case FETCH_IMAGE_SUCCESS:
      return {
        ...state,
        imageInfo: action.payload,
      };
    case FETCH_IMAGE_FAILURE:
      return {
        ...state,
        imageInfo: {},
      };
    default:
      return state;
  }
};

export default individualCustomersReducer;
