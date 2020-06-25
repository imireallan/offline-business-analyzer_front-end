import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Auth from './style';
import { Input, Button } from '../globalStyles';
import { registerUser } from '../../redux/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';

// form validation for confirm Password borrowed from
// https://codesandbox.io/s/l2r832l8x7?file=/src/index.js:262-460

const Register = ({ login }) => {
	const dispatch = useDispatch();
	const apiStatus = useSelector(state => state.apiStatus.apiCallsInProgress)
	const isLoading = apiStatus > 0 ? true: false;
	const formik = useFormik({
		initialValues: { email: '', username: '', password: '', password2: '' },
		validationSchema: Yup.object({
			email: Yup.string().email('Please enter a valid email').required('Email is Required'),
			username: Yup.string().required('Username is Required'),
			password: Yup.string().min(6, 'Password must be 6 characters or more').required('Password is Required'),
			password2: Yup.string().when('password', {
				is: (val) => (val && val.length > 0 ? true : false),
				then: Yup.string().oneOf([ Yup.ref('password') ], 'Both password need to be the same')
			})
		}),
		onSubmit: (values) => {
			dispatch(registerUser(values));
			login();
		}
	});
	return (
		<Auth>
			<Auth.Wrapper className="container">
				<Auth.Title>Register</Auth.Title>
				<Auth.Form onSubmit={formik.handleSubmit}>
					<Input.Wrapper>
						<Input type="email" name="email" placeholder="Email" {...formik.getFieldProps('email')} />
						{formik.touched.email && formik.errors.email ? (
							<small className="form-errors">{formik.errors.email}</small>
						) : null}
					</Input.Wrapper>
					<Input.Wrapper>
						<Input
							type="text"
							name="username"
							placeholder="Username"
							{...formik.getFieldProps('username')}
						/>
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
						<Input
							type="password"
							name="password2"
							placeholder="Confirm Password"
							{...formik.getFieldProps('password2')}
						/>
						{formik.touched.password2 && formik.errors.password2 ? (
							<small className="form-errors">{formik.errors.password2}</small>
						) : null}
					</Input.Wrapper>
					<Input.Wrapper>
						<Button large type="submit">
							{isLoading ? (
								<Loader type="Bars" color="rgb(255, 153, 0)" height={20} width={20} />
							) : (
								'Submit'
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
										login();
									}}
								>
									Login
								</a>
							</small>
						</div>
					</Input.Wrapper>
				</Auth.Form>
			</Auth.Wrapper>
		</Auth>
	);
};

export default Register;
