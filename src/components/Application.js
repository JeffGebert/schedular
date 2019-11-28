import React, { Fragment, useState, useEffect } from 'react'
import Appointment from "components/Appointment/index.js";
import DayList from "components/DayList";
import "components/Application.scss";
import axios from 'axios';
import {getAppointmentsForDay} from '../helpers/selectors'




export default function Application(props) {

  
  
  
  const [state, setState] = useState({
    day:"Monday",
    days:[],
    appointments: {}
  });
  
  const setDay = day => setState(prev => ({ ...prev, day }));
  
  const appointmentsList = getAppointmentsForDay(state,state.day).map(appointment=> {
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time} 
        interview={appointment.interview}
       />
    );
  });
  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`),
      axios.get(`http://localhost:8001/api/interviewers`),

    ]).then((all) => {
      setState(prev => ({...prev, ...{days:all[0].data, appointments:all[1].data, interviewers:all[2].data}}))
    });
  });

  return (
    <main className="layout">
      <section className="sidebar">
      <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
          />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
          />}
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />}
        </section>
      <section className="schedule">
        {appointmentsList}
      </section>
    </main>
  );
}
