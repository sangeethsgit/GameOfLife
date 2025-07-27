import React from 'react';

const RewardsTable = ({ rewards }) => {
  return (
    <table className="rewards-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Metro</th>
          <th>Electric Bus</th>
          <th>City Bus</th>
          <th>Water Metro</th>
          <th>MyByke</th>
          <th>Total Points</th>
        </tr>
      </thead>
      <tbody>
        {rewards.map((entry, index) => {
          const total = entry.metro * 10 + entry.eBus * 8 + entry.cityBus * 7 + entry.waterMetro * 4 + entry.myByke * 12;
          return (
            <tr key={index}>
              <td>{entry.date}</td>
              <td>{entry.metro}</td>
              <td>{entry.eBus}</td>
              <td>{entry.cityBus}</td>
              <td>{entry.waterMetro}</td>
              <td>{entry.myByke}</td>
              <td>{total}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default RewardsTable;
