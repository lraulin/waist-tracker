import React, { Component } from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Header from './Header';
import Record from './Record';
import Test from './Test';
import { inToCm, cmToIn, dateStamp, capitalize } from '../helpers';

const btnUnit = {
  float: 'right',
  marginTop: '5px',
};

const btnSpacer = {
  ...btnUnit,
  marginRight: '4em',
};

class RecordContainer extends Component {
  state = {
    newMeasurement: '',
    edit: '',
    metric: true,
    date: dateStamp(),
  };

  handleInputChange = (e) => {
    this.setState({ newMeasurement: e.target.value });
  };

  handleSubmit = () => {
    const measurement = this.state.metric
      ? this.state.newMeasurement
      : Math.round(inToCm(this.state.newMeasurement));
    this.props.handleSaveRecord(
      this.props.whichMeasurement,
      measurement,
      this.state.date,
    );
    this.setState({ newMeasurement: '', date: dateStamp() });
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
    this.props.history.push(`/users/${this.props.userID.uid}`);
  };

  handleChangeDate = (e) => {
    this.setState({ date: e.target.value });
  };

  componentWillMount() {
    this.setState({ newMeasurement: this.props.lastRecord });
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.lastRecord);
    this.setState({ newMeasurement: nextProps.lastRecord });
  }

  render() {
    return (
      <div id="RecordContainer" className="inner-container">
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
              <Record
                key={rec.date}
                date={rec.date}
                cm={rec.cm}
                handleSaveRecord={this.props.handleSaveRecord}
                metric={this.state.metric}
                whichMeasurement={this.props.whichMeasurement}
              />
            ))}
          </tbody>
        </table>
        {/* NEW ENTRY */}
        <div id="data-input">
          <h1>Today's {capitalize(this.props.whichMeasurement)} Measurement</h1>
          <input
            id="new-date-input"
            type="date"
            value={this.state.date}
            onChange={this.handleChangeDate}
          />
          <input
            id="new-measurement-input"
            type="number"
            onChange={this.handleInputChange}
            onKeyDown={this.handleKeyDown}
            value={
              this.state.metric ? (
                this.state.newMeasurement
              ) : (
                cmToIn(this.state.newMeasurement)
              )
            }
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

export default withRouter(RecordContainer);
