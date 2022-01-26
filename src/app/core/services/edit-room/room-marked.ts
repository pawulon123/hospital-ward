import { Bed } from './../../../shared/models/bed';
import { Injectable } from "@angular/core";
import { findById, withoutId } from "../../../shared/useful/useful";
@Injectable()
export class RoomMarked {

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
  gedBed(id: number): Bed {
    return findById(this.markedRoom.beds, id);
  }
  get beds (): Bed[]{
    return this.markedRoom.beds;
  }
}
