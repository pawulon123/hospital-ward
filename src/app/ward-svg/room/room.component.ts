import { EventsRoom } from '../../shared/models/events-room';
import { RoomService } from '../../core/services/room.service';
import { Component, ComponentFactoryResolver, Type, OnInit, Input } from '@angular/core';
import { EditRoomComponent } from '../edit-room/edit-room.component';
// import { runInThisContext } from 'vm';
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements EventsRoom, OnInit {
  @Input('ward') ward: any;
  edit:any;
  rooms: any;
  constructor(
    public roomService: RoomService,
    private componentFactoryResolver: ComponentFactoryResolver
    ) { }
  ngOnInit(): void {

  }



  ngOnChanges() {
    this.rooms = this.ward ? this.ward.rooms : null;


  }
  manageBeds(element: any) {


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
