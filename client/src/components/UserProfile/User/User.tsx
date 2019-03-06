import React from 'react';

import Button from '../../UI/Button/Button';
import './User.scss';

interface Props {
  // name: string;
  // email: string;
  // address: string;
  // contract: string;
  // date: Date;
  // payment: string;
  // gymLocation: string;
  // pt: boolean;
  // goal?: string;

  user: any[string];
  edit: () => void;
}

const user = (props: Props) => (
  <React.Fragment>
    <h1>Welcome Back {props.user.name}</h1>
    <div className='Card__Headers'>Your Package</div>
    Manchester {props.user.gymLocation} <br /> {props.user.payment} <br />{' '}
    {props.user.contract}
    <div className='Card__Headers'>
      Your Details
      <Button btnType='Edit' clicked={props.edit}>
        Edit
      </Button>
    </div>
    {props.user.name} <br /> {props.user.email}
    <div className='Card__Headers'>Address</div>
    <p>{props.user.address}</p>
    <div className='Card__Headers'>Payment Information</div>
    <p>Direct Debit: Card ending 7070</p>
    <Button btnType='Danger'>Cancel Your Membership</Button>
  </React.Fragment>
);
export default user;
