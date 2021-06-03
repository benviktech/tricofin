import { combineReducers } from "redux";
import individualCustomersReducer from "./individualCustomers";
import staticDataReducer from "./staticData";
import companyInfoReducer from "./systemCompanyInfos";
import systemModuleReducer from "./systemRights";
import systemRoleReducer from "./systemRoles";
import systemUserReducer from "./systemUsers";

const rootReducer = combineReducers({
  individualCustomersReducer,
  staticDataReducer,
  companyInfoReducer,
  systemModuleReducer,
  systemRoleReducer,
  systemUserReducer,
});

export default rootReducer;
