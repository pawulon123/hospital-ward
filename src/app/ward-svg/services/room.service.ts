import { Injectable } from '@angular/core';
import { Room } from '../../interfaces/room';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RoomService {
  constructor(private http: HttpClient) { }

  roomsUrl: string = 'assets/rooms.json';

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.roomsUrl);
  }
}
