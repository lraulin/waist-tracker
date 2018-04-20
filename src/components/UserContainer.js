import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { adonisIndex } from '../helpers';

export default class UserContainer extends Component {
  state = {
    height: '',
    idealWaist: '',
    idealShoulders: '',
    heightEntered: false
  };

  handleSubmit = e => {
    console.log('handle submit');
    e.preventDefault();
    const height = e.target.value;
    const { idealShoulders, idealWaist } = adonisIndex();
    this.setState({ height, idealShoulders, idealWaist, heightEntered: true });
  };

  handleInput = e => {
    this.setState({ height: e.target.value });
  };

  handleKeyDown = e => {
    // e
  };

  render() {
    return (
      <div id="UserContainer" className="inner-container">
        <Header>
          <Link to="/">
            <button className="red">Back To Chat</button>
          </Link>
        </Header>
        <h1>User</h1>
        {!this.state.heightEntered ? (
          <div id="enterHeight">
            <p>Enter your height in cm.</p>
            <input
              type="number"
              onInput={this.handleInput}
              onKeyDown={this.handleKeyDown}
            />
            <button type="submit" onClick={this.handleSubmit}>
              OK
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}
