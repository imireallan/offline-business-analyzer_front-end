import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import Header from './Header';
import Auth from './Auth';
import Business from './Business'
import Dashboard from './Dashboard';
import NotFoundPage from './NotFoundPage';
import Login from './Auth/Login';

function Routes() {
	return (
		<React.Fragment>
			<Header />
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={true}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<Router>
				<Switch>
					<Route exact path="/dashboard" component={Dashboard} />
					<Route exact path="/business" component={Business} />
					<Route exact path="/" component={Auth} />
					<Route exact path="/login" component={Login} />
					<Route path="*" component={NotFoundPage} />
				</Switch>
			</Router>
		</React.Fragment>
	);
}

export default Routes;
