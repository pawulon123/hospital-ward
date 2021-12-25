import { EditRoom } from './../../shared/models/edit-room';
import { Bed } from 'src/app/shared/models/bed';
import { findById } from '../../shared/useful/useful';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EditRoomService {
  objEditRoom$ = new Subject<any>()
  outputBeds: Bed[] = [];
  bedsIds: string[]  =[];
  objEdit: EditRoom = { marked: ''};
  modify(obj: any): void {
    if (this.objEditRoom.marked !== obj.marked) this.objEditRoom = obj
    this.objEditRoom$.next(this.objEditRoom);
  }
  get objEditRoom(): EditRoom {
    return this.objEdit;
  }
  set objEditRoom(obj: EditRoom) {
    if(this.isPosibleBed(obj.marked)) Object.assign(this.objEdit, obj);
  }
  getOutputBed(id: string | number): Bed {
    return findById(this.outputBeds, id);
  }
  addOrUpdate(bed: { id: string | number, polygon: string }): void {
    const bedFound = this.getOutputBed(bed.id);
    bedFound ? Object.assign(bedFound, bed) : this.outputBeds.push(bed);
  }
  set posibleBeds(bedsIds: any[]) {
    this.bedsIds = bedsIds.length ? bedsIds?.map(id => id.toString()) : [];
  }
  get posibleBeds(): string[]  {
    return this.bedsIds;
  }
  private isPosibleBed(id: string ): boolean {
    return this.posibleBeds.includes(id);
  }
}
