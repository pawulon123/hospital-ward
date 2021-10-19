import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ward } from '../../shared/models/ward';

@Injectable({
  providedIn: 'root'
})
export class WardService {
  ward: any = null;
  id: number = 1
  constructor(private http: HttpClient ) { }
  url: string = 'http://localhost:3000/ward/';
  getWard(): Observable<Ward> {
    this.ward = this.http.get<Ward>(this.url + this.id);
    return this.ward;
  }

}
