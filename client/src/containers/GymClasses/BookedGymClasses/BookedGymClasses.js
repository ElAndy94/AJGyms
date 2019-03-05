import React, { Component } from 'react';
import { connect } from 'react-redux';

import BookedClasses from '../../../components/BookedClasses/BookedClasses';
import './BookedGymClasses.scss';
import BookedClass from './BookedClass/BookedClass';
import * as actions from '../../../store/actions/index';

class BookedGymClasses extends Component {
  state = {};

  componentWillMount() {
    this.props.bookedClasses(this.props.userId);
  }

  classSelectedHandler = classId => {
    this.setState({ selectedClassId: classId });
  };

  render() {
    const gymClasses = this.props.classes.map(gymClass => {
      return (
        <BookedClasses
          key={gymClass._id}
          location={gymClass.location}
          classType={gymClass.type}
          className={gymClass.name}
          startTime={gymClass.time}
          clicked={() => this.classSelectedHandler(gymClass._id)}
        />
      );
    });

    return (
      <React.Fragment>
        <div className='BackGround'>
          <section className='Classes'>{gymClasses}</section>
          <BookedClass
            userId={this.props.userId}
            classId={this.state.selectedClassId}
          />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  classes: state.classes.classes
});

const mapDispatchToProps = dispatch => ({
  bookedClasses: id => dispatch(actions.bookedClasses(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookedGymClasses);
