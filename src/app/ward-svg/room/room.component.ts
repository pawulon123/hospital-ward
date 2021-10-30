import { EventsRoom } from '../../shared/models/events-room';
import { RoomService } from '../../core/services/room.service';
import { AfterViewInit, Component, ComponentFactoryResolver, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { EditRoomComponent } from '../edit-room/edit-room.component';
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements EventsRoom {
  @ViewChild('editRoomContainer', { read: ViewContainerRef }) editRoomContainer?: ViewContainerRef
  constructor(
    public roomService: RoomService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  edit: any;
  rooms: any;
  manageBeds(element: any) {
    const room = this.getById(element.id);
    this.resolveEditRoom(room);
  }
  getById(id: string) {
    return this.rooms.find((room: any) => room.id == Number.parseInt(id)/*element.id.split('_')[0]*/)
  }
  hideRoomInfo(element: any) {
    // console.log('hideinfo');
  }
  roomInfo(element: any) {
    // console.log('showinfo');
  }
  setViewContainerRefEdit(vCREditRoom: any) {
    this.edit = vCREditRoom;
  }
  setRooms(rooms: any) {
    this.rooms = rooms;

  }

  resolveEditRoom(room: any) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      <Type<EditRoomComponent>>EditRoomComponent
    );
    const editRoom: any = this.editRoomContainer?.createComponent(factory);
    editRoom.instance.room = room;
  }


}
