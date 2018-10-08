import reducer from '../../../src/stores/auth/reducer';
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
import { ActionsTypes } from '../../../src/constants';


describe('Auth', () => {
  let auth = reducer(undefined, {});

  it('should return init state', ()=> {
    expect(reducer(auth, {})).toMatchSnapshot();
  });

  it(`should handle ${ActionsTypes.AUTHENTICATE_USER}`, () => {
    const values = {email: 'test@gmail.com', password: 'password123'}
    let auth = reducer(auth, authenticateUser(values));
    expect(auth).toMatchSnapshot();
  });

  it(`should handle ${ActionsTypes.AUTHENTICATE_USER_SUCCESS}`, () => {
    const values = {
      error: "",
      expiredAt: "123123123",
      isAuthenticated: true,
      isLoading: false,
      refreshToken: "123123123ASFCXD",
      token: "123123123ASFCXD",
    };
    let auth = reducer(auth, authenticateUserSuccess(values));
    expect(auth).toMatchSnapshot();
  });

  it(`should handle ${ActionsTypes.AUTHENTICATE_USER_ERROR}`, () => {
    const values = {
      error: "602",
      expiredAt: "",
      isAuthenticated: false,
      isLoading: false,
      refreshToken: "",
      token: "",
    };
    let auth = reducer(auth, authenticateUserError(values));
    expect(auth).toMatchSnapshot();
  });
})
