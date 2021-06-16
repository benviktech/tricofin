import {
  CREATE_ROLE_SUCCESS,
  UPDATE_ROLE_SUCCESS,
  FETCH_ROLE_INFO_SUCCESS,
  LOADING_CONTENT,
  LOADING_ERROR,
  RESET_ROLE_ALERT,
  DELETE_ROLE_SUCCESS,
} from "../actions/systemRole";

const initialState = {
  systemRoles: [],
  error: "",
  loading: true,
  roleCreated: false,
  roleUpdated: false,
  roleDeleted: false,
  deletedRole: "",
};

const systemRoleReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ROLE_INFO_SUCCESS:
      return {
        ...state,
        systemRoles: action.payload,
        error: "",
        loading: false,
        roleCreated: false,
        roleUpdated: false,
        roleDeleted: false,
        deletedRole: "",
      };
    case LOADING_CONTENT:
      return {
        ...state,
        loading: true,
        error: "",
        roleCreated: false,
        roleUpdated: false,
        roleDeleted: false,
        deletedRole: "",
      };
    case LOADING_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        roleCreated: false,
        roleUpdated: false,
        roleDeleted: false,
        deletedRole: "",
      };
    case CREATE_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        roleCreated: true,
        roleUpdated: false,
        roleDeleted: false,
        deletedRole: "",
      };
    case UPDATE_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        roleCreated: false,
        roleUpdated: true,
        roleDeleted: false,
        deletedRole: "",
      };
    case DELETE_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        roleCreated: false,
        roleUpdated: false,
        roleDeleted: false,
        deletedRole: action.payload,
      };
    case RESET_ROLE_ALERT:
      return {
        ...state,
        loading: false,
        error: "",
        roleCreated: false,
        roleUpdated: false,
        roleDeleted: false,
        deletedRole: "",
      };
    default:
      return state;
  }
};

export default systemRoleReducer;
