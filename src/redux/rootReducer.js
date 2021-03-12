import { combineReducers } from 'redux';

// Reducers
import userReducer from './User/user.reducer';
import productsReducer from './Products/products.reducer';

export default combineReducers({
    user: userReducer,
    productsData: productsReducer
});