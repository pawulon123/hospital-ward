export function events() {
  return {
    room: {
      click: {
        editRoom: 'manageBeds',
        currentState: null,
        movePatient: null,
        plan: null
      },
      mouseEnter: {
        editRoom: null,
        currentState: 'bedsPatientInfo',
        movePatient: null,
        plan: null
      },
      mouseLeave: {
        editRoom: null,
        currentState: 'hideBedsPatientInfo',
        movePatient: null,
        plan: null
      }
    }
  }





}
