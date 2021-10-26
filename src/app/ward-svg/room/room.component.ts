import { EventsRoom } from '../../shared/models/events-room';
import { RoomService } from '../../core/services/room.service';
import { Component, ComponentFactoryResolver, Type } from '@angular/core';
import { EditRoomComponent } from '../edit-room/edit-room.component';
@Component({
  selector: 'app-room',
  template: ``,
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements EventsRoom {

  constructor(
    public roomService: RoomService,
    private componentFactoryResolver: ComponentFactoryResolver
    ) { }
  edit:any;
  rooms: any;
  manageBeds(element: any) {

console.log();

// const room = this.rooms.find((room:any) =>  element.id.split('_')[0])
const room = this.rooms.find((room:any) => room.id == Number.parseInt(element.id))
    this.resolveEditRoom(room);
  }
  hideBedsPatientInfo(element: any) {
    // console.log('hideinfo');
  }
  bedsPatientInfo(element: any) {
    // console.log('showinfo');
  }
  setViewContainerRefEdit(vCREditRoom: any) {
    this.edit = vCREditRoom;
  }
  setRooms(rooms: any){
    this.rooms = rooms;

  }

  resolveEditRoom(room:any) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      <Type<EditRoomComponent>>EditRoomComponent
    );
    const editRoom = this.edit.createComponent(factory);
    editRoom.instance.room = room;
  }


}
