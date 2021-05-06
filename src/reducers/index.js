import { combineReducers } from 'redux';
import individualCustomersReducer from './individualCustomers';
import staticDataReducer from './staticData';

const rootReducer = combineReducers({
  individualCustomersReducer,
  staticDataReducer,
});

export default rootReducer;
