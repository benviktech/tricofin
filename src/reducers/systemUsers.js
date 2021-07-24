import { LOADING_CONTENT, LOADING_ERROR } from "../actions/systemUser";

const initialState = {
  systemUser: {},
  error: "",
  loading: true,
};

const systemUserReducer = (state = initialState, action) => {
  switch (action.type) {
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

export default systemUserReducer;
