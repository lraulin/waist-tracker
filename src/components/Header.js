import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { captialize } from '../helpers';

class Header extends Component {
  handleChange = (e) => {
    this.props.history.push(e.target.value);
  };

  componentDidMount() {
    console.log('Header Mounted');
  }

  render() {
    return (
      <div id="Header">
        <img src="/assets/icon.png" alt="logo" />
        <h1>Fitness Tracker</h1>
        {this.props.location ? (
          <select
            name="navDropDown"
            id="navDropDown"
            onChange={this.handleChange}
            value={this.props.location.pathname}
          >
            {/* <option value={`/user/${this.props.user.uid}`}>Profile</option> */}
            <option value="/">Waist</option>
            <option value="/shoulders">Shoulders</option>
          </select>
        ) : null}
        {this.props.children}
      </div>
    );
  }
}

export default withRouter(Header);
