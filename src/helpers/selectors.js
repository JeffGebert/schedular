export function getAppointmentsForDay(state, day) {

  const selectedDay = state.days.find(d => d.name === day)
  
  if (!selectedDay || !selectedDay.appointments.length) {
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

