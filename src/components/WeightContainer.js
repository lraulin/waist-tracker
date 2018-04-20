import React, { Component } from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Header from './Header';
import WaistRecord from './WaistRecord';
import Test from './Test';
import { inToCm } from '../helpers';

const btnUnit = {
	float: 'right',
	marginTop: '5px',
};

const btnSpacer = {
	...btnUnit,
	marginRight: '4em',
};

class WeightContainer extends Component {
	state = { newMeasurement: '', edit: '', testArr: [ 1, 2, 3 ], metric: true };

	handleLogout = () => {
		firebase.auth().signOut();
	};

	handleInputChange = (e) => {
		this.setState({ newMeasurement: e.target.value });
	};

	handleSubmit = () => {
		const measurement = this.state.metric
			? this.state.newMeasurement
			: Math.round(inToCm(this.state.newMeasurement));
		this.props.handleSaveRecord(measurement);
		this.setState({ newMeasurement: '' });
	};

	handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			this.handleSubmit();
		}
	};

	handleClickCm = () => {
		this.setState({ metric: true });
	};

	handleClickIn = () => {
		this.setState({ metric: false });
	};

	handleClickProfile = () => {
		this.props.history.push(`/users/${this.props.user.uid}`);
	};

	render() {
		return (
			<div id="WeightContainer" className="inner-container">
				<Header>
					<button className="red" onClick={this.handleLogout}>
						Logout
					</button>
					<button className="red" onClick={this.handleClickProfile}>
						Profile
					</button>
					<button
						className={
							this.state.metric ? (
								'btn btn-primary btn-sm active'
							) : (
								'btn btn-secondary btn-sm'
							)
						}
						aria-pressed={this.state.metric}
						onClick={this.handleClickCm}
						style={btnSpacer}
					>
						cm
					</button>
					<button
						className={
							!this.state.metric ? (
								'btn btn-primary btn-sm active'
							) : (
								'btn btn-secondary btn-sm'
							)
						}
						aria-pressed={!this.state.metric}
						onClick={this.handleClickIn}
						style={btnUnit}
					>
						in
					</button>
				</Header>
				<table>
					<thead>
						<tr>
							<th>Date</th>
							<th>Measurement</th>
						</tr>
					</thead>
					<tbody>
						{this.props.records.map((rec) => (
							<WaistRecord
								key={rec.date}
								date={rec.date}
								cm={rec.cm}
								handleSaveRecord={this.props.handleSaveRecord}
								metric={this.state.metric}
							/>
						))}
					</tbody>
				</table>
				<div id="chat-input">
					<h1>Today's Weight</h1>
					<textarea
						placeholder="Add your current measurement..."
						onChange={this.handleInputChange}
						onKeyDown={this.handleKeyDown}
						value={this.state.newMeasurement}
					/>
					<button onClick={this.handleSubmit}>
						<svg viewBox="0 0 24 24">
							<path fill="#424242" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
						</svg>
					</button>
				</div>
			</div>
		);
	}
}

export default withRouter(WeightContainer);
