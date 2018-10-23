import React from "react";

import classes from './GymTimetable.css';

const gymTimetable = (props) => {
  return (
    <div className={classes.GymTimetable}>
      <h1>Hope you enjoy these classes</h1>
      <table style={{width: '100%', margin: 'auto'}}>
        <tbody>
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Age</th>
          </tr>
          <tr>
            <td>Jill</td>
            <td>Smith</td>
            <td>50</td>
          </tr>
          <tr>
            <td>Eve</td>
            <td>Jackson</td>
            <td>94</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default gymTimetable;
