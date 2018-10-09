import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { select } from 'redux-saga/effects';

import root, { loginUserSaga, logoutUserSaga, cleanErrorLoginSaga } from '../../../src/stores/auth/sagas';
import {
  authenticateUserSuccess,
  authenticateUserError,
  loadingUserData,
  logoutUserSuccess,
  cleanErrorLoginSuccess,
  handleExceptionUserError,
} from '../../../src/stores/auth/actions';

import { login, logout } from '../../../src/services/auth';
import { getToken } from '../../../src/selectors/authSelector';

describe('Auth', () => {
  it('should have the expected watchers', done => {
    expectSaga(root)
      .run({ silenceTimeout: true })
      .then(saga => {
        expect(saga).toMatchSnapshot();
        done();
      })
  });

  it('should fetch authenticate successfully', () => {
    const data = {
      token: {
        token: '123123123123',
        refresh_token: '123123123123123',
        expired_at: '123123123',
      }
    };
    return expectSaga(loginUserSaga, {payload: {email:'test', password: 'test'}})
      .provide([
        [matchers.call.fn(login), data],
      ])
      .dispatch(loadingUserData({ isLoading: true }))
      .put(authenticateUserSuccess({
        isAuthenticated: true,
        token: "123123123123",
        refreshToken: "123123123123123",
        expiredAt: "123123123",
        error: "",
      }))
      .dispatch(loadingUserData({ isLoading: false }))
      .run();
  });

  it('should fetch authenticate failure', () => {
    const errorData = {
      error_code: 602,
      message: 'authentication error',
    };
    return expectSaga(loginUserSaga, {payload: {email:'test', password: 'test'}})
      .provide([
        [matchers.call.fn(login), errorData],
      ])
      .dispatch(loadingUserData({ isLoading: true }))
      .put(authenticateUserError({error: '602'}))
      .dispatch(loadingUserData({ isLoading: false }))
      .run();
  });

  it('should fetch authenticate Error Saga', () => {
    const error = new Error('something went wrong');

    return expectSaga(loginUserSaga)
      .provide([
        [matchers.call.fn(login), throwError(error)],
      ])
      .dispatch(loadingUserData({ isLoading: true }))
      .put(handleExceptionUserError({error: 'something went wrong'}))
      .dispatch(loadingUserData({ isLoading: false }))
      .run();
  });

  it('should logout user', () => {
    return expectSaga(logoutUserSaga)
      .provide([
        [select(getToken), '123123123123'],
        [matchers.call.fn(logout)],
      ])
      .dispatch(loadingUserData({ isLoading: true }))
      .put(logoutUserSuccess({
        isAuthenticated: false,
        refresh_token: '',
        token: '',
        expired_at: '',
        isLoading: false,
        error: '',
      }))
      .dispatch(loadingUserData({ isLoading: false }))
      .run();
  });

  it('should logout user failure', () => {
    const error = new Error('something went wrong');

    return expectSaga(logoutUserSaga)
      .provide([
        [matchers.call.fn(logout), throwError(error)],
      ])
      .dispatch(loadingUserData({ isLoading: true }))
      .put(handleExceptionUserError({error: 'something went wrong'}))
      .dispatch(loadingUserData({ isLoading: false }))
      .run();
  });

  it('should clean error login successfully', () => {
    return expectSaga(cleanErrorLoginSaga)
      .dispatch(loadingUserData({ isLoading: true }))
      .put(cleanErrorLoginSuccess({ error: '' }))
      .dispatch(loadingUserData({ isLoading: false }))
      .run();
  });
});
