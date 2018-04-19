import React, { Component } from 'react';

const spacer = {
	paddingRight: '3em',
};

const numField = {
	width: '4em',
};

class WaistRecord extends Component {
	state = { edit: false, newDate: '', oldDate: '', newCm: '' };

	// loadData(date = this.props.date, cm = this.props.cm) {
	// 	console.log('Loading Data...');
	// 	console.log(date, cm);
	// 	this.setState({ date: this.props.date });
	// 	this.setState({ cm: this.props.cm });
	// 	this.setState({ oldDate: date });
	// 	console.log(this.state);
	// }

	handleEdit = () => {
		// User clicked "Edit"
		this.setState({ newDate: this.props.date, newCm: this.props.cm });
		if (!this.state.edit) {
			this.setState({ edit: true });
		} else {
			// User clicked "Save"
			this.props.handleSaveRecord(
				this.state.newCm,
				this.state.newDate,
				this.props.date,
			);
			this.setState({ edit: false });
		}
	};

	handleDateChange = (e) => {
		this.setState({ newDate: e.target.value });
	};

	handleCmChange = (e) => {
		this.setState({ newCm: e.target.value });
	};

	onClickDelete = () => {
		const userId = firebase.auth().currentUser.uid;
		firebase.database().ref(`waist/${userId}/${this.props.date}`).remove();
	};

	render() {
		const editButtonText = this.state.edit ? 'Save' : 'Edit';
		const dateField = this.state.edit ? (
			<input
				type="date"
				onChange={this.handleDateChange}
				value={this.state.newDate}
				size={8}
			/>
		) : (
			this.props.date
		);
		const cmField = this.state.edit ? (
			<input
				style={numField}
				type="number"
				onChange={this.handleCmChange}
				value={this.state.newCm}
			/>
		) : (
			this.props.cm
		);
		return (
			<tr>
				<td style={spacer}>{dateField}</td>
				<td>{cmField}</td>
				<td>
					<button onClick={this.handleEdit}>{editButtonText}</button>
					<button onClick={this.onClickDelete}>Delete</button>
				</td>
			</tr>
		);
	}
}

export default WaistRecord;
