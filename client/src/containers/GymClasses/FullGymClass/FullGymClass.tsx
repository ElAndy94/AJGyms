import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import './FullGymClass.scss';
import Button from '../../../components/UI/Button/Button';
import * as actions from '../../../store/actions/index';

interface Props {
  id: string;
  userId: string;
  isPt: boolean;
  isAdmin: boolean;
  onBookClass: ({}) => void;
  onDelete: (string) => void;
}

class FullGymClass extends Component<Props> {
  state = {
    loadedClass: null
  };

  componentDidUpdate() {
    if (this.props.id) {
      if (
        !this.state.loadedClass ||
        (this.state.loadedClass && this.state.loadedClass._id !== this.props.id)
      ) {
        axios.get('/api/classes/' + this.props.id).then(response => {
          this.setState({ loadedClass: response.data });
        });
      }
    }
  }

  bookClassHandler = () => {
    const bookingData = {
      userId: this.props.userId,
      classId: this.props.id
    };
    this.props.onBookClass(bookingData);
  };

  deleteClassHandler = () => {
    // this.props.onDeleteClass(this.props.id);
    axios
      .delete('/api/classes/' + this.props.id)
      .then(response => {
        console.log(response);
        this.props.onDelete(this.props.id);
        this.setState({ loadedClass: null });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    // let gymClass = (
    //   <p style={{ textAlign: 'center', color: 'black', fontSize: '20px' }}>
    //     Please select a Class!
    //   </p>
    // );
    // if (this.props.id) {
    //   gymClass = <p style={{ textAlign: 'center' }}>Loading...!</p>;
    // }
    let gymClass = <p />;
    if (this.state.loadedClass) {
      gymClass = (
        <div className='FullGymClass__BackGround'>
          <div className='FullGymClass'>
            <h1>{this.state.loadedClass.location}</h1>
            <p>{this.state.loadedClass.type}</p>
            <p>{this.state.loadedClass.name}</p>
            <p>{this.state.loadedClass.time}</p>
            <p>{this.state.loadedClass.ptName}</p>
            <div className='button__choice'>
              {this.props.isPt || this.props.isAdmin ? (
                <Button btnType='Danger' clicked={this.deleteClassHandler}>
                  Delete
                </Button>
              ) : (
                <Button btnType='Success' clicked={this.bookClassHandler}>
                  Book Class
                </Button>
              )}
            </div>
          </div>
        </div>
      );
    }
    return gymClass;
  }
}

const mapStateToProps = state => ({
  userId: state.auth.userId,
  isPt: state.auth.isPt,
  isAdmin: state.auth.isAdmin
});

const mapDispatchToProps = dispatch => ({
  onBookClass: bookingData => dispatch(actions.bookClass(bookingData))
  // onDeleteClass: (classId) => dispatch( actions.deleteClass(classId) )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FullGymClass);
