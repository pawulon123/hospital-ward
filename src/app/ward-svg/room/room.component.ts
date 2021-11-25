import { Room } from '../../shared/models/room';
import { EventsRoom } from '../../shared/models/events-room';
import { RoomService } from '../../core/services/room.service';
import { Component, ComponentFactoryResolver, Type, ViewChild, ViewContainerRef } from '@angular/core';
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
  rooms:Room[] = [];
  manageBeds(element: any): void {
    const room = this.getById(element.id);
    if(!room)return;
    this.resolveEditRoom(room);
  }
  getById(id: string): Room|undefined {
    return this.rooms.find((room: Room) => Number.parseInt(room.id) === Number.parseInt(id)/*element.id.split('_')[0]*/);
  }
  hideRoomInfo(element: any) {
    // console.log('hideinfo');
  }
  roomInfo(element: any) {
    // console.log('showinfo');
  }
  setViewContainerRefEdit(vCREditRoom: any): void {
    this.edit = vCREditRoom;
  }
  setRooms(rooms: Room[]): void {
    this.rooms = rooms;

  }
  resolveEditRoom(room: Room): void {
    const factory = this.componentFactoryResolver.resolveComponentFactory(
      <Type<EditRoomComponent>>EditRoomComponent
      );
      const editRoom: any = this.editRoomContainer?.createComponent(factory);
      editRoom.instance.room = room;
    }
  }
