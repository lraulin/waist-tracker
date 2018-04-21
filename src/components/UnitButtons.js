import React from 'react';

const UnitButtons = () => {
  <div id="unitButtons">
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
  </div>;
};

export default UnitButtons;
