import React, { Component } from 'react';
import axios from 'axios';

import classes from './BookedClass.css';
// import Button from '../../../components/UI/Button/Button';

class BookedClass extends Component {
    state = {
        loadedClass: null
    }

    componentDidUpdate () {
      if ( this.props.id ) {
          if ( !this.state.loadedClass || (this.state.loadedClass && this.state.loadedClass._id !== this.props.id) ) {
            axios.get( '/api/classes/' + this.props.id )
                .then( response => {
                    this.setState( { loadedClass: response.data } );
                });
          }
      }
    }

    deleteClassHandler = () => {
      const data = {
        userId: this.props.userId,
        classId: this.props.id
      }
      console.log('userID ', this.props.userId);
      console.log('id ', this.props.id);
      axios.delete('/api/classes/remove', data)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }

    deleteUserClassHandler = () => {
      this.deleteClassHandler();
      const data = {
        userId: this.props.userId,
        classId: this.props.id
      }
      axios.delete('/api/auth/remove', data)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }

    // bookClassHandler = () => {
    //   const bookingData = {
    //     userId: this.props.userId,
    //     classId: this.props.id,
    //     date: new Date()
    //   }
    //   axios.post('/api/auth/bookclass', bookingData)
    //     .then( response => {
    //       console.log(response);
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // }

    render () {
        let gymClass = <p style={{ textAlign: 'center' }}>Please select a Class!</p>;
        if ( this.props.id ) {
          gymClass = <p style={{ textAlign: 'center' }}>Loading...!</p>;
        }
        if ( this.state.loadedClass ) {
          gymClass = (
              <div className={classes.BookedClass}>
                  <h1>{this.state.loadedClass.location}</h1>
                  <p>{this.state.loadedClass.type}</p>
                  <p>{this.state.loadedClass.name}</p>
                  <p>{this.state.loadedClass.time}</p>
                  <div className={classes.Edit}>
                    {/* <button onClick={this.bookClassHandler}>Book Class</button> */}
                    <button onClick={this.deleteClassHandler} className={classes.Delete}>Delete</button>
                  </div>
              </div>

          );
        }
        return gymClass;
    }
}

export default BookedClass;
