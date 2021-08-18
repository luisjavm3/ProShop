import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from '../actionTypes';

const userLoginReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };

    case USER_LOGIN_SUCCESS:
      // Here may be an error, It should be better if we change products for user
      return { loading: false, products: payload };

    case USER_LOGIN_FAIL:
      return { loading: false, error: payload };

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export default userLoginReducer;
