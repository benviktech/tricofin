import { combineReducers } from "redux";
import individualCustomersReducer from "./individualCustomers";
import staticDataReducer from "./staticData";
import companyInfoReducer from "./systemCompanyInfos";

const rootReducer = combineReducers({
  individualCustomersReducer,
  staticDataReducer,
  companyInfoReducer,
});

export default rootReducer;
