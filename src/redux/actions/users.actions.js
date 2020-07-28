import userConstants from '../constants/users.constants';

/*
    GET ALL USERS
*/
const getAllUsersRequest = () => ({
  type: userConstants.GET_ALL_USERS_REQUEST,
});

const getAllUsersSuccess = (users) => ({
  type: userConstants.GET_ALL_USERS_SUCCESS,
  users,
});

const getAllUsersFailure = (errors) => ({
  type: userConstants.GET_ALL_USERS_FAILURE,
  errors,
});

const getUserRequest = (id) => ({
  type: userConstants.GET_USER_REQUEST,
  id,
});

const getUserSuccess = (user) => ({
  type: userConstants.GET_USER_SUCCESS,
  user,
});

const getUserFailure = (errors) => ({
  type: userConstants.GET_USER_FAILURE,
  errors,
});

const deleteUserRequest = (id) => ({
  type: userConstants.DELETE_USER_REQUEST,
  id,
});

const deleteUserSuccess = () => ({
  type: userConstants.DELETE_USER_SUCCESS,
});

const deleteUserFailure = (errors) => ({
  type: userConstants.DELETE_USER_FAILURE,
  errors,
});

export const userActions = {
  getAllUsersRequest,
  getAllUsersSuccess,
  getAllUsersFailure,

  getUserRequest,
  getUserSuccess,
  getUserFailure,

  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
};
