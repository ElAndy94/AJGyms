import React, { Component } from 'react'
import axios from 'axios';

import Aux from '../../../hoc/ReactAux';
import BookedClasses from '../../../components/BookedClasses/BookedClasses';
import classes from './BookedGymClasses.css';
import Footer from '../../../components/Footer/Footer';

class BookedGymClasses extends Component {
  state = {
    classes: [],
    gymClasses: [],
  }

  componentDidMount() {
    axios.get('/api/auth/booked/' + this.props.userId)
      .then(response => {
        const classes = response.data;
        const updatedClasses = classes.map(bookedClass => ({...bookedClass.classId}));
          // console.log(bookedClass.classId);
          // return {
          //   ...bookedClass.classId
          // }
        this.setState({classes: updatedClasses});
      })
      .catch(error => {
        console.log(error);
      });
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
        <div className={classes.BookedGymClasses}>
          <section className={classes.Classes}>
            {gymClasses}
          </section>
        </div>
        <Footer />
      </Aux>
    );
  }
}

export default BookedGymClasses;
