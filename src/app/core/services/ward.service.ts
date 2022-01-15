import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ward } from '../../shared/models/ward';

@Injectable({
  providedIn: 'root'
})
export class WardService {
  id: number = 1;
  refreshSvg: Function = ()=>{};

  constructor(
    private http: HttpClient,
  ) { }
  url: string = 'http://localhost:3000/ward/';
  getWard(): Observable<Ward> {
    return this.http.get<Ward>(this.url + this.id);
  }
  refresh(refresh:Function): void{
    this.refreshSvg = refresh;
  }
}
