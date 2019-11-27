import React from "react";
import classNames from "classnames";
import DayListItem from "components/DayListItem.js";


export default function DayList(props) {
  
  const days = props.days.map(day => {
    return (
      <DayListItem
        key={day.id}
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.value}
        setDay={(event) => props.onChange(day.id)} 
       />
    );
  });

  return(
    <ul>
      {days}
    </ul>
  );




}




