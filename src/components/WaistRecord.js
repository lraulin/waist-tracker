import React, { Component } from 'react';
import { inToCm, cmToIn } from '../helpers';

const spacer = {
  paddingRight: '3em',
};

const numField = {
  width: '4em',
};

class WaistRecord extends Component {
  state = {
    edit: false,
    newDate: this.props.date,
    oldDate: this.props.date,
    newMeasurement: this.props.measurement,
  };

  handleEdit = () => {
    this.setState({ newDate: this.props.date, newMeasurement: this.props.cm });
    // User clicked "Edit"
    if (!this.state.edit) {
      this.setState({ edit: true });
    } else {
      // User clicked "Save"
      const measurement = this.props.metric
        ? this.state.newMeasurement
        : Math.round(inToCm(this.state.newMeasurement));
      this.props.handleSaveRecord(
        measurement,
        this.state.newDate,
        this.props.date,
      );
      this.setState({ edit: false });
    }
  };

  handleDateChange = (e) => {
    this.setState({ newDate: e.target.value });
  };

  handleMeasurementChange = (e) => {
    this.setState({ newMeasurement: e.target.value });
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
        onChange={this.handleMeasurementChange}
        value={this.state.newMeasurement}
      />
    ) : this.props.metric ? (
      this.props.cm
    ) : (
      Math.round(cmToIn(this.props.cm))
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
