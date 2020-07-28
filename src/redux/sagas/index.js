import { all } from 'redux-saga/effects';
import authSagas from './auth.sagas';
import userSagas from './users.sagas';
import wordSagas from './words.sagas';

export default function* rootSaga() {
  yield all([authSagas(), userSagas(), wordSagas()]);
}
