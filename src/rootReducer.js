import { combineReducers } from 'redux';
import author from './stores/home/reducer';
import auth from './stores/auth/reducer';

const rootReducer = {
  author,
  auth,
}

export const createReducer = asyncReducers => combineReducers({ ...rootReducer, ...asyncReducers })

export default combineReducers(rootReducer)
