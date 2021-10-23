import { EventsRoom } from '../../shared/models/events-room';
import { RoomService } from '../../core/services/room.service';
import { Component } from '@angular/core';
import { Room } from '../../shared/models/room';
@Component({
  selector: 'app-room',
  template: ``,
  styleUrls: ['./room.component.css']

})
export class RoomComponent implements EventsRoom {

  constructor(public roomService: RoomService) { }

  manageBeds(element: any) {
    console.log(element);
  }
  hideBedsPatientInfo(element: any) {
    console.log('hideinfo');
  }
  bedsPatientInfo(element: any) {
    console.log('showinfo');

  }


}
