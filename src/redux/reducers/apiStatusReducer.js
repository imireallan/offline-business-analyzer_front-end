import { BEGIN_API_CALL, API_CALL_ERROR } from '../actions/types';
import initialState from './initialState';

const actionTypeEndsInSuccess = (type) => {
	console.log(type.substring(type.length - 8));
	return type.substring(type.length - 8) === '_SUCCESS';
};

export default function courseReducer(state = initialState.error, action) {
	const { type } = action;
	if (type === BEGIN_API_CALL) {
		return {...state, apiCallsInProgress: 1};
	} else if (actionTypeEndsInSuccess(type) || type === API_CALL_ERROR) {
		return {...state, apiCallsInProgress: 0, message: action.error}
	}
	return state;
}