import React, { useEffect } from 'react';
// import axios from 'axios';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
// import Select from 'react-select';
// import makeAnimated from 'react-select/animated';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';

import { registerBusiness } from '../../redux/actions/businessActions';

import './index.css';
import { Button } from '../globalStyles';

function Business() {
	// const [ countries, setCountries ] = useState([]);
	const dispatch = useDispatch();
	const history = useHistory();
	const errors = useSelector((state) => state.apiStatus.message);
	const apiStatus = useSelector((state) => state.apiStatus.apiCallsInProgress);
	const isLoading = apiStatus > 0 ? true : false;
	const initialValues = {
		name: '',
		businessAbbr: '',
		address: '',
		country: '',
		countriesOfOperation: '',
		annualSalesRevenue: '',
		entity: '',
		accountingSoftware: ''
	};

	const handleRedirect = () => {
		history.push('/dashboard');
	};

	// TODO: Add error logic
	useEffect(
		() => {
			// (async function fetchCountries() {
			// 	const resp = await axios.get('https://trial.mobiscroll.com/content/countries.json');
			// 	const tranformedCountries = resp.data.map((country) => ({ label: country.text, value: country.text }));
			// 	setCountries(tranformedCountries);
			// })();
		},
		[ errors ]
	);

	const formik = useFormik({
		initialValues,
		validationSchema: Yup.object({
			name: Yup.string().required('Business name is required.')
		}),
		onSubmit: (values) => {
			console.log(values)
			const { countriesOfOperation } = values;
			dispatch(
				registerBusiness({ ...values, countriesOfOperation: countriesOfOperation.split(' ') }, handleRedirect)
			);
			// alert(JSON.stringify(values, null, 2))
		}
	});

	// const animatedComponents = makeAnimated();
	return (
		<div className="container">
			<h3>Dont have a business? You can add one below</h3>
			<form className="business-form" onSubmit={formik.handleSubmit}>
				<div className="form-container">
					<div className="column-one">
						<div className="form-control-group">
							<label htmlFor="name">Business Name*</label>
							<input type="text" id="name" name="name" {...formik.getFieldProps('name')} />
							{formik.touched.name && formik.errors.name ? (
								<small className="form-errors">{formik.errors.name}</small>
							) : null}
							{errors && errors.name ? <small className="form-errors">{errors.name}</small> : null}
						</div>
						<div className="form-control-group">
							<label htmlFor="business-abbr">Business Abbreviation</label>
							<input
								type="text"
								id="business-abbr"
								name="businessAbbr"
								{...formik.getFieldProps('businessAbbr')}
							/>
						</div>
						<div className="form-control-group">
							<label htmlFor="company-address">Company Address</label>
							<input
								type="text"
								id="company-address"
								name="address"
								{...formik.getFieldProps('address')}
							/>
						</div>
						<div className="form-control-group">
							<label htmlFor="country">Country</label>
							<input type="text" id="country" name="country" {...formik.getFieldProps('country')} />
						</div>
						{/* <div className="form-control-group">
							<label htmlFor="country">Country</label>
							<Select
								options={countries}
								id="country"
								name="country"
								{...formik.getFieldProps('country')}
							/>
						</div> */}
					</div>
					<div className="column-two">
						<div className="form-control-group">
							<label htmlFor="country-of-operations">Countries of Operation</label>
							<input
								type="text"
								id="country-of-operations"
								name="countriesOfOperation"
								{...formik.getFieldProps('countriesOfOperation')}
							/>
						</div>
						{/* <div className="form-control-group">
							<label htmlFor="country-of-operations">Countries of Operation</label>
							<Select
								options={countries}
								isMulti
								closeMenuOnSelect={false}
								components={animatedComponents}
								id="country-of-operations"
								name="countriesOfOperation"
								{...formik.getFieldProps('countriesOfOperation')}
							/>
						</div> */}
						<div className="form-control-group">
							<label htmlFor="annual-sales-revenue">Annual Sales Revenue</label>
							<input
								type="text"
								id="annual-sales-revenue"
								name="annualSalesRevenue"
								{...formik.getFieldProps('annualSalesRevenue')}
							/>
							{errors && errors.annualSalesRevenue ? <small className="form-errors">{errors.annualSalesRevenue}</small> : null}
						</div>
						<div className="form-control-group">
							<label htmlFor="entity">Entity</label>
							<input type="text" id="entity" name="entity" {...formik.getFieldProps('entity')}/>
						</div>
						<div className="form-control-group">
							<label htmlFor="accounting-software">Accounting Software</label>
							<input
								type="text"
								id="accounting-software"
								name="accountingSoftware"
								{...formik.getFieldProps('accountingSoftware')}
							/>
						</div>
					</div>
				</div>
				<div className="button-wrapper">
					<Button business type="submit" disabled={isLoading}>
						{isLoading ? (
							<Loader type="Bars" color="rgb(255, 153, 0)" height={20} width={20} />
						) : (
							'Register Business'
						)}
					</Button>
				</div>
			</form>
			<div style={{ textAlign: 'right' }}>
				<small>
					<Link className="sign-in" to="/dashboard">
						>>>Dashboard
					</Link>
				</small>
			</div>
		</div>
	);
}

export default Business;
