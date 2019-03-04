import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Aux from '../../hoc/ReactAux';
import Button from '../../components/UI/Button/Button';
import GymImg from '../../assets/images/thegym.png';
import './DashBoard.scss';

class DashBoardBuilder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      joinNow: false
    };

    this.joinNowClicked = this.joinNowClicked.bind(this);
  }

  joinNowClicked() {
    console.log('tell me i clicked');
    this.setState({ joinNow: true });
  }

  render() {
    if (this.state.joinNow === true) {
      return <Redirect to='/signup' />;
    }

    return (
      <Aux>
        <div className='DashBoard'>
          <h2>AJ GYMS</h2>
          <div>
            <img className='img' src={GymImg} alt='AJGYM' />
          </div>
          <p>
            Stop waiting... <br /> make a difference now!
          </p>
          <p>Join today and pay no joining fee.</p>
          <p>Bring a friend, signup and first month becomes FREE!</p>
          {!this.props.isAuthenticated ? (
            <Button btnType='Signup' clicked={this.joinNowClicked}>
              Join Now
            </Button>
          ) : (
            <p />
          )}
        </div>
      </Aux>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.userId !== ''
});

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(DashBoardBuilder)
);
