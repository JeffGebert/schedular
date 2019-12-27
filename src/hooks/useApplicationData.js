import React, {useEffect, useReducer} from 'react'
import axios from 'axios';

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,

} from "../reducers/application";


export default function useApplicationData(initial) {
  
  
  
  const [state, dispatch] = useReducer(reducer,{
    day:"Monday",
    days:[],
    appointments: {}
  });


  const setDay = day => dispatch({type: SET_DAY, day});
  
  function bookInterview(id, interview) {
    
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(()=> {
      dispatch({ type: SET_INTERVIEW, id, interview });

  })
}
  function cancelInterview(id, interview) {
    
    
    return axios.delete(`/api/appointments/${id}`, {interview})
    .then(()=> {
      dispatch({ type: SET_INTERVIEW, id, interview:null});
  
    })
  
  }

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),

    ]).then((all) => {
      dispatch( {type: SET_APPLICATION_DATA, days:all[0].data, appointments:all[1].data, interviewers:all[2].data})
    });
  }, []);


  useEffect(() => {
    var exampleSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    exampleSocket.onopen = function (event) {
      exampleSocket.send("ping"); 
    };
    exampleSocket.onmessage = function (event) {
      let msg = JSON.parse(event.data);
      let id = msg.id;
      let interview = msg.interview;
      switch(msg.type) {
        case "SET_INTERVIEW":
        dispatch({ type: SET_INTERVIEW, id, interview });
        break;
        
      }
    }
  }, []);

   
  
return { 
      state,
      setDay,
      bookInterview,
      cancelInterview
};
}
  