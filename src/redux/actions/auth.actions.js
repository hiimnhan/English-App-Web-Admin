import authContants from '../constants/auth.constants';

const signInRequest = (params) => {
  return {
    type: authContants.LOGIN_REQUEST,
    params,
  };
};
const signInSuccess = (user) => ({
  type: authContants.LOGIN_SUCCESS,
  user,
});
const signInFailure = (errors) => ({
  type: authContants.LOGIN_FAILURE,
  errors,
});

export const authActions = {
  signInRequest,
  signInSuccess,
  signInFailure,
};
