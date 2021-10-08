import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import FrontPage from './components/front_page';
import Login from './components/login';
import NavigationBar from './components/navigation_bar';
import RegistrationPage from './components/registration_page';
// eslint-disable-next-line
import app from './firebase';

function MainView(props) {
	return (
		<div>
			<Switch>
				<Route exact path="/">
					<FrontPage />
				</Route>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/register">
					<RegistrationPage />
				</Route>
			</Switch>
		</div>
	);
}

ReactDOM.render(
	<Router>
		<NavigationBar />
		<MainView />
	</Router>,
	document.getElementById('root')
);
