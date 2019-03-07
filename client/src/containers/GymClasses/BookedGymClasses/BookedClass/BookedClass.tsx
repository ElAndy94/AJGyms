import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './BookedClass.scss';
import Button from '../../../../components/UI/Button/Button';

interface Props {
  userId: string;
  classId: string;
}

const bookedClass = (props: Props) => {
  const [loadedClass, setLoadedClass] = useState();

  useEffect(() => {
    settingClass();
  });

  const settingClass = () => {
    if (props.classId) {
      if (!loadedClass || (loadedClass && loadedClass._id !== props.classId)) {
        axios.get('/api/classes/' + props.classId).then(response => {
          setLoadedClass(response.data);
        });
      }
    }
  };

  const deleteClassHandler = () => {
    axios
      .delete('/api/classes/' + props.classId + '/user/' + props.userId)
      .then(response => {
        console.log('classID ', props.classId, 'userId ', props.userId);
      })
      .catch(error => {
        console.log(error);
      });
  };

  let gymClass: any = '';
  if (props.classId) {
    gymClass = <p style={{ textAlign: 'center' }}>Loading...!</p>;
  }
  if (loadedClass) {
    gymClass = (
      <div className='BookedClass'>
        <h1>{loadedClass.location}</h1>
        <p>{loadedClass.type}</p>
        <p>{loadedClass.name}</p>
        <p>{loadedClass.time}</p>
        <Button
          clicked={() => {
            deleteClassHandler();
          }}
          btnType='Danger'
        >
          Delete
        </Button>
      </div>
    );
  }
  return gymClass;
};

export default bookedClass;
