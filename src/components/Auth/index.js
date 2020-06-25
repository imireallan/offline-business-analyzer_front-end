import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';

// form validation for confirm Password borrowed from
// https://codesandbox.io/s/l2r832l8x7?file=/src/index.js:262-460

const AuthComponent = () => {
	const [ isLogin, setLogin ] = useState(true);
	const toggleAuth = () => {
		setLogin((prevState) => !prevState);
	};
	return (
		<React.Fragment>{isLogin ? <Login register={toggleAuth} /> : <Register login={toggleAuth} />}</React.Fragment>
	);
};

export default AuthComponent;
