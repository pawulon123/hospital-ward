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
  modify(obj: any): void {
    const objEditRoom: EditRoom = {
      marked: '',
      outputBeds: [] as Bed[],
      roomNotModified: null,
      addOrUpdate(bed: Bed): void {
        const bedFound = findById(this.outputBeds, bed.id);
        bedFound ? Object.assign(bedFound, bed) : this.outputBeds.push(bed);
      }
    }
    this.objEditRoom$.next(Object.assign(objEditRoom,obj));
  }
}
