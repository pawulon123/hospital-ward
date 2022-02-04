import { EditRoomService } from './edit-room.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class InstanceEditRoomService {

  instance$ = new Subject<EditRoomService>();
  private instance: EditRoomService | null = null;

  setOrRemoveInstance(instance: EditRoomService
    ): void {
    this.instance = instance;
    this.instance$.next(this.instance);
  }

  getInstance(): EditRoomService | null {
    return this.instance ? this.instance : null;
  }
}
