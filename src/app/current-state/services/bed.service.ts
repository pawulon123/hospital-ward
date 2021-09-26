import { HttpClient } from '@angular/common/http';
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
}
