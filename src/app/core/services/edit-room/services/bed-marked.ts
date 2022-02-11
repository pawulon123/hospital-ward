import { Subject } from "rxjs/internal/Subject";
import { Injectable } from '@angular/core';
import { EditRoomDeletedBed } from "../../../../shared/models/edit-room-events";
@Injectable({providedIn: 'root'})
export class BedMarkedService implements EditRoomDeletedBed {

  markingRoom$ = new Subject<any>();
  marked: number | null = null ;

  mark(marked: number | null): void {
    this.marked = marked;
    this.markingRoom$.next(this.marked);
  }
  deletedBed(): void {
    this.mark(null);
  }
}
