const initialState = {
  isAuthenticated: false,
  token: '',
  expiredAt: '',
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTHENTICATED':
    return { ...state, ...action.payload };
    case 'AUTHENTICATE_ERROR':
      return { ...state }
    case 'REGISTER_SUCCESS':
      return { ...state, ...action.payload };
    case 'LOGOUT_SUCCESS':
      return { ...action.auth_logout};
    default:
      return state
  }
}

export default auth
