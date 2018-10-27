import React, { Component } from 'react';
import axios from 'axios';

import classes from './FullGymClass.css';

class FullGymClass extends Component {
    state = {
        loadedClass: null
    }

    componentDidUpdate () {
        if ( this.props.id ) {
            if ( !this.state.loadedClass || (this.state.loadedClass && this.state.loadedClass._id !== this.props.id) ) {
                axios.get( '/api/classes/' + this.props.id )
                    .then( response => {
                        console.log(response);
                        this.setState( { loadedClass: response.data } );
                    } );
            }
        }
    }

    deleteClassHandler = () => {
      axios.delete('/api/classes/' + this.props.id)
        .then(response => {
          console.log(response);
        });
    }

    render () {
        let gymClass = <p style={{ textAlign: 'center' }}>Please select a Class!</p>;
        if ( this.props.id ) {
          gymClass = <p style={{ textAlign: 'center' }}>Loading...!</p>;
        }
        if ( this.state.loadedClass ) {
          gymClass = (
                <div className={classes.FullGymClass}>
                    <h1>{this.state.loadedClass.location}</h1>
                    <p>{this.state.loadedClass.type}</p>
                    <p>{this.state.loadedClass.name}</p>
                    <p>{this.state.loadedClass.time}</p>
                    <div className={classes.Edit}>
                        <button onClick={this.deleteClassHandler} className={classes.Delete}>Delete</button>
                    </div>
                </div>

            );
        }
        return gymClass;
    }
}

export default FullGymClass;
