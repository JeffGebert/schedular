import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";


export default function DayListItem(props) {

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });

  const formatSpots = function (spotAmount) {
    if (spotAmount === 0) {
      return "no spots remaining"
    } else if (spotAmount === 1) {
      return `${spotAmount} spot remaining`
    } else {
      return `${spotAmount} spots remaining`
    }

  }

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)} >
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  )
}