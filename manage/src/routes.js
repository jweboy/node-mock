import React from 'react';
import {
	Switch,
	Route,
	Redirect,
	BrowserRouter as Router,
} from 'react-router-dom';


import HomePage from 'containers/Home';
import CenterPage from 'containers/Center';
import ProjectPage from './containers/Project';

const supportsHistory = 'pushState' in window.history;

const AppRouter = () => (
	<Router
		basename="/"
		forceRefresh={!supportsHistory}
	>
		<Switch>
			<Route exact path="/" render={() => (<Redirect to="/project" />)} />
			<Route path="/home" component={HomePage} />
			<Route path="/project" component={ProjectPage} />
		</Switch>
	</Router>
);

export default AppRouter;
