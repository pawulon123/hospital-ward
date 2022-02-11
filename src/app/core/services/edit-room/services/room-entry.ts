import { Room } from 'src/app/shared/models/room';
import { Bed } from 'src/app/shared/models/bed';
import { Injectable } from "@angular/core";
import { EditRoomAddedBed, EditRoomDeletedBed, EditRoomStart } from '../../../../shared/models/edit-room-events';
@Injectable()
export class RoomEntry implements EditRoomDeletedBed, EditRoomStart, EditRoomAddedBed {

  private room: string = '';

  get roomNotModify(): Room {
    return this.room ? JSON.parse(this.room) : null;
  }

  set roomNotModify(room: Room | string | undefined) {
    this.room = JSON.stringify(room);
  }

  addBed(bed: Bed): void {
    if (!this.roomNotModify) return;
    const room: Room = this.copiedRoom();
    room.beds = [...this.roomNotModify.beds, bed];
    this.roomNotModify = room;
  }

  removeBed(id: number): void {
    if (!this.roomNotModify) return;
    const room = this.copiedRoom();
    room.beds = room.beds.filter((bed: Bed) => bed.id != id);
    this.roomNotModify = room;
  }

  start(markedRoom: Room): void {
    this.roomNotModify = markedRoom;
  }

  addedBed(bed: Bed): void {
    this.addBed(bed);
  }

  deletedBed(id: number): void {
    this.removeBed(id);
  }

  private copiedRoom(): Room {
    return Object.assign({}, this.roomNotModify);
  }

}
