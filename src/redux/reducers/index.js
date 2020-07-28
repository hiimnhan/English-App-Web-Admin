import { combineReducers } from 'redux';
import { authReducer } from './auth.reducers';
import { userReducer } from './users.reducers';
import { wordReducers } from './words.reducers';

const rootReducer = combineReducers({
  authentication: authReducer,
  userReducer,
  wordReducers,
});

export default rootReducer;
