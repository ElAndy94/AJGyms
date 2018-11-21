import React, { Component } from 'react';
import axios from 'axios';

import Aux from '../../hoc/ReactAux';
import classes from './Admin.css';
import GymTimetable from '../../components/GymTimetable/GymTimetable';
import User from '../../components/User/User';
import FullGymClass from '../../containers/GymClasses/FullGymClass/FullGymClass';
// import AdminComp from '../../components/AdminComp/AdminComp';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
    user: {},
    users: [],
    filteredUsers: [],
    gymClasses: [],
    filteredClasses: [],
  }
}
  componentDidMount () {
    axios.get('/api/auth/' + this.props.userId )
      .then( response => {
          this.setState({ user: response.data });
      });

    axios.get('/api/auth/')
      .then( response => {
        const users = response.data;
        const updatedUsers = users.map(user => {
          return {
            ...user,
          }
        });
        this.setState({ users: updatedUsers, filteredUsers: updatedUsers });
      })
      .catch(error => {
        console.log(error);
      });

      axios.get('/api/classes')
      .then(response => {
        const gymClasses = response.data;
        const updatedGymClasses = gymClasses.map(gymClass => {
          return {
            ...gymClass,
          }
        });
        this.setState({gymClasses: updatedGymClasses, filteredClasses: updatedGymClasses});
      })
      .catch(error => {
        console.log(error);
      });
  }

  userSelectedHandler = (id) => {
    this.setState({selectedUserId: id});
  }

  classSelectedHandler = (id) => {
    this.setState({selectedClassId: id});
  }

  render() {
    const users = this.state.filteredUsers.map(user => {
      return  (
      <User
        key={user._id}
        name={user.name}
        email={user.email}
        address={user.address}
        contract={user.contract}
        date={user.date}
        payment={user.payment}
        goal={user.goal}
        gymLocation={user.gymLocation}
        pt={user.pt}
        clicked={() => this.userSelectedHandler(user._id)}/>
      );
    });

    const gymClasses = this.state.filteredClasses.map(gymClass => {
      return  (
      <GymTimetable
        key={gymClass._id}
        location={gymClass.location}
        classType={gymClass.type}
        className={gymClass.name}
        startTime={gymClass.time}
        ptName={gymClass.ptName}
        clicked={() => this.classSelectedHandler(gymClass._id)}/>
      );
    });

    return (
      <Aux>
        <div className={classes.BackGround}>
          {/* <AdminComp user={this.state.user} /> */}
          <h1 className={classes.FancyFont}> Users </h1>
          <div className={classes.Users}>
            {users}
          </div>
          <h1 className={classes.FancyFont}> Gym Classes </h1>
          <div className={classes.GymClasses}>
            {gymClasses}
          </div>
          <FullGymClass userId={this.props.userId} isPt={this.props.isPt} isAdmin={this.props.isAdmin} id={this.state.selectedClassId} onDelete={this.handleDelete} />
        </div>
      </Aux>
    );
  }
}

export default Admin;
