import React, { Fragment, useState, useEffect } from 'react'
import Appointment from "components/Appointment/index.js";
import DayList from "components/DayList";
import "components/Application.scss";
import axios from 'axios';


const appointments= [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "10am",
    interview: {
      student: "Shawn",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  },
  {
    id: 4,
    time: "9am",
    interview: {
      student: "Lucas",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id: 5,
    time: "8am",
    interview: {
      student: "Jeff",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
];


export default function Application(props) {

  const appointmentsList = appointments.map(appointment=> {
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time} 
        interview={appointment.interview}
       />
    );
  });

  const [day, setDay] = useState("Monday");
  const [days, setDays] =useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8001/api/days`)
    .then(res => {
      console.log("res", res.data);
      setDays(res.data);
    })
  }, [days]);

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
          days={days}
          day={day}
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
