import { combineReducers } from 'redux';
import auth from './stores/auth/reducer';
import cryptocurrency from './stores/cryptocurrency/reducer';

const rootReducer = {
  auth,
  cryptocurrency,
};

export default combineReducers(rootReducer);
