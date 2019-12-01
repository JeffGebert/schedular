import React, {useEffect, useReducer} from 'react'
import axios from 'axios';

export default function useApplicationData(initial) {

  const [state, setState] = useState({
    day:"Monday",
    days:[],
    appointments: {}
  });


  const setDay = day => setState(prev => ({ ...prev, day }));

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };


    return axios.put(`http://localhost:8001/api/appointments/${appointment.id}`, {interview})
    .then(
    setState((state) => ({...state, appointments}))
    )
    
  }

  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };


    return axios.delete(`http://localhost:8001/api/appointments/${appointment.id}`, {interview})
    .then(
    setState((state) => ({...state, appointments}))
    )

    
    
  };


  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`),
      axios.get(`http://localhost:8001/api/interviewers`),

    ]).then((all) => {
      setState(prev => ({...prev, ...{days:all[0].data, appointments:all[1].data, interviewers:all[2].data}}))
    });
  }, []);

      
  
return { 
      state,
      setDay,
      bookInterview,
      cancelInterview
};

}

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { /* insert logic */ }
    case SET_APPLICATION_DATA:
      return { /* insert logic */ }
    case SET_INTERVIEW: {
      return /* insert logic */
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}