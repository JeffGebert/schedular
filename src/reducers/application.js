
export const SET_DAY = "SET_DAY";
export const SET_DAYS = "SET_DAYS";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";
export const DELETE_INTERVIEW = "DELETE_INTERVIEW";


export default function reducer(state, action) {
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
          interview: action.interview ?  { ...action.interview } : null
        };
        const appointments = {
          ...state.appointments,
          [action.id]: appointment
        };
        const appointmentIds = state.days.find(day => day.name === state.day).appointments;
        const appointmentsForDay = Object.values(appointments).filter(appointment => appointmentIds.includes(appointment.id))
        const spots = appointmentsForDay.reduce((totalSpots, appointment) => {
          if (!appointment.interview) {
            totalSpots += 1;
          }
          return totalSpots;
        }, 0)
        const days = state.days.map(day => {
          if (day.name ===  state.day) {
            day.spots = spots;
          }
          return day
          
        })
        return {
          ...state,
          days,
          appointments
        }
      }
      
      default:
  
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
  
  
    }
  };