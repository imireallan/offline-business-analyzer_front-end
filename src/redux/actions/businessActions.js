import axios from 'axios';
import { toast } from 'react-toastify';
import { BUSINESS_CREATION_SUCCESS, GET_BUSINESS_SUCCESS } from './types';
import { beginApiCall, apiCallError } from './apiStatusActions';

const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:8000/api/';
const token = localStorage.getItem('token') || '';

function businessRegister(data) {
	return { type: BUSINESS_CREATION_SUCCESS, data };
}

function listBusiness(data) {
	return { type: GET_BUSINESS_SUCCESS, data };
}

const registerBusiness = (values, redirect) => async (dispatch) => {
	dispatch(beginApiCall());
	try {
		const resp = await axios.post(`${baseUrl}business/register`, values, {
			headers: {
				Authorization: `Token ${token}`
			}
		});
		dispatch(businessRegister(resp.data));
		toast.success(`Registration of ${values.name} was successfull`);
		redirect();
	} catch (err) {
		console.log(err);
		let error = null
		if(err && err.response.data) {
			error = err.response.data
		}
		dispatch(apiCallError(error));
	}
};

const getBusiness = () => async (dispatch) => {
	dispatch(beginApiCall());
	try {
		const resp = await axios.get(`${baseUrl}business/owner`, {
			headers: {
				Authorization: `Token ${token}`
			}
		});
		dispatch(listBusiness(resp.data));
	} catch (err) {
		console.log(err);
		let error = null
		if(err && err.response.data) {
			error = err.response.data
		}
		dispatch(apiCallError(error));
	}
};

export {registerBusiness, getBusiness}
