export function getAppointmentsForDay(state, day) {
  
  let appointmentArr = [];
  const stateArr = state.days

  for (let object of stateArr) {
    if (object["name"] === day) {
      appointmentArr = object["appointments"]
      break;
    }
  }

  let result = [];

  for (let appointmentId of appointmentArr) {
    result.push(state.appointments[appointmentId])
  }

  return result

}