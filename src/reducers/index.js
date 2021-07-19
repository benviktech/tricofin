import { combineReducers } from 'redux';
import individualCustomersReducer from './individualCustomers';
import staticDataReducer from './staticData';
import individualCustomerIdentification from './pages';
import nonIndividualCustomersReducer from './nonIndividualCustomer';
import groupMaintenanceReducer from './groupMaintenance';

const rootReducer = combineReducers({
  individualCustomersReducer,
  staticDataReducer,
  individualCustomerIdentification,
  nonIndividualCustomersReducer,
  groupMaintenanceReducer,
});

export default rootReducer;
