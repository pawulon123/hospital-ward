import { Bed } from './../../../shared/models/bed';
import { Injectable } from "@angular/core";
import { findById, withoutId } from "../../../shared/useful/useful";
import { WardService } from "../ward.service";
import { BedInRoom } from "./bed-in-room";
import { BedMarkedService } from "./bed-marked";
import { InstanceEditRoomService } from "./instance-edit-room-service";


@Injectable()
export class RoomMarked {
  constructor(
    // private bedMarkedService: BedMarkedService,
    // private wardService: WardService,
    private instanceEditRoomService: InstanceEditRoomService,
  ) { }

  markedRoom:any
  start(markedRoom: any): void {
    this.markedRoom = markedRoom;

  }
  addedBed(bed: any): void {
    bed.isNew = true;
    this.markedRoom.beds.push(bed);
  }
  deletedBed(id: number): void {
    const newBeds = withoutId(this.markedRoom.beds, id);
    this.markedRoom.beds.length = 0;
    this.markedRoom.beds.push(...newBeds);
  }
  saved(bedsSaved :any[]): void{
    bedsSaved.forEach((bedSaved: any) => {
      let bed = findById(this.markedRoom?.beds, bedSaved.id);
      if (bed) {
        delete bed.isNew
        Object.assign(bed, bedSaved)
      }
    });
  }
  get beds (): Bed[]{
    return this.markedRoom.beds;
  }
}
