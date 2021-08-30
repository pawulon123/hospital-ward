import { RoomService } from '../../services/room.service';
import { Component } from '@angular/core';
import { Room } from '../../../interfaces/room';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-room',
  template: ``,
  styleUrls: ['./room.component.css']

})
export class RoomComponent {

  constructor(private roomService: RoomService) { }

  get rooms(): Observable<Room[]> {
    return this.roomService.getRooms();
  }
}
