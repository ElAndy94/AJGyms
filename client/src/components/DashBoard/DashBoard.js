import React from 'react';

import classes from './DashBoard.css';
import GymImg from '../../assets/images/gym-dashboard.jpeg';

const dashBoard = (props) => {
  return (
    <div className={classes.DashBoard}>
      {/* style={{backgroundImage:`url(${GymImg})`}} */}
      {/* <p> A & J </p>
      <p> Gyms </p> */}
      <img className={classes.img} src={GymImg} alt="AJGYM" />
    </div>
  );
}

export default dashBoard;
