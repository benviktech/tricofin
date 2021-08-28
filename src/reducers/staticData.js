import { FETCH_STATIC_DATA } from '../actions/index';

const initialState = {
  staticData: [],
  error: '',
  loading: false,
};

const staticDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STATIC_DATA:
      return {
        ...state,
        staticData: action.payload,
        error: '',
        loading: false,
      };
    default:
      return state;
  }
};

export default staticDataReducer;
