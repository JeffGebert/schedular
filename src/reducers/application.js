
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
          interview: { ...action.interview }
        };
        const appointments = {
          ...state.appointments,
          [action.id]: appointment
        };
        
        return {
          ...state,
          appointments
        }
      }
      case DELETE_INTERVIEW: {
        console.log("deleting", action.id)
        const appointment = {
          ...state.appointments[action.id],
          interview: null
        };
        console.log("appointment", appointment)
        const appointments = {
          ...state.appointments,
          [action.id]: appointment
        };
        console.log("appointments", appointments)
  
        return {
          ...state,
           appointments
          }
    
      }
      default:
  
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
  
  
    }
  };