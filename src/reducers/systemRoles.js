import {
  FETCH_ROLE_INFO_SUCCESS,
  LOADING_CONTENT,
  LOADING_ERROR,
} from "../actions/systemRole";

const initialState = {
  systemRoles: [],
  error: "",
  loading: true,
};

const systemRoleReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ROLE_INFO_SUCCESS:
      return {
        ...state,
        systemRoles: action.payload,
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

export default systemRoleReducer;
