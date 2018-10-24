import React from "react";

import classes from './GymTimetable.css';

const gymTimetable = (props) => {
  return (
    <div className={classes.GymTimetable}>
      <h3>Hope you enjoy these classes</h3>
      <div>
        <div className={classes.Card}>
            <div className={classes.Container}>
              <h4><b>Power</b></h4>
              <b>09:00 - 09:45</b>
              <p>Strength and Conditioning (Advanced)</p>
            </div>
        </div>
        <div className={classes.Card}>
            <div className={classes.Container}>
              <h4><b>Cardio</b></h4>
              <b>17:00 - 16:00</b>
              <p>Endurance Training (Beginner)</p>
            </div>
        </div>
        <div className={classes.Card}>
            <div className={classes.Container}>
              <h4><b>Core</b></h4>
              <b>16:45 - 17:45</b>
              <p>Body Weight & Abs Workout (Intermidiate)</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default gymTimetable;
