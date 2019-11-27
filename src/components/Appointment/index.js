import "components/Appointment/styles.scss";
import React, { Fragment } from 'react'
import Header from "components/Appointment/Header.js"
import Empty from "components/Appointment/Empty.js"
import Show from "components/Appointment/Show.js"


export default function Appointment(props) {
  

  return(
    <article className="appointment"> 
      <Header time={props.time} />
      {props.interview ? <Show/> : <Empty/>}
    </article>
  );




}
