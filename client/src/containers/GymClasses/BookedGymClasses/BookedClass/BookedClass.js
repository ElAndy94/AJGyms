import React, { Component } from 'react';
import axios from 'axios';

import classes from './BookedClass.css';
import Button from '../../../../components/UI/Button/Button';

class BookedClass extends Component {
    state = {
        loadedClass: null
    }

    componentDidUpdate () {
      if ( this.props.classId ) {
          if ( !this.state.loadedClass || (this.state.loadedClass && this.state.loadedClass._id !== this.props.classId) ) {
            axios.get( '/api/classes/' + this.props.classId )
                .then( response => {
                    this.setState( { loadedClass: response.data } );
                });
          }
      }
    }

    deleteClassHandler = () => {
      axios.delete('/api/classes/' + this.props.classId + '/user/' + this.props.userId)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }

    render () {
        let gymClass = '';
        // let gymClass = <p style={{ textAlign: 'center', color: 'white', fontSize: '26px', fontWeight: '400'}}>Please select a Class!</p>;
        if ( this.props.classId ) {
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
                    <Button clicked={() => {this.deleteClassHandler(); }} btnType="Danger">Delete</Button>
                  </div>
              </div>

          );
        }
        return gymClass;
    }
}

export default BookedClass;
