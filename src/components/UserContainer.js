import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { adonisIndex } from '../helpers';

export default class UserContainer extends Component {
	state = {
		height: '',
		idealWaist: '',
		idealShoulders,
	};

	componentDidMount() {
		if (!height) {
			const height = window.prompt('Enter your height in cm');
			this.setState({ height });
			const { idealWaist, idealShoulders } = adonisIndex(height);
			console.log('waist ' + idealWaist);
			this.setState({ idealWaist, idealShoulders });
		}
	}

	render() {
		return (
			<div id="UserContainer" className="inner-container">
				<Header>
					<Link to="/">
						<button className="red">Back To Chat</button>
					</Link>
				</Header>
				<h1>User</h1>
			</div>
		);
	}
}
