import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Auth from './style';
import { Input, Button } from '../globalStyles';
import { loginUser } from '../../redux/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';

// form validation for confirm Password borrowed from
// https://codesandbox.io/s/l2r832l8x7?file=/src/index.js:262-460

const Login = ({ register }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const errors = useSelector((state) => state.apiStatus.message);
	const apiStatus = useSelector((state) => state.apiStatus.apiCallsInProgress);
	const isLoading = apiStatus > 0 ? true : false;

	const handleRedirect = () => {
		history.push('/business');
	};

	// TODO: Add error logic
	useEffect(
		() => {
			console.log(errors);
		},
		[ errors ]
	);
	const formik = useFormik({
		initialValues: { username: '', password: '' },
		validationSchema: Yup.object({
			username: Yup.string().email('Please enter a valid email').required('Email is Required'),
			password: Yup.string().min(6, 'Password must be 6 characters or more').required('Password is Required')
		}),
		onSubmit: (values) => {
			dispatch(loginUser(values, handleRedirect));
		}
	});
	return (
		<Auth>
			<Auth.Wrapper className="container">
				<Auth.Title>Login</Auth.Title>
				<Auth.Form onSubmit={formik.handleSubmit}>
					<Input.Wrapper>
						<Input type="email" name="username" placeholder="Email" {...formik.getFieldProps('username')} />
						{formik.touched.username && formik.errors.username ? (
							<small className="form-errors">{formik.errors.username}</small>
						) : null}
					</Input.Wrapper>
					<Input.Wrapper>
						<Input
							type="password"
							name="password"
							placeholder="Password"
							{...formik.getFieldProps('password')}
						/>
						{formik.touched.password && formik.errors.password ? (
							<small className="form-errors">{formik.errors.password}</small>
						) : null}
					</Input.Wrapper>
					<Input.Wrapper>
						<Button large type="submit">
							{isLoading ? (
								<Loader type="Bars" color="rgb(255, 153, 0)" height={20} width={20} />
							) : (
								'Login'
							)}
						</Button>
						<div style={{ textAlign: 'right' }}>
							<small>
								Already have an account?{' '}
								<a
									className="sign-in"
									href="#"
									onClick={(e) => {
										e.preventDefault();
										register();
									}}
								>
									Register
								</a>
							</small>
						</div>
					</Input.Wrapper>
				</Auth.Form>
			</Auth.Wrapper>
		</Auth>
	);
};

export default Login;
