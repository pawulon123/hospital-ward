import { RoomComponent } from './../room/room.component';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Room } from '../../../interfaces/room';

@Component({
  selector: 'app-ward',
  templateUrl: './ward.svg',
  styleUrls: ['./ward.component.css']
})
export class WardComponent implements AfterViewInit {
  viewBox: string = '0 0 360 90';
  rooms: Room[] | undefined;
  @ViewChild('room') room: RoomComponent | undefined;
  ngAfterViewInit() {
    this.createRooms();
  }
  createRooms(): void {
    this.room?.rooms.subscribe((rooms: Room[]) => {
      this.rooms = typeof this.room !== 'undefined' ? rooms : this.errorLog('can not read rooms');
    });
  }
  errorLog(message: string): undefined {
    console.error(message);
    return undefined;
  }

}
