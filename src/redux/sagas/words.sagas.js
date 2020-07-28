import { wordConstants } from '../constants/words.constants';
import { wordActions } from '../actions/words.actions';
import { setHeader, baseUrl } from '../../service';
import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import { noti, notiTypes } from '../../utils/noti.utils';

function* getAllWords(wordParams) {
  const {
    page = 0,
    size = 10,
    levelId = null,
    topicId = null,
  } = wordParams.params;
  try {
    const result = yield axios
      .get(
        `${
          baseUrl + wordConstants.GET_ALL_WORDS_PATH
        }?page=${page}&size=${size}${
          levelId !== null ? `&levelId=${levelId}` : ''
        }${topicId !== null ? `&topicId=${topicId}` : ''}`,
        setHeader()
      )
      .then((res) => res.data);
    const words = result.data;
    yield put(wordActions.getAllWordsSuccess(words));
  } catch (error) {
    console.log('error', error);
    yield put(wordActions.getAllWordsFailure(error));
  }
}

function* getAllFilters() {
  try {
    const result = yield axios
      .get(baseUrl + wordConstants.GET_FILTERS_PATH, setHeader())
      .then((res) => res.data);
    const filters = result.data;
    yield put(wordActions.getFiltersSuccess(filters));
  } catch (error) {
    yield put(wordActions.getFiltersFailure(error));
  }
}

function* createWord(wordParams) {
  try {
    yield axios
      .post(
        baseUrl + wordConstants.CREATE_WORD_PATH,
        { ...wordParams.params },
        setHeader()
      )
      .then((res) => res.data);
    yield put(wordActions.createWordSuccess());
    noti(notiTypes.SUCCESS, 'Your dictionary has one more word!');
  } catch (error) {
    console.log('error', error);
    yield put(wordActions.createWordFailure(error));
    noti(notiTypes.ERROR, 'Whoops! Something wrong happens');
  }
}

function* getWordDetail(wordId) {
  try {
    const result = yield axios
      .get(
        `${baseUrl + wordConstants.GET_WORD_DETAIL_PATH}?wordId=${wordId.id}`,
        setHeader()
      )
      .then((res) => res.data);
    yield put(wordActions.getWordDetailSuccess(result.data));
  } catch (error) {
    console.log('error', error);
    yield put(wordActions.getWordDetailFailure(error));
  }
}

function* deleteWord(wordId) {
  try {
    yield axios
      .delete(
        `${baseUrl + wordConstants.DELETE_WORD_PATH}?wordId=${wordId.id}`,
        setHeader()
      )
      .then((res) => res.data);
    yield put(wordActions.deleteWordSuccess());
    noti(notiTypes.SUCCESS, 'Why you delete me!!!');
  } catch (error) {
    yield put(wordActions.deleteWordFailure(error));
    noti(notiTypes.ERROR, 'Whoops! Something wrong happens');
  }
}

export default function* wordSagas() {
  yield takeEvery(wordConstants.GET_ALL_WORDS_REQUEST, getAllWords);
  yield takeEvery(wordConstants.GET_FILTERS_REQUEST, getAllFilters);
  yield takeEvery(wordConstants.CREATE_WORD_REQUEST, createWord);
  yield takeEvery(wordConstants.GET_WORD_DETAIL_REQUEST, getWordDetail);
  yield takeEvery(wordConstants.DELETE_WORD_REQUEST, deleteWord);
}
