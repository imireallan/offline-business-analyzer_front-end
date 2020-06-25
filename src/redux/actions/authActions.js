import axios from 'axios';
import { toast } from 'react-toastify';
import { REGISTER_ACTION_SUCCESS, LOGIN_ACTION_SUCCESS } from './types';
import { beginApiCall, apiCallError } from './apiStatusActions';

const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:8000/api/';

function login(data) {
	return { type: LOGIN_ACTION_SUCCESS, data };
}

function register(data) {
	return { type: REGISTER_ACTION_SUCCESS, data };
}

const registerUser = (values, redirect) => async (dispatch) => {
	dispatch(beginApiCall());
	try {
		const resp = await axios.post(`${baseUrl}account/register`, values);
		dispatch(register(resp.data));
		toast.success('Registration was successfull.');
		redirect()
	} catch (err) {
		console.log(err);
		let error = null
		if(err && err.response.data) {
			error = err.response.data
		}
		dispatch(apiCallError(error));
	}
};

const loginUser = (values, redirect) => async (dispatch) => {
	dispatch(beginApiCall());
	try {
		const resp = await axios.post(`${baseUrl}account/login`, values);
		localStorage.setItem('token', resp.data.token)
		dispatch(login(resp.data));
		toast.success('Login was successfull.');
		redirect()
	} catch (err) {
		console.log(err);
		let error = null
		if(err && err.response.data) {
			error = err.response.data
		}
		dispatch(apiCallError(error));
	}
};

export { registerUser, loginUser };
