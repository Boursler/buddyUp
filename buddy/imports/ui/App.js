import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import { Button } from 'semantic-ui-react';
import HomePage from './pages/HomePage';

import WelcomePage from "./pages/WelcomePage";
import {ProfilePageLayout} from './pages/ProfilePage';
import { BrowserRouter as Router, Route } from "react-router-dom";
import EventsPage from'./pages/EventsPage';
// import AboutMe from './components/AboutMe';

const styles = {

	fontFamily: "sans-serif",
	textAlign: "center",

};

export default class App extends Component {

	render() {
		return (
			
			<Router>
				<div>
					{/* <AboutMe/> */}
					<Route exact path="/" component={HomePage} />
					<Route exact path="/profile" component={ProfilePageLayout} />
					<Route exact path="/welcome" component={WelcomePage} />
					<Route exact path="/events" component={EventsPage} />

				</div>
			</Router>
		);
	}
}

