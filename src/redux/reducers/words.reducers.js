import { wordConstants } from '../constants/words.constants';

const initialState = {
  words: {},
  loading: false,
  errors: '',
  filters: {},
  processing: false,
  word: {},
};

export const wordReducers = (state = initialState, action) => {
  switch (action.type) {
    case wordConstants.GET_ALL_WORDS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case wordConstants.GET_ALL_WORDS_SUCCESS:
      return {
        ...state,
        words: action.words,
        loading: false,
      };
    case wordConstants.GET_ALL_WORDS_FAILURE:
      return {
        ...state,
        errors: action.errors,
      };
    case wordConstants.GET_FILTERS_REQUEST:
      return {
        ...state,
        processing: true,
      };
    case wordConstants.GET_FILTERS_SUCCESS:
      return {
        ...state,
        filters: action.filters,
        processing: false,
      };
    case wordConstants.GET_FILTERS_FAILURE:
      return {
        ...state,
        errors: action.errors,
      };
    case wordConstants.CREATE_WORD_REQUEST:
      return {
        ...state,
        processing: false,
      };
    case wordConstants.CREATE_WORD_SUCCESS:
      return {
        ...state,
        processing: true,
      };
    case wordConstants.CREATE_WORD_FAILURE:
      return {
        ...state,
        errors: action.errors,
      };
    case wordConstants.GET_WORD_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case wordConstants.GET_WORD_DETAIL_SUCCESS:
      return {
        ...state,
        word: action.word,
        loading: false,
      };
    case wordConstants.GET_WORD_DETAIL_FAILURE:
      return {
        ...state,
        errors: action.errors,
      };
    case wordConstants.DELETE_WORD_REQUEST:
      return {
        ...state,
        processing: true,
      };
    case wordConstants.DELETE_WORD_SUCCESS:
      return {
        ...state,
        processing: false,
      };
    case wordConstants.DELETE_WORD_FAILURE:
      return {
        ...state,
        errors: action.errors,
      };
    default:
      return { ...state };
  }
};
