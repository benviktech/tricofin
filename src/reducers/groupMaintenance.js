import {
  POST_GROUP_MAINTENANCE_SUCCESS,
  LOADING_CONTENT,
  LOADING_ERROR,
} from '../actions/groupMaintenance';

const initialState = {
  error: '',
  loading: false,
  groupMaintenance: {},
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
    default:
      return state;
  }
};

export default groupMaintenanceReducer;
