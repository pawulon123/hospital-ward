import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Bed } from 'src/app/shared/models/bed';
import { Ward } from 'src/app/shared/models/ward';
import { BedService } from '../../core/services/bed.service';

@Component({
  selector: 'app-bed',
  templateUrl: './bed.component.html',
  styleUrls: ['./bed.component.css'],
})
export class BedComponent implements OnInit {

  constructor(private bedService: BedService) { }
  @Input('ward') ward: any;
  beds: any;
  ngOnInit(): void {
    console.log(this.ward);
    // this.beds = this.bedService.extractOfWard(this.ward);


  }

  ngOnChanges() {
    this.beds = this.ward ? this.bedService.extractOfWard(this.ward) : null;

  }

}
