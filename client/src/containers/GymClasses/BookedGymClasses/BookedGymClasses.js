import React, { Component } from 'react'
// import axios from 'axios';
import { connect } from 'react-redux';

import Aux from '../../../hoc/ReactAux';
import BookedClasses from '../../../components/BookedClasses/BookedClasses';
import classes from './BookedGymClasses.css';
import BookedClass from './BookedClass/BookedClass';
import * as actions from '../../../store/actions/index';

class BookedGymClasses extends Component {

  componentWillMount() {
    this.props.bookedClasses(this.props.userId);
  }

  classSelectedHandler = (id) => {
    this.setState({selectedClassId: id});
  }

  render() {
      const gymClasses = this.props.classes.map(gymClass => {
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
          <BookedClass userId={this.props.userId} id={this.props.selectedClassId} />
        </div>
      </Aux>
    );
  }
}

const mapStateToProps = state => ({
  classes: state.classes.classes
});

const mapDispatchToProps = dispatch => ({
  bookedClasses: (id) => dispatch( actions.bookedClasses(id) ),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookedGymClasses);
