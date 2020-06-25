import { UPLOAD_CSV_SUCCESS } from '../actions/types';
import initialState from './initialState';

export default function businessReducer(state = initialState.upload, action) {
	switch (action.type) {
		case UPLOAD_CSV_SUCCESS:
			return { ...state, data: action.data };
		default:
			return state;
	}
}
