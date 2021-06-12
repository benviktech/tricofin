import {
  CREATE_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  LOADING_CONTENT,
  LOADING_ERROR,
  RESET_USER_ALERT,
  DELETE_USER_SUCCESS,
} from "../actions/systemUser";

const initialState = {
  systemUser: {},
  error: "",
  loading: true,
  userCreated: false,
  userUpdated: false,
  userDeleted: false,
  deletedUser: "",
};

const systemUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        systemUser: action.payload,
        error: "",
        loading: false,
        userCreated: true,
        userUpdated: false,
        userDeleted: false,
        deletedUser: "",
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        systemUser: action.payload,
        error: "",
        loading: false,
        userCreated: false,
        userUpdated: true,
        userDeleted: false,
        deletedUser: "",
      };
    case LOADING_CONTENT:
      return {
        ...state,
        loading: true,
        error: "",
        userCreated: false,
        userUpdated: false,
        userDeleted: false,
        deletedUser: "",
      };
    case LOADING_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        userCreated: false,
        userUpdated: false,
        userDeleted: false,
        deletedUser: "",
      };
    case RESET_USER_ALERT:
      return {
        ...state,
        loading: false,
        error: action.payload,
        userCreated: false,
        userUpdated: false,
        userDeleted: false,
        deletedUser: "",
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: action.payload,
        userCreated: false,
        userUpdated: false,
        userDeleted: false,
        deletedUser: action.payload,
      };
    default:
      return state;
  }
};

export default systemUserReducer;
