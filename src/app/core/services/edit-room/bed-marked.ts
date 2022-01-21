import { EditRoom } from './../../../shared/models/edit-room';
import { Subject } from "rxjs/internal/Subject";
import { Injectable } from '@angular/core';
@Injectable({providedIn: 'root'})
export class BedMarkedService {

  objEditRoom$ = new Subject<any>()
  objEdit: EditRoom = { marked: null };

  modify(obj: EditRoom): void {
    if (this.objEditRoom.marked !== obj.marked) Object.assign(this.objEditRoom, obj);
    this.objEditRoom$.next(this.objEditRoom);
  }
  get objEditRoom(): EditRoom {
    return this.objEdit;
  }
  set objEditRoom(obj: EditRoom) {
     Object.assign(this.objEdit, obj);
  }
}
