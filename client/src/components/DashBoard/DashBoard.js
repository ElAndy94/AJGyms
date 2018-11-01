import React from 'react';
import { withRouter } from 'react-router-dom';
// import  { Redirect } from 'react-router-dom'

import classes from './DashBoard.css';
import Button from '../UI/Button/Button';
import GymImg from '../../assets/images/thegym.png';

const dashBoard = (props) => {

  return (
    <div className={classes.DashBoard}>
      <h2>AJ GYMS</h2>
    <div>
      <img className={classes.img} src={GymImg} alt="AJGYM" />
    </div>
        <p>Stop waiting... <br/> make a difference now!</p>
        <p>Join today and pay no joining fee.</p>
        <p>Bring a friend, signup and first month becomes FREE!</p>
        <Button btnType="Success">Join Now!</Button>
        {/* clicked={props.history.push("/signup")} */}
    </div>
  );
}

export default withRouter(dashBoard);
