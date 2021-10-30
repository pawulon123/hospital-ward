import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditRoomService {
  objEditRoom$ = new Subject<any>()
  modify(obj: any) {
      this.objEditRoom$.next(Object.assign(
      {
        marked: null,
        outputRoom: []
      },
      obj
    ));
  }
}
