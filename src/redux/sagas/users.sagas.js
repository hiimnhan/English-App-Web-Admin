import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';
import userConstants from '../constants/users.constants';
import { userActions } from '../actions/users.actions';
import { baseUrl, setHeader, getStorage } from '../../service';

function* getAllUsers() {
  try {
    const result = yield axios
      .get(
        baseUrl + userConstants.GET_ALL_USERS_PATH,
        setHeader(getStorage('TOKEN'))
      )
      .then((res) => res.data);
    const users = result.data.content;
    yield put(userActions.getAllUsersSuccess(users));
  } catch (error) {
    console.log('error', error);
    yield put(userActions.getAllUsersFailure(error));
  }
}

function* getUser(id) {
  try {
    const user = yield axios
      .get(`${baseUrl + userConstants.GET_USER_PATH}/${id}`)
      .then((res) => res.data);
    yield put(userActions.getUserSuccess(user));
  } catch (error) {
    console.log('error', error);
    yield put(userActions.getUserFailure(error));
  }
}

function* deleteUser(id) {
  console.log('bank id saga delete', id);
  try {
  } catch (error) {}
}

export default function* userSagas() {
  yield takeEvery(userConstants.GET_ALL_USERS_REQUEST, getAllUsers);
  yield takeEvery(userConstants.GET_USER_REQUEST, getUser);
}
