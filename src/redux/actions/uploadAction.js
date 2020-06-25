import axios from 'axios';
import { toast } from 'react-toastify';
import { UPLOAD_CSV_SUCCESS } from './types';
import { beginApiCall, apiCallError } from './apiStatusActions';

const baseUrl = process.env.REACT_BASE_URL || 'http://localhost:8000/api/';

function upload(data) {
	return { type: UPLOAD_CSV_SUCCESS, data };
}

const uploadCSV = (values) => async (dispatch) => {
	dispatch(beginApiCall());
	try {
		const token = localStorage.getItem('token') || '';
		const resp = await axios.post(`${baseUrl}transaction/upload`, values, {
			headers: {
				Authorization: `Token ${token}`,
				// 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryV7LYzhxBNzDM7NIr'
			}
		});
		dispatch(upload(resp.data));
		toast.success('Upload was successfull.');
	} catch (err) {
		console.log(err);
		const { response: { data } } = err;
		dispatch(apiCallError(data));
	}
};

export { uploadCSV };
