import React, { Component } from 'react';

const spacer = {
	paddingRight: '3em',
};

const numField = {
	width: '4em',
};

class WaistRecord extends Component {
	state = { edit: false, date: '', cm: '' };

	handleEdit = () => {
		if (!this.state.edit) {
			this.setState({ edit: true });
		} else {
			this.setState({ edit: false });
		}
	};

	handleDateChange = (e) => {
		this.setState({ date: e.target.value });
	};

	handleCmChange = (e) => {
		this.setState({ cm: e.target.value });
	};

	onSave = () => {
		this.props.handleSubmit(this.state.cm, this.state.date);
	};

	componentDidMount() {
		this.setState({ date: this.props.date });
		this.setState({ cm: this.props.cm });
	}

	componentWillReceiveProps() {
		// Update state with new props
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
					<button>Delete</button>
				</td>
			</tr>
		);
	}
}

export default WaistRecord;
