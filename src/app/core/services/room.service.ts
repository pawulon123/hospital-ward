import { WardService } from './ward.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(
    private http: HttpClient,
    private ward: WardService,

    ) {}
    getRooms(){
      return this.ward.getWard()}


}
