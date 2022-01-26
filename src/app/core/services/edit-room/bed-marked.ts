import { Subject } from "rxjs/internal/Subject";
import { Injectable } from '@angular/core';
@Injectable({providedIn: 'root'})
export class BedMarkedService {

  markingRoom$ = new Subject<any>()
  marked: number | null = null ;

  mark(marked: number | null): void {
    this.marked = marked;
    this.markingRoom$.next(this.marked);
  }

}
