import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BedService } from '../../ward-svg/services/bed.service';

@Component({
  selector: 'app-bed',
  templateUrl: './bed.component.html',
  styleUrls: ['./bed.component.css']
})
export class BedComponent implements OnInit {

  constructor(private bedService: BedService) { this.addBed().subscribe((beds: any[]) => {
    console.log(beds);

  }) }
  get beds(): Observable<any[]> {
    return this.bedService.getBeds();
  }
  addBed():any {
    return this.bedService.add()
  }
  ngOnInit(): void {
  }

}
