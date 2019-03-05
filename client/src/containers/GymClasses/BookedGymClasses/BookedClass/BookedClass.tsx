import React, { Component } from 'react';
import axios from 'axios';

import './BookedClass.scss';
import Button from '../../../../components/UI/Button/Button';

interface Props {
  userId: string;
  classId: string;
}

class BookedClass extends Component<Props> {
  state = {
    loadedClass: null
  };

  componentDidUpdate() {
    if (this.props.classId) {
      if (
        !this.state.loadedClass ||
        (this.state.loadedClass &&
          this.state.loadedClass._id !== this.props.classId)
      ) {
        axios.get('/api/classes/' + this.props.classId).then(response => {
          this.setState({ loadedClass: response.data });
        });
      }
    }
  }

  deleteClassHandler = () => {
    axios
      .delete(
        '/api/classes/' + this.props.classId + '/user/' + this.props.userId
      )
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    let gymClass: any = '';
    // let gymClass = <p style={{ textAlign: 'center', color: 'white', fontSize: '26px', fontWeight: '400'}}>Please select a Class!</p>;
    if (this.props.classId) {
      gymClass = <p style={{ textAlign: 'center' }}>Loading...!</p>;
    }
    if (this.state.loadedClass) {
      gymClass = (
        <div className='BookedClass'>
          <h1>{this.state.loadedClass.location}</h1>
          <p>{this.state.loadedClass.type}</p>
          <p>{this.state.loadedClass.name}</p>
          <p>{this.state.loadedClass.time}</p>
          <div className='Edit'>
            <Button
              clicked={() => {
                this.deleteClassHandler();
              }}
              btnType='Danger'
            >
              Delete
            </Button>
          </div>
        </div>
      );
    }
    return gymClass;
  }
}

export default BookedClass;