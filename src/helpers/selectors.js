export function getAppointmentsForDay(state, day) {

  const selectedDay = state.days.find(d => d.name === day)
  
  if (!selectedDay ||!selectedDay.appointments.length) {
    return [];
  }
  
  const appointments = [];

  selectedDay.appointments.forEach(appointmentId => {
    if (String(appointmentId) in state.appointments) {
      appointments.push(state.appointments[String(appointmentId)])
    }
    
  });

  return appointments;
  
}

export function getInterviewersForDay(state, day) {

  const selectedDay = state.days.find(d => d.name === day)
  
  if (!selectedDay ||!selectedDay.appointments.length) {
    return [];
  }
  
  const interviewers = [];

  selectedDay.interviewers.forEach(interviewerId => {
    if (String(interviewerId) in state.interviewers) {
      interviewers.push(state.interviewers[String(interviewerId)])
    }
    
  });

  return interviewers;
  
}


export function getInterview(state, interview) {

  
  if (interview === null) {
    return null;
  } else {
    const interviewObject = {};
  
    interviewObject["student"]=interview.student
    const interviewerId = interview.interviewer
  
    interviewObject["interviewer"]=state.interviewers[interviewerId]
  
    
    
    return interviewObject;
    

  }


}