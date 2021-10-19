import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JgpNfzService {

  constructor(private http: HttpClient) { }
}
