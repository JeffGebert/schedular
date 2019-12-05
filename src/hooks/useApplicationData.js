import React, {useEffect, useReducer} from 'react'
import axios from 'axios';

import reducer, {
  SET_DAY,
  SET_DAYS,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
  DELETE_INTERVIEW

} from "../reducers/application";


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
    
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(()=> {
      dispatch({ type: SET_INTERVIEW, id, interview });

      axios.get(`/api/days`).then((res) => {
         dispatch( { type: SET_DAYS, days:res.data})
      })
  })
}
  function cancelInterview(id, interview) {
    
    
    return axios.delete(`/api/appointments/${id}`, {interview})
    .then(()=> {
      
      dispatch({ type: DELETE_INTERVIEW, id});
      return axios.get(`/api/days`)
      .then((res)=> {
        axios.get(`/api/days`).then((res) => {
        dispatch( { type: SET_DAYS, days:res.data})
     })
      })
    })
  
  }

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),

    ]).then((all) => {
      console.log('USING', all[0].data)
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
  