import { Bed } from 'src/app/shared/models/bed';
import { Injectable, OnDestroy } from "@angular/core";
import { findById } from '../../../../shared/useful/useful';
import { EditRoomAddedBed, EditRoomDeletedBed } from '../../../../shared/models/edit-room-events';
@Injectable()
export class OutputBed implements EditRoomAddedBed, EditRoomDeletedBed {

  beds: { id: number, polygon: string }[] = [];

  getOutputBed(id:  number): Bed {
    return this.beds ? findById(this.beds, id) : null;
  }

  get getOutputBeds(): Bed[] {
    return this.beds;
  }

  addOrUpdate(bed: { id:  number, polygon: string }): void {
    const bedFound = this.getOutputBed(bed.id);
    bedFound ? Object.assign(bedFound, bed) : this.beds.push(bed);
  }

  delete(id: number): void {
    this.beds = this.beds.filter(bed => bed.id != id);
  }

  addedBed(bed:any) {
    this.addOrUpdate({ id: bed.id, polygon: bed.polygon });
  }

  deletedBed(id: number): void {
    this.delete(id);
  }

}
