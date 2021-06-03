import {
  FETCH_MODULE_INFO_SUCCESS,
  LOADING_CONTENT,
  LOADING_ERROR,
} from "../actions/systemRight";

const initialState = {
  systemModules: [],
  error: "",
  loading: false,
};

const systemModuleReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MODULE_INFO_SUCCESS:
      return {
        ...state,
        systemModules: action.payload,
        error: "",
        loading: false,
      };
    case LOADING_CONTENT:
      return {
        ...state,
        loading: true,
        error: "",
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

export default systemModuleReducer;
