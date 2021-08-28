import {
  POST_GROUP_MAINTENANCE_SUCCESS,
  LOADING_CONTENT,
  LOADING_ERROR,
  GROUP_MAINTENANCE_LIST,
} from '../actions/groupMaintenance';

const initialState = {
  error: '',
  loading: false,
  groupMaintenance: {},
  listOfMembers: [],
};

const groupMaintenanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_GROUP_MAINTENANCE_SUCCESS:
      return {
        ...state,
        groupMaintenance: action.payload,
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
    case GROUP_MAINTENANCE_LIST:
      return {
        ...state,
        loading: false,
        error: '',
        listOfMembers: action.payload,
      };
    default:
      return state;
  }
};

export default groupMaintenanceReducer;
