import React from 'react';
import { captialize } from '../helpers';

const Header = (props) => {
  return (
    <div id="Header">
      <img src="/assets/icon.png" alt="logo" />
      <h1>Fitness Tracker</h1>
      {props.children}
    </div>
  );
};

export default Header;
