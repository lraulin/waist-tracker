import React, { Component } from 'react';

const spacer = {
	paddingRight: '3em',
};

const numField = {
	width: '4em',
};

class WaistRecord extends Component {
	state = { edit: false, date: '', oldDate: '', cm: '' };

	loadData() {
		this.setState({ date: this.props.date });
		this.setState({ cm: this.props.cm });
		this.setState({ oldDate: this.props.date });
	}

	handleEdit = () => {
		// User clicked "Edit"
		if (!this.state.edit) {
			this.setState({ edit: true });
		} else {
			// User clicked "Save"
			this.props.handleSaveRecord(
				this.state.cm,
				this.state.date,
				this.state.oldDate,
			);
			this.setState({ edit: false });
		}
	};

	handleDateChange = (e) => {
		this.setState({ date: e.target.value });
	};

	handleCmChange = (e) => {
		this.setState({ cm: e.target.value });
	};

	onClickDelete = () => {
		const userId = firebase.auth().currentUser.uid;
		firebase.database().ref(`waist/${userId}/${this.state.date}`).remove();
	};

	componentWillMount() {
		console.log('WaistRecord Will Mount');
	}

	componentDidMount() {
		console.log('WaistRecord Did Mount');
		this.loadData();
	}

	componentWillReceiveProps() {
		console.log('WaistRecord Will Recieve Props');
	}

	// shouldComponentUpdate() {
	// 	console.log('WaistRecord Should Update?');
	// }

	componentWillUpdate() {
		console.log('WaistRecord Will Update');
		this.loadData();
	}

	componentDidUpdate() {
		console.log('WaistRecord Did Update');
	}

	componentWillUnmount() {
		console.log('WaistRecord Will Unmount');
	}

	render() {
		const editButtonText = this.state.edit ? 'Save' : 'Edit';
		const dateField = this.state.edit ? (
			<input
				type="date"
				onChange={this.handleDateChange}
				value={this.state.date}
				size={8}
			/>
		) : (
			this.state.date
		);
		const cmField = this.state.edit ? (
			<input
				style={numField}
				type="number"
				onChange={this.handleCmChange}
				value={this.state.cm}
			/>
		) : (
			this.state.cm
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
