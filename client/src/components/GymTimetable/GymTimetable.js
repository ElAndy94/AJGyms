import React from "react";

import classes from './GymTimetable.css';

const gymTimetable = (props) => (
// {
  <article className={classes.Post} onClick={props.clicked}>
        <h1>{props.title}</h1>
        <div className={classes.Info}>
            <div className={classes.Author}>{props.author}</div>
        </div>
    </article>
);
  // const gymClasses = [];

  // for (let gymclass in props.gymClasses) {
  //   gymClasses.push({
  //     name: gymClassName,
  //     amount: props.gymClasses[gymClassName]
  //   });
  // }

  // const gymClassOutput = gymClasses.map(classes => {
  //   return <span
  //       style={{
  //         textTransform: 'capitalize',
  //         display: 'inline-block',
  //         margin: '0 8px',
  //         border: '1px solid #ccc',
  //         padding: '5px'
  //       }}
  //       key={classes.name}>{classes.name} ({classes.amount})</span>;
  // })


  // return (
  //   <div className={classes.GymTimetable}>
  //     <h3 style={{paddingBottom: '6px'}}>Hope you enjoy these classes</h3>
  //     <div>
  //       <div className={classes.Card}>
  //           <div className={classes.Container}>
  //             <h4><b>Power</b></h4>
  //             <b>09:00 - 09:45</b>
  //             <p>Strength and Conditioning (Advanced)</p>
  //           </div>
  //       </div>
  //       <div className={classes.Card}>
  //           <div className={classes.Container}>
  //             <h4><b>Cardio</b></h4>
  //             <b>17:00 - 16:00</b>
  //             <p>Endurance Training (Beginner)</p>
  //           </div>
  //       </div>
  //       <div className={classes.Card}>
  //           <div className={classes.Container}>
  //             <h4><b>Core</b></h4>
  //             <b>16:45 - 17:45</b>
  //             <p>Body Weight & Abs Workout (Intermidiate)</p>
  //           </div>
  //       </div>
  //     </div>
  //   </div>
  // );
// };

export default gymTimetable;


//   return (
//     <div className={classes.GymTimetable}>
//     <p>Ingredients: {gymClassOutput}</p>
//     <p>Price: <strong>GPD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
//   </div>
//   );
// };
