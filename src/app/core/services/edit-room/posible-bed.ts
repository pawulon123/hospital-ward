import { Room } from './../../../shared/models/room';
import { Bed } from '../../../shared/models/bed';
import { Injectable, OnDestroy } from "@angular/core";

@Injectable()
export class PosibleBed implements OnDestroy {
  private ids: any[] = [];

  set beds(beds: Bed[] | undefined) {
    this.ids = beds ? beds.map((bed: Bed) => bed.id) : [];
  }
  private getIds(): number[] {
    return this.ids;
  }
  set addBed(bed: Bed) {
    if(!bed.id)return
    this.getIds().push(bed.id);
  }
  exist(id: number | null): boolean {
    return id && id >= 0 ? this.getIds().includes(id) : false;
  }
  start(markedRoom: Room): void{
    this.beds = markedRoom.beds;
  }
  addedBed(bed: Bed): void{
    this.addBed = bed;
  }
  deletedBed(idBed: number): void{
    this.ids = this.ids.filter(id => id !== idBed);
  }
  ngOnDestroy(): void {
    this.ids.length = 0;
  }
}
