import { combineReducers } from 'redux';
import auth from './stores/auth/reducer';

const rootReducer = {
  auth,
};

export default combineReducers(rootReducer);
