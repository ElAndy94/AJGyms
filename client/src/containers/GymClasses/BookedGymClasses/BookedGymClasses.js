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
        const updatedClasses = classes.map(bookedClass => {
          return {
            ...bookedClass,
          }
        });
        this.setState({classes: updatedClasses});
      })
      .catch(error => {
        console.log(error);
      });

    // const classes = this.state.classes;
    // const bookedClasses = classes.map(bookedClass => {
    //     return {
    //       ...bookedClass,
    //     }
    // });

    // axios.get('/api/classes/booked', bookedClasses)
    //   .then(response => {
    //     const gymClasses = response.data;
    //     const updatedClasses = gymClasses.map(bookedClass => {
    //       return {
    //         ...bookedClass,
    //       }
    //     });
    //     this.setState({gymClasses: updatedClasses});
    //     // console.log(this.state.classes);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });


    // JOSH THIS IS WHERE YOU NOW NEED TO COMPARE THE ID OF THESE CLASSES WITH THE ID OF THE CLASSES ONTOP
    // SO IT WOULD BE THESE  classes: []  WITH  gymClasses: []
    // THEN ONLY DISPLAY THE CLASSES IN THE GYMCLASS

    axios.get('/api/classes')
      .then(response => {
        const gymClasses = response.data;
        const updatedGymClasses = gymClasses.map(gymClass => {
          return {
            ...gymClass,
          }
        });
        console.log(gymClasses);
        this.setState({gymClasses: updatedGymClasses});
      })
      .catch(error => {
        console.log(error);
      });

  }

  render() {
    const gymClasses = this.state.gymClasses.map(gymClass => {
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
