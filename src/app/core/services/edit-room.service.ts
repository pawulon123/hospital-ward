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

  modify(obj: any): void {
    const objEditRoom: EditRoom = {
      marked: '',
      roomNotModified: null,
    }
    this.objEditRoom$.next(Object.assign(objEditRoom, obj));
  }
  getOutputBed(id: string | number): Bed {
    return findById(this.outputBeds, id);
  }
  addOrUpdate(bed: {id: string | number, polygon:string}) {
    const bedFound = findById(this.outputBeds, bed.id);
    bedFound ? Object.assign(bedFound, bed) : this.outputBeds.push(bed);


  }


}
