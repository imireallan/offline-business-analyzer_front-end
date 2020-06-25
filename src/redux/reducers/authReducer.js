import { LOGIN_ACTION_SUCCESS, REGISTER_ACTION_SUCCESS } from '../actions/types';
import initialState from './initialState';

export default function authReducer(state = initialState.auth, action) {
	switch (action.type) {
		case REGISTER_ACTION_SUCCESS:
			return { ...state, user: action.data };
		case LOGIN_ACTION_SUCCESS:
			return { ...state, user: action.data };
		default:
			return state;
	}
}
