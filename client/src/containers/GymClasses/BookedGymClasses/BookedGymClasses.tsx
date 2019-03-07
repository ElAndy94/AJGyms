import React, { Component } from 'react';
import { connect } from 'react-redux';

import BookedClasses from '../../../components/BookedClasses/BookedClasses';
import './BookedGymClasses.scss';
import BookedClass from './BookedClass/BookedClass';
import * as actions from '../../../store/actions/index';

interface Props {
  userId: string;
  classes: any[];
  bookedClasses: (string) => void;
}

class BookedGymClasses extends Component<Props> {
  state: any = {};

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
        <div className='Booked__BackGround'>
          <section className='Booked__BackGround__Classes'>
            {gymClasses}
          </section>
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
  classes: state.classes.classes,
  userId: state.auth.userId
});

const mapDispatchToProps = dispatch => ({
  bookedClasses: id => dispatch(actions.bookedClasses(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookedGymClasses);
