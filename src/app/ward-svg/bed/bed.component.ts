import { EditRoomService } from './../../core/services/edit-room.service';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Bed } from 'src/app/shared/models/bed';
import { Ward } from 'src/app/shared/models/ward';
import { BedService } from '../../core/services/bed.service';
import { EditRoom } from 'src/app/shared/models/edit-room';

@Component({
  selector: 'app-bed',
  templateUrl: './bed.component.html',
  styleUrls: ['./bed.component.css'],
})
export class BedComponent implements OnInit{
  objectEdit: any = {};
  private beds?:any;
  constructor(
    private bedService: BedService,
    private editRoomService: EditRoomService
    ) {}

  ngOnInit(): void {
    this.editRoomService.objEditRoom$.subscribe(this.passObjectEdit.bind(this));
  }
  private passObjectEdit(objEditRoom: EditRoom): void {
    this.objectEdit = objEditRoom;
  }
  setBeds(ward:any) {
    this.beds = this.bedService.extractOfWard(ward);
  }
  getBeds(): Bed[] {
   return this.beds;
  }
  mark(marked:any): void {
    const idBed = Number.parseInt(marked.id).toString();
    if(this.objectEdit.marked!== idBed) this.editRoomService.modify({marked:idBed});
  }
  modalPatient(element:any) {
    console.log('modalPatient');

  }
}
