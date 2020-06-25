import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { Button } from '../globalStyles';
import Loader from 'react-loader-spinner';
import { uploadCSV } from '../../redux/actions/uploadAction';
import CustomFileInput from '../CustomFileInput';
import '../Business/index.css';

function Dashboard() {
	// const uploadData = useSelector((state) => state.businessReducer.user);
	const dispatch = useDispatch();
	// const errors = useSelector((state) => state.apiStatus.message);
	const apiStatus = useSelector((state) => state.apiStatus.apiCallsInProgress);
	const isLoading = apiStatus > 0 ? true : false;

	// useEffect(() => {
	// 	dispatch(getBusiness());
	// });

	const validationSchema = Yup.object().shape({
		csvFile: Yup.mixed()
			.required('A CSV file is required')
			.test('fileFormat', 'Unsupported Format!Upload csv files only', (value) => value && [ 'text/csv' ].includes(value.type))
	});
	return (
		<div className="container">
			<h4>Upload csv</h4>
			<Formik
				initialValues={{
					csvFile: null
				}}
				validationSchema={validationSchema}
				onSubmit={({csvFile}) => {
					console.log(csvFile);
					dispatch(uploadCSV(csvFile));
				}}
				render={({
					values,
					errors,
					touched,
					handleChange,
					setFieldValue,
					handleBlur,
					isValid,
					handleSubmit,
					isSubmitting
				}) => (
					<form className="business-form" onSubmit={handleSubmit} encType="multipart/form-data">
						<div className="container">
							<Field
								name="csvFile"
								component={CustomFileInput}
								title="Upload"
								setFieldValue={setFieldValue}
								errorMessage={errors.csvFile ? errors.csvFile : ''}
								touched={touched.csvFile}
								onBlur={handleBlur}
								onChange={handleChange}
							/>
							{/* <Button business type="submit" disabled={Object.keys(formik.errors).length > 0}>
								Upload
							</Button> */}

							<Button business type="submit" disabled={isLoading}>
								{isLoading ? (
									<Loader type="Bars" color="rgb(255, 153, 0)" height={20} width={20} />
								) : (
									'Upload'
								)}
							</Button>
						</div>
					</form>
				)}
			/>
		</div>
	);
}

export default Dashboard;
