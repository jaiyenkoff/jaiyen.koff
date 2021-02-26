import { combineReducers } from 'redux';

// Reducers
import userReducer from './User/user.reducer';

export default combineReducers({
    user: userReducer
});