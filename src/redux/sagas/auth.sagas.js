import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';
import { setHeader, baseUrl, setStorage } from '../../service';
import authContants from '../constants/auth.constants';
import { authActions } from '../actions/auth.actions';
import { messageConstants } from '../../constants/messages.constants';
import { history } from '../../helpers';

function* login(params) {
  const { username, password } = params.params;
  try {
    const result = yield axios
      .post(baseUrl + authContants.LOGIN_PATH, {
        username,
        password,
      })
      .then((res) => res.data);
    const {
      accessToken,
      data: {
        role: { id },
        firstName,
        lastName,
      },
    } = result;
    if (id !== 1)
      yield put(authActions.signInFailure(messageConstants.AUTH_FAIL));
    else {
      setStorage({
        key: 'TOKEN',
        val: accessToken,
      });
      yield put(authActions.signInSuccess([firstName, lastName].join(' ')));
    }
  } catch (error) {
    console.log('error', error);
    if (error.code === 'ERROR_BAD_CREDENTIALS') {
      yield put(authActions.signInFailure(messageConstants.WRONG_USERNAME_PWD));
    } else {
      yield put(authActions.signInFailure(error.message));
    }
  }
}

export default function* authSagas() {
  yield takeEvery(authContants.LOGIN_REQUEST, login);
}
