import { expectSaga } from 'redux-saga-test-plan';

import root, { loginUserSaga, logoutUserSaga, cleanErrorLoginSaga } from '../../../src/stores/auth/sagas';
import {
  authenticateUser,
  authenticateUserSuccess,
  authenticateUserError,
  loadingUserData,
  logoutUser,
  logoutUserSuccess,
  cleanErrorLogin,
  cleanErrorLoginSuccess,
  handleExceptionUserError,
} from '../../../src/stores/auth/actions';

jest.mock('services/api', () => ({
  UnauthenticatedRequest: () => ({ auth: [] }),
}));

describe('Auth', () => {
  it('should have the expected watchers', done => {
    expectSaga(root)
      .run({ silenceTimeout: true })
      .then(saga => {
        expect(saga).toMatchSnapshot();
        done();
      })
  });

  it('should match the login user', () =>
    expectSaga(loginUserSaga, { payload: {email: 'test@gmail.com', password: 'test'} })
      .put(loadingUserData({ isLoading: true }))
      .put(authenticateUserSuccess({
        error: "",
        expiredAt: "123123123",
        isAuthenticated: true,
        isLoading: false,
        refreshToken: "123123123ASFCXD",
        token: "123123123ASFCXD",
      }))
      .put(loadingUserData({ isLoading: false }))
      .run()
  );
})
