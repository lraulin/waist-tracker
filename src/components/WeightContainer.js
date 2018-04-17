import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Header from './Header';
import WaistRecord from './WaistRecord';

export default class WeightContainer extends Component {
  state = { newMeasurement: '' };

  handleLogout = () => {
    firebase.auth().signOut();
  };

  handleInputChange = (e) => {
    this.setState({ newMeasurement: e.target.value });
  };

  handleSubmit = () => {
    this.props.onSubmit(this.state.newMeasurement);
    this.setState({ newMeasurement: '' });
  };

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.handleSubmit();
    }
  };

  componentDidMount() {
    // Get records for user
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        firebase.database().ref(`waist/${user.uid}`).on('value', (snapshop) => {
          console.log(snapshop);
        });
      } else {
        console.log('User not available.');
      }
    });
  }

  render() {
    return (
      <div id="WeightContainer" className="inner-container">
        <Header>
          <button className="red" onClick={this.handleLogout}>
            Logout
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
            {this.props.records.map((rec, i) => (
              <tr id={rec.id}>
                <td>{rec.id}</td>
                <td>{rec.cm}</td>
              </tr>
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
