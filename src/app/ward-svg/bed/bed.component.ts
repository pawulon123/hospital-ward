import { Component, OnInit } from '@angular/core';
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

  constructor(private bedService: BedService) {}

  ngOnInit(): void {
  }
  extractOfWard(ward: Ward): Bed[]{
    return this.bedService.extractOfWard(ward)


  }
}
