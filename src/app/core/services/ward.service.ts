import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ward } from '../../shared/models/ward';
import { EditRoomAddedBed, EditRoomDeletedBed } from '../../shared/models/edit-room-events';
@Injectable({
  providedIn: 'root'
})
export class WardService implements EditRoomAddedBed, EditRoomDeletedBed {

  id: number = 1;
  refreshSvg: Function = () => { };

  constructor(
    private http: HttpClient,
  ) { }

  url: string = 'http://localhost:3000/ward/';

  getWard(): Observable<Ward> {
    return this.http.get<Ward>(this.url + this.id);
  }

  refresh(refresh: Function): void {
    this.refreshSvg = refresh;
  }

  addedBed(): void {
    this.refreshSvg();
  }

  deletedBed(): void {
    this.refreshSvg();
  }

}
