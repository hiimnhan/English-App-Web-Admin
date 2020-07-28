import userConstants from '../constants/users.constants';

const initialState = {
  users: [],
  errors: '',
  loading: true,
  user: {},
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case userConstants.GET_ALL_USERS_REQUEST:
      return { ...state };
    case userConstants.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        users: action.users,
        loading: false,
      };
    case userConstants.GET_ALL_USERS_FAILURE:
      return {
        ...state,
        errors: action.errors,
        loading: false,
      };
    case userConstants.GET_USER_REQUEST:
      return { ...state };
    case userConstants.GET_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
      };
    case userConstants.GET_USER_FAILURE:
      return {
        ...state,
        errors: action.errors,
      };
    default:
      return { ...state };
  }
}
