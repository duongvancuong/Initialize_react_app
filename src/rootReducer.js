import { combineReducers } from 'redux';
import auth from './stores/auth/reducer';

const rootReducer = {
  auth,
};

export const createReducer = asyncReducers => combineReducers({ ...rootReducer, ...asyncReducers });

export default combineReducers(rootReducer);
