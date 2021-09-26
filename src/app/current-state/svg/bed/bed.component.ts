import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BedService } from '../../services/bed.service';

@Component({
  selector: 'app-bed',
  templateUrl: './bed.component.html',
  styleUrls: ['./bed.component.css']
})
export class BedComponent implements OnInit {

  constructor(private bedService: BedService) { }
  get beds(): Observable<any[]> {
    return this.bedService.getBeds();
  }
  ngOnInit(): void {
  }

}
