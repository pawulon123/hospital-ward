import { Bed } from 'src/app/shared/models/bed';
import { Injectable } from "@angular/core";
import { findById } from '../../shared/useful/useful';

@Injectable()
export class OutputBed {
  beds: { id: string | number, polygon: string }[] = []

  getOutputBed(id: string | number): Bed {
    return this.beds ? findById(this.beds, id) : null;
  }
  get getOutputBeds(): Bed[] {
    return this.beds;
  }
  addOrUpdate(bed: { id: string | number, polygon: string }): void {
    const bedFound = this.getOutputBed(bed.id);
    bedFound ? Object.assign(bedFound, bed) : this.beds.push(bed);
  }
  delete(id: string): void {
    this.beds = this.beds.filter(bed => bed.id != id);
  }
}
