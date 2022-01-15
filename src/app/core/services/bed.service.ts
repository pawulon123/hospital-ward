import { Ward } from 'src/app/shared/models/ward';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bed } from 'src/app/shared/models/bed';
import { Room } from 'src/app/shared/models/room';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { arraysOfPolygon, logError, rect } from '../../shared/useful/useful';
const center = require('svg-polygon-center');

@Injectable({
  providedIn: 'root'
})
export class BedService {
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  url: string = 'http://localhost:3000/bed/';
  constructor(private http: HttpClient) { }

  extractOfWard(ward: Ward): Bed[] {
    return ward.rooms.reduce((arr: Bed[], room: Room) => {
      room.beds.forEach((bed: Bed) => arr.push(bed));
      return arr;
    }, [])
  };
  createBed(bed: Bed): Observable<Bed> {
    return this.http.post<Bed>(this.url, bed, this.httpOptions);

  }
  deleteMany(ids: any ) {
    const url = `${this.url}many/`;
    return this.http.post<any>(url, ids, this.httpOptions);
  }
  deleteBed(id:any): any {
  console.log(id,'bedService');

  }
  updateBed() { }

  newPolygonInRoom(roomPoints: string, bedIsInRoom: Function, type = 'bedHorizontal'): string {
    let bed: string = rect(center(roomPoints), type).polygon;
    if (typeof bedIsInRoom.constructor === 'function') {
      if (!bedIsInRoom(bed)) {
        bed = rect(center(roomPoints), 'bedVertical').polygon
        if (!bedIsInRoom(bed)) {
          logError(`cen't draw bed`);
          return '';
        }
      }
    }
    return bed;
  }


}
