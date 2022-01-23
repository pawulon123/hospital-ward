import { EditRoom } from './../../../shared/models/edit-room';
import { Subject } from "rxjs/internal/Subject";
import { Injectable } from '@angular/core';
@Injectable({providedIn: 'root'})
export class BedMarkedService {

  markingRoom$ = new Subject<any>()
  marked: number | null = null ;

  mark(marked: number | null): void {
    // if (this.objEditRoom.marked !== obj.marked) Object.assign(this.objEditRoom, obj);
    // this.objEditRoom$.next(this.objEditRoom);
    this.marked = marked;
    this.markingRoom$.next(this.marked);
  }

}
