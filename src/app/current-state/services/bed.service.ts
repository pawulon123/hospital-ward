import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BedService {
  constructor(private http: HttpClient) { }

  bedUrl: string = 'http://localhost:3000/bed/';

  getBeds(): Observable<any[]> {
    return this.http.get<any[]>(this.bedUrl);
  }
  add(): Observable<any> {
  return  this.http.post(this.bedUrl,{
    id_room: 10,
    x_svg: 10,
    y_svg: 72,
    rotate: 22,
    type: 'basic'

    });
  }
}
