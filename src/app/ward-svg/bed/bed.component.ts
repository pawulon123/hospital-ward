import { EditRoomService } from './../../core/services/edit-room.service';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Bed } from 'src/app/shared/models/bed';
import { Ward } from 'src/app/shared/models/ward';
import { BedService } from '../../core/services/bed.service';

@Component({
  selector: 'app-bed',
  templateUrl: './bed.component.html',
  styleUrls: ['./bed.component.css'],
})
export class BedComponent implements OnInit{

  beds?:any;
  constructor(
    private bedService: BedService,
    private editRoomService: EditRoomService
    ) {}

  ngOnInit(): void {
  }
  setBeds(ward:any) {
    this.beds = this.bedService.extractOfWard(ward);
  }
  getBeds() {
   return this.beds;
  }
  mark(marked:any) {
    this.editRoomService.modify({marked:Number.parseInt(marked.id)})
  }
  modalPatient(element:any) {
    console.log('modalPatient');

  }
}
