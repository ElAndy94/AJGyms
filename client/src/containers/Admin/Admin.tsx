import React, { Component } from 'react';
import axios from 'axios';

import './Admin.scss';
// import User from '../../components/User/User';
import SelectedUser from './SelectedUser/SelectedUser';
import { updateObject, checkValidity } from '../../shared/utility';
import Input from '../../components/UI/Input/Input';
// import Button from '../../components/UI/Button/Button';

interface Props {
  userId?: string;
  isAdmin?: boolean;
}

interface State {
  gymForm: any;
  filteredUsers: [];
  user: {};
  users: [];
  selectedUserId?: string;
  handleDelete?: () => void;
}

class Admin extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      user: {},
      users: [],
      filteredUsers: [],
      gymForm: {
        gymLocation: {
          elementType: 'select',
          elementConfig: {
            options: [
              { value: 'All Gyms', displayValue: 'All Gyms' },
              { value: 'Market Street', displayValue: 'Market Street' },
              { value: 'Portland Street', displayValue: 'Portland Street' },
              { value: 'Oxford Road', displayValue: 'Oxford Road' }
            ]
          },
          value: 'All Gyms',
          validation: {},
          valid: true
        }
      }
    };
  }
  componentDidMount() {
    axios.get('/api/auth/' + this.props.userId).then(response => {
      this.setState({ user: response.data });
    });

    axios
      .get('/api/auth/')
      .then(response => {
        const users = response.data;
        const updatedUsers = users.map((user: any) => {
          return {
            ...user
          };
        });
        this.setState({ users: updatedUsers, filteredUsers: updatedUsers });
      })
      .catch(error => {
        console.log(error);
      });
  }

  inputChangedHandler = (event: any, inputIdentifier: string) => {
    const updatedFormElement = updateObject(
      this.state.gymForm[inputIdentifier],
      {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.gymForm[inputIdentifier].validation
        ),
        touched: true
      }
    );
    const updatedGymForm = updateObject(this.state.gymForm, {
      [inputIdentifier]: updatedFormElement
    });

    const theEvent = event.target.value;

    this.checkEvent(theEvent, inputIdentifier);

    this.setState({ gymForm: updatedGymForm });
  };

  checkEvent(theEvent: string, inputIdentifier: string) {
    if (inputIdentifier === 'gymLocation') {
      this.filterUsers(theEvent, 'gymLocation');
    }
  }

  filterUsers(selectedValue: string, type: string) {
    const newFilteredUsers = this.state.filteredUsers.filter((value: any) => {
      return value[type] === selectedValue;
    });
    // @ts-ignore
    this.setState({ filteredUsers: newFilteredUsers });
  }

  userSelectedHandler = (id: string) => {
    this.setState({ selectedUserId: id });
  };

  render() {
    const users = this.state.filteredUsers.map((user: any) => {
      return (
        <p>Needs fixing</p>
        // <User
        //   key={user._id}
        //   name={user.name}
        //   email={user.email}
        //   address={user.address}
        //   contract={user.contract}
        //   date={user.date}
        //   payment={user.payment}
        //   goal={user.goal}
        //   gymLocation={user.gymLocation}
        //   pt={user.pt}
        //   clicked={() => this.userSelectedHandler(user._id)}
        // />
      );
    });

    const formElementsArray = [];
    for (let key in this.state.gymForm) {
      formElementsArray.push({
        id: key,
        config: this.state.gymForm[key]
      });
    }
    let form = (
      <form>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            invalid={!formElement.config.valid}
            changed={(event: any) =>
              this.inputChangedHandler(event, formElement.id)
            }
          />
        ))}
      </form>
    );
    return (
      <React.Fragment>
        <div className='BackGround'>
          <h1 className='FancyFont'> Users </h1>
          <div className='DropDown'>{form}</div>
          <div className='Users'>{users}</div>
          <SelectedUser
            userId={this.props.userId}
            isAdmin={this.props.isAdmin}
            id={this.state.selectedUserId}
            // onDelete={this.handleDelete}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Admin;
