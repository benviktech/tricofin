import { combineReducers } from 'redux';
import individualCustomersReducer from './individualCustomers';
import staticDataReducer from './staticData';
import individualCustomerIdentification from './pages';
import nonIndividualCustomersReducer from './nonIndividualCustomer';
import groupMaintenanceReducer from './groupMaintenance';
import companyInfoReducer from "./systemCompanyInfos";
import systemModuleReducer from "./systemRights";
import systemRoleReducer from "./systemRoles";
import systemUserReducer from "./systemUsers";

const rootReducer = combineReducers({
  individualCustomersReducer,
  staticDataReducer,
  individualCustomerIdentification,
  nonIndividualCustomersReducer,
  groupMaintenanceReducer,
  companyInfoReducer,
  systemModuleReducer,
  systemRoleReducer,
  systemUserReducer,
});

export default rootReducer;
