import React from 'react';

import classes from './Footer.css';

const footer = (props) => {
  return (
    <div className={classes.Footer}>
      <hr/>
      {/* <table style={{width: '100%', margin: 'auto'}}>
        <tr>
          <td>Our gyms</td>
          <td>Get assistance</td>
          <td>Company</td>
          <td>T & C's</td>
        </tr>
        <tr>
          <th>Equipment</th>
          <th>Classes</th>
          <th>Help Centre</th>
          <th>Gym Rules</th>
        </tr>
        <tr>
          <th>Terms & Conditions</th>
          <th>About us</th>
          <th>Careers</th>
        </tr>
      </table> */}
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
