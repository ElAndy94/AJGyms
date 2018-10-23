import React from 'react';

import classes from './Footer.css';

const footer = (props) => {
  return (
    <div className={classes.Footer}>
      <hr/>
      <table style={{width: '100%'}}>
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
}

export default footer;
