import {
  FETCH_COMPANY_INFO_SUCCESS,
  LOADING_CONTENT,
  LOADING_ERROR,
} from "../actions/systemCompanyInfo";

const initialState = {
  companyInfo: {},
  error: "",
  loading: false,
};

const companyInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMPANY_INFO_SUCCESS:
      return {
        ...state,
        companyInfo: action.payload,
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

export default companyInfoReducer;
