import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModeWardSvgService {
  mode$ = new Subject<string>()

  setMode(mode: string = 'currentState') {
    this.mode$.next(mode);
  }
}
