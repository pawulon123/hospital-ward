import { RoomComponent } from './../room/room.component';
import { BedComponent } from './../bed/bed.component'
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Room } from '../../interfaces/room';

@Component({
  selector: 'app-ward',
  templateUrl: './ward.svg',
  styleUrls: ['./ward.component.css']
})
export class WardComponent implements AfterViewInit {
  viewBox: string = '0 0 360 90';
  rooms: Room[] | undefined;
  beds: any[] | undefined;
  @ViewChild('room') room: RoomComponent | undefined;
  @ViewChild('bed') bed: BedComponent | undefined;


  ngAfterViewInit() {
    this.createBeds();
    this.createRooms();
  }
  createRooms(): void {
    this.room?.rooms.subscribe((rooms: Room[]) => {
      this.rooms = typeof this.room !== 'undefined' ? rooms : this.errorLog('can not read rooms');
    });
  }
  createBeds(): void {
    this.bed?.beds.subscribe((beds: any[]) => {
        console.log(beds);
        this.beds = typeof this.bed !== 'undefined' ? beds : this.errorLog('can not read beds');
    });
  }

  errorLog(message: string): undefined {
    console.error(message);
    return undefined;
  }

}
