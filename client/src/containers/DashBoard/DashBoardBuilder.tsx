import React, { useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from '../../components/UI/Button/Button';
import './DashBoard.scss';

interface Props {
  isAuthenticated: boolean;
}

const dashBoardBuilder = (props: Props) => {
  const [joinNow, setJoinNow] = useState(false);

  const joinNowClicked = () => {
    setJoinNow(true);
  };

  if (joinNow === true) {
    return <Redirect to='/signup' />;
  }

  return (
    <React.Fragment>
      <div className='dashBoard__background'>
        <h2>AJ GYMS</h2>
        <div className='dashboard__img' />
        <p>
          Stop waiting... <br /> make a difference now!
        </p>
        <p>Join today and pay no joining fee.</p>
        <p>Bring a friend, signup and first month becomes FREE!</p>
        {!props.isAuthenticated ? (
          <Button btnType='Signup' clicked={() => joinNowClicked()}>
            Join Now
          </Button>
        ) : (
          <p />
        )}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.userId !== ''
});

export default withRouter(
  //@ts-ignore
  connect(
    mapStateToProps,
    null
  )(dashBoardBuilder)
);
