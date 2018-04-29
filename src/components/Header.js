import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { captialize } from '../helpers';

class Header extends Component {
  handleChange = e => {
    this.props.history.push(e.target.value);
  };

  render() {
    return (
      <div id="Header">
        <img src="/assets/noun_1699454_cc.svg " alt="logo" />
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
