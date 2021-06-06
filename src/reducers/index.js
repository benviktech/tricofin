import { combineReducers } from 'redux';
import individualCustomersReducer from './individualCustomers';
import staticDataReducer from './staticData';
import individualCustomerIdentification from './pages';
import nonIndividualCustomersReducer from './nonIndividualCustomer';

const rootReducer = combineReducers({
  individualCustomersReducer,
  staticDataReducer,
  individualCustomerIdentification,
  nonIndividualCustomersReducer,
});

export default rootReducer;
