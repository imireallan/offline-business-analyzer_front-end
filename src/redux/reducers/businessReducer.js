import { BUSINESS_CREATION_SUCCESS, GET_BUSINESS_SUCCESS } from '../actions/types';
import initialState from './initialState';

export default function businessReducer(state = initialState.business, action) {
	switch (action.type) {
		case BUSINESS_CREATION_SUCCESS:
			return { ...state, data: action.data };
			case GET_BUSINESS_SUCCESS:
				return { ...state, user: action.data };
		default:
			return state;
	}
}
