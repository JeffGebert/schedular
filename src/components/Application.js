import React, {useState, useEffect } from 'react'
import Appointment from "components/Appointment/index.js";
import DayList from "components/DayList";
import "components/Application.scss";
import axios from 'axios';
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from '../helpers/selectors'
import useVisualMode from "hooks/useVisualMode.js"
import useApplicationData from "hooks/useApplicationData.js"




export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();


  
  const appointmentsList = getAppointmentsForDay(state, state.day);
  const interviewersList = getInterviewersForDay(state, state.day);

  const schedule = appointmentsList.map((appointment) => {
      const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time} 
        interview={interview}
        interviewers={interviewersList}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
       />
    );
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
        {schedule}
      </section>
    </main>
  );
}
