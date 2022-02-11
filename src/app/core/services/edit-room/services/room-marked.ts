import { Bed } from '../../../../shared/models/bed';
import { Injectable } from "@angular/core";
import { findById, withoutId } from "../../../../shared/useful/useful";
import { Room } from 'src/app/shared/models/room';
import { EditRoomAddedBed, EditRoomDeletedBed, EditRoomStart } from '../../../../shared/models/edit-room-events';
@Injectable()
export class RoomMarked implements EditRoomStart, EditRoomAddedBed, EditRoomDeletedBed {

  markedRoom:any;

  start(markedRoom: Room): void {
    this.markedRoom = markedRoom;
  }

  addedBed(bed: Bed): void {
    bed.isNew = true;
    this.markedRoom.beds.push(bed);
  }

  deletedBed(id: number): void {
    const newBeds = withoutId(this.markedRoom.beds, id);
    this.markedRoom.beds.length = 0;
    this.markedRoom.beds.push(...newBeds);
  }

  gedBed(id: number): Bed {
    return findById(this.markedRoom.beds, id);
  }

  get beds (): Bed[] {
    return this.markedRoom.beds;
  }

}
