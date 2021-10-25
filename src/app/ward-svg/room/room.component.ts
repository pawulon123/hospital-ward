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
  edit:any
  manageBeds(element: any) {
    this.resolveEditRoom();
  }
  hideBedsPatientInfo(element: any) {
    console.log('hideinfo');
  }
  bedsPatientInfo(element: any) {
    console.log('showinfo');
  }
  setViewContainerRefEdit(vCREditRoom: any) {
    this.edit = vCREditRoom;
  }

  resolveEditRoom() {
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      <Type<EditRoomComponent>>EditRoomComponent
    );
    this.edit.createComponent(factory);
  }


}
