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

describe('Actions', () => {
  it('authenticateUser should return an action', () => {
    expect(authenticateUser()).toMatchSnapshot();
  });
  it('authenticateUserSuccess should return an action', () => {
    expect(authenticateUserSuccess()).toMatchSnapshot();
  });
  it('authenticateUserError should return an action', () => {
    expect(authenticateUserError()).toMatchSnapshot();
  });
  it('loadingUserData should return an action', () => {
    expect(loadingUserData()).toMatchSnapshot();
  });
  it('logoutUser should return an action', () => {
    expect(logoutUser()).toMatchSnapshot();
  });
  it('logoutUserSuccess should return an action', () => {
    expect(logoutUserSuccess()).toMatchSnapshot();
  });
  it('cleanErrorLogin should return an action', () => {
    expect(cleanErrorLogin()).toMatchSnapshot();
  });
  it('cleanErrorLoginSuccess should return an action', () => {
    expect(cleanErrorLoginSuccess()).toMatchSnapshot();
  });
  it('handleExceptionUserError should return an action', () => {
    expect(handleExceptionUserError()).toMatchSnapshot();
  });
});
