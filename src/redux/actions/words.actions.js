import { wordConstants } from '../constants/words.constants';

const getAllWordsRequest = (params) => ({
  type: wordConstants.GET_ALL_WORDS_REQUEST,
  params,
});

const getAllWordsSuccess = (words) => ({
  type: wordConstants.GET_ALL_WORDS_SUCCESS,
  words,
});

const getAllWordsFailure = (errors) => ({
  type: wordConstants.GET_ALL_WORDS_FAILURE,
  errors,
});

const getFiltersRequest = () => ({
  type: wordConstants.GET_FILTERS_REQUEST,
});

const getFiltersSuccess = (filters) => ({
  type: wordConstants.GET_FILTERS_SUCCESS,
  filters,
});

const getFiltersFailure = (errors) => ({
  type: wordConstants.GET_FILTERS_FAILURE,
  errors,
});

const createWordRequest = (params) => ({
  type: wordConstants.CREATE_WORD_REQUEST,
  params,
});

const createWordSuccess = () => ({
  type: wordConstants.CREATE_WORD_SUCCESS,
});

const createWordFailure = (errors) => ({
  type: wordConstants.CREATE_WORD_FAILURE,
  errors,
});

const getWordDetailRequest = (id) => ({
  type: wordConstants.GET_WORD_DETAIL_REQUEST,
  id,
});

const getWordDetailSuccess = (word) => ({
  type: wordConstants.GET_WORD_DETAIL_SUCCESS,
  word,
});

const getWordDetailFailure = (errors) => ({
  type: wordConstants.GET_WORD_DETAIL_FAILURE,
  errors,
});

const deleteWordRequest = (id) => ({
  type: wordConstants.DELETE_WORD_REQUEST,
  id,
});

const deleteWordSuccess = () => ({
  type: wordConstants.DELETE_WORD_SUCCESS,
});

const deleteWordFailure = (errors) => ({
  type: wordConstants.DELETE_WORD_FAILURE,
  errors,
});

export const wordActions = {
  getAllWordsRequest,
  getAllWordsSuccess,
  getAllWordsFailure,

  getFiltersRequest,
  getFiltersSuccess,
  getFiltersFailure,

  createWordRequest,
  createWordSuccess,
  createWordFailure,

  getWordDetailRequest,
  getWordDetailSuccess,
  getWordDetailFailure,

  deleteWordRequest,
  deleteWordSuccess,
  deleteWordFailure,
};
