export function events() {
  return {
    room: {
      click: {
        editRoom: 'startEditRoom',
        currentState: null,
        movePatient: null,
        plan: null
      },
      mouseEnter: {
        editRoom: null,
        currentState: 'roomInfo',
        movePatient: null,
        plan: null
      },
      mouseLeave: {
        editRoom: null,
        currentState: 'hideRoomInfo',
        movePatient: null,
        plan: null
      }
    },
    bed: {
      click: {
        editRoom: 'mark',
        currentState: 'modalPatient',
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
