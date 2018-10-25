import React from 'react';

import classes from './Footer.css';

const footer = (props) => {
  return (
    <div className={classes.Footer}>
      <table>
        <tbody>
        <tr>
          <th>Our Gyms</th>
          <th>Help</th>
          <th>T & C's</th>
        </tr>
        <tr>
          <td>Gym Offers</td>
          <td>Help Center</td>
          <td>Privacy</td>
        </tr>
        <tr>
          <td>Classes</td>
          <td>Contact Us</td>
          <td>Cookies</td>
        </tr>
        </tbody>
      </table>
    </div>
  );
}

export default footer;
