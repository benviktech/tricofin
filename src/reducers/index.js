import { combineReducers } from 'redux';
import individualCustomersReducer from './individualCustomers';
import staticDataReducer from './staticData';
import individualCustomerIdentification from './pages';
import nonIndividualCustomersReducer from './nonIndividualCustomer';
import groupMaintenanceReducer from './groupMaintenance';
import companyInfoReducer from "./systemCompanyInfos";

const rootReducer = combineReducers({
  individualCustomersReducer,
  staticDataReducer,
  individualCustomerIdentification,
  nonIndividualCustomersReducer,
  groupMaintenanceReducer,
  companyInfoReducer,
});

export default rootReducer;
