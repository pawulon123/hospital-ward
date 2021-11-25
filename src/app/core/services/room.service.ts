import { WardService } from './ward.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from 'src/app/shared/models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  rooms:Room[] = [];
  constructor(
    private http: HttpClient,
    private ward: WardService,
    ) {}
    getRooms(){
      return this.ward.getWard()
    }
}
