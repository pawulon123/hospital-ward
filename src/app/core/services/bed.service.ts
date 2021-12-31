import { Ward } from 'src/app/shared/models/ward';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bed } from 'src/app/shared/models/bed';
import { Room } from 'src/app/shared/models/room';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class BedService {
  url: string = 'http://localhost:3000/bed/';
  constructor(private http: HttpClient) { }

  extractOfWard(ward: Ward): Bed[] {
    return ward.rooms.reduce((arr: Bed[], room: Room) => {
      room.beds.forEach((bed: Bed) => arr.push(bed));
      return arr;
    }, [])
  };
  createBed(bed: Bed): Observable<Bed>{
    return this.http.post<Bed>(this.url, bed, httpOptions);

  }
  deleteBed():any{

  }
  updateBed(){}
}
