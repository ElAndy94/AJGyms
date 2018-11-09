import React, { Component } from 'react'
import axios from 'axios';

import Aux from '../../../hoc/ReactAux';
import BookedClasses from '../../../components/BookedClasses/BookedClasses';
import classes from './BookedGymClasses.css';
import BookedClass from './BookedClass/BookedClass';

class BookedGymClasses extends Component {
  state = {
    classes: []
  }

  componentDidMount() {
    axios.get('/api/auth/booked/' + this.props.userId)
      .then(response => {
        const classes = response.data;
        const updatedClasses = classes.map(bookedClass => ({...bookedClass.classId}));
          // return {
          //   ...bookedClass.classId
          // }
        this.setState({classes: updatedClasses});
      })
      .catch(error => {
        console.log(error);
      });
  }

  classSelectedHandler = (id) => {
    this.setState({selectedClassId: id});
  }

  render() {
      const gymClasses = this.state.classes.map(gymClass => {
        return  (
        <BookedClasses
          key={gymClass._id}
          location={gymClass.location}
          classType={gymClass.type}
          className={gymClass.name}
          startTime={gymClass.time}
          clicked={() => this.classSelectedHandler(gymClass._id)}/>
        );
      });

    return (
      <Aux>
        <div className={classes.BackGround}>
          <section className={classes.Classes}>
            {gymClasses}
          </section>
          <BookedClass userId={this.props.userId} id={this.state.selectedClassId} />
        </div>
      </Aux>
    );
  }
}

export default BookedGymClasses;
