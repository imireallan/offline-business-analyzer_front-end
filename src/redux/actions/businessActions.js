import axios from 'axios';
import { toast } from 'react-toastify';
import { BUSINESS_CREATION_SUCCESS, GET_BUSINESS_SUCCESS } from './types';
import { beginApiCall, apiCallError } from './apiStatusActions';

const baseUrl = process.env.REACT_BASE_URL || 'http://localhost:8000/api/';
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
		const { response } = err;
		dispatch(apiCallError(response));
	}
};

const getBusiness = (values) => async (dispatch) => {
	dispatch(beginApiCall());
	try {
		const resp = await axios.get(`${baseUrl}business/list`, {
			headers: {
				Authorization: `Token ${token}`
			}
		});
		dispatch(listBusiness(resp.data));
	} catch (err) {
		console.log(err);
		const { response } = err;
		dispatch(apiCallError(response));
	}
};

export {registerBusiness, getBusiness}
