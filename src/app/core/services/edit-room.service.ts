import { EditRoom } from './../../shared/models/edit-room';
import { Bed } from 'src/app/shared/models/bed';
import { findById } from '../../shared/useful/useful';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Room } from 'src/app/shared/models/room';
@Injectable({
  providedIn: 'root'
})
export class EditRoomService {
  objEditRoom$ = new Subject<any>()
  outputBeds: Bed[] = [];
  bedsIds: string[]  =[];
  objEdit: EditRoom = { marked: ''};
  roomJson: string = '';
  modify(obj: EditRoom): void {
    if (this.objEditRoom.marked !== obj.marked) Object.assign(this.objEditRoom, obj);
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
  get getOutputBeds(): Bed[] {
    return this.outputBeds;
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
  isPosibleBed(id: string ): boolean {
    return this.posibleBeds.includes(id);
  }
  get roomNotModify() : Room{
    return JSON.parse(this.roomJson);
  }
  set roomNotModify(room : Room | undefined) {
    this.roomJson = JSON.stringify(room);
  }
  restoreBed(beds: Bed[] | undefined): void {
    if (!beds) return;
    this.getOutputBeds.forEach(bed => {
      const bedNotMod :Bed | undefined = this.roomNotModify.beds.find((b: any) => b.id == bed.id);
      if (bedNotMod) {
        beds.forEach((b: Bed)  => {
          if (bedNotMod.id == b.id) Object.assign(b, bedNotMod);
        });
      }
    });
  }
}
