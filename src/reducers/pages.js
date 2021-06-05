import {
  POST_IDENTIFICATION_SUCCESS,
  LOADING_ERROR,
  POST_CONTACT_SUCCESS,
  FETCH_COUNTRIES_SUCCESS,
  SAVE_DIRECTOR_SUCCESS,
} from '../actions/pages';

const initialState = {
  indentifications: [],
  error: '',
  loading: false,
  contact: {},
  countries: [],
  directors: [],
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
    case SAVE_DIRECTOR_SUCCESS:
      return {
        ...state,
        directors: action.payload,
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
