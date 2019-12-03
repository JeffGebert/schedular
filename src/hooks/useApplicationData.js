import React, {useEffect, useReducer} from 'react'
import axios from 'axios';

const SET_DAY = "SET_DAY";
const SET_DAYS = "SET_DAYS";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day:action.day};
    case SET_DAYS:
      return { ...state, days:action.days};
    case SET_APPLICATION_DATA:
      return { ...state, days:action.days, appointments: action.appointments, interviewers: action.interviewers}
    case SET_INTERVIEW: {
      const appointment = {
        ...state.appointments[action.id],
        interview: { ...action.interview }
      };
      const appointments = {
        ...state.appointments,
        [action.id]: appointment
      };
      
      return {...state, appointments}
    }
    default:

      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );


  }
};




export default function useApplicationData(initial) {
  
  
  
  const [state, dispatch] = useReducer(reducer,{
    day:"Monday",
    days:[],
    appointments: {}
  });

//   axios.get(`http://localhost:8001/api/days`).then((res) => {
//         dispatch( { type: SET_DAYS, days:res.data})
  
// })
  const setDay = day => dispatch({type: SET_DAY, day});
  
  function bookInterview(id, interview) {
    
    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
    .then(()=> {
      dispatch({ type: SET_INTERVIEW, id, interview });

      axios.get(`http://localhost:8001/api/days`).then((res) => {
         dispatch( { type: SET_DAYS, days:res.data})
      })
  })
}
  function cancelInterview(id, interview) {
    
    
    return axios.delete(`http://localhost:8001/api/appointments/${id}`, {interview})
    .then(()=> {
      
      dispatch({ type: SET_INTERVIEW, id, interview: null});
      dispatch({ type: SET_INTERVIEW, id, interview });
      return axios.get(`http://localhost:8001/api/days`)
      .then((res)=> {
        dispatch({ type: SET_INTERVIEW, id, interview });
        axios.get(`http://localhost:8001/api/days`).then((res) => {
        dispatch( { type: SET_DAYS, days:res.data})
     })
      })
    })
  
  }



  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8001/api/days`),
      axios.get(`http://localhost:8001/api/appointments`),
      axios.get(`http://localhost:8001/api/interviewers`),

    ]).then((all) => {
      dispatch( {type: SET_APPLICATION_DATA, days:all[0].data, appointments:all[1].data, interviewers:all[2].data})
    });
  }, []);

   
  
return { 
      state,
      setDay,
      bookInterview,
      cancelInterview
};
}
  