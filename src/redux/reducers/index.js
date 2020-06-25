import { combineReducers } from 'redux';
import apiStatus from './apiStatusReducer';
import authReducer from './authReducer';
import businessReducer from './businessReducer';
import uploadReducer from './uploadReducer';

const rootReducer = combineReducers({
	authReducer,
	apiStatus,
	businessReducer,
	uploadReducer
});
export default rootReducer;
