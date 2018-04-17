import React from 'react';

const WaistRecord = (date, measurement) => {
  return (
    <tr>
      <td>{date}</td>
      <td>{measurement}</td>
    </tr>
  );
};

export default WaistRecord;
