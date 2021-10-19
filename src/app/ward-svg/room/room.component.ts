import { RoomService } from '../../core/services/room.service';
import { Component } from '@angular/core';
import { Room } from '../../shared/models/room';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-room',
  template: ``,
  styleUrls: ['./room.component.css']

})
export class RoomComponent {

  constructor(public roomService: RoomService) { }

  get rooms() {
    return this.roomService.getRooms();
  }
}
