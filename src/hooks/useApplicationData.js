import { useState, useEffect } from "react";
import axios from "axios"

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, [])
  
  const setDay = day => setState({...state, day});

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios.put(`/api/appointments/${id}`, {interview})
    .then((response) => {
        const days = updateSpots(state, false, id);
        setState({...state, appointments, days})
      }).catch((err) => console.log(err))
  };

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then((response) => {
        const days = updateSpots(state, true, id);
        setState({...state, appointments, days});
      }).catch((err) => console.log(err))
  };

  // What are we trying to do? Update days[day].spots (spots for a certain day)
  function updateSpots(state, cancelInterview, id) {
    const { day, days, appointments } = state;
    
    // find the correct day object, inside the days array (array of day objects)
    const foundDay = days.find(d => d.name === day);
    
    // find appointments (array) for a given day
    let spots = 0;
    
    //Find available appointments for a given day
    for (let appointmentId of foundDay.appointments) {
      if (appointments[appointmentId].interview === null) {
        // count how many appointments have a null interview
        spots++
      }
    }
    
    if (cancelInterview) {
      spots++;
    } else if (!cancelInterview && appointments[id].interview === null) {
      spots--;
    }

    // update days[day].spots
    const newDay = {...foundDay, spots} 
    const newDays = days.map(dayElm => dayElm.name === day ? newDay : dayElm)
    
    return newDays;
  }

  return { state, setDay, bookInterview, cancelInterview };
}