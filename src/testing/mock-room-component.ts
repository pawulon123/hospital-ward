import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { RoomComponent } from "src/app/current-state/svg/room/room.component";
import { Room } from "src/app/shared/models/room";
import asyncData from "./async-observable-helpers";

@Component({
  selector: 'app-room',
  template: ''
})
export class MockRoomComponent implements Partial<RoomComponent>  {
  get rooms(): Observable<Room[]> {
    return asyncData([])
  };
}
