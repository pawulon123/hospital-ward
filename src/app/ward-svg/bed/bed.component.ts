import { EditRoomService } from './../../core/services/edit-room.service';
import { Component, OnInit } from '@angular/core';
import { Bed } from 'src/app/shared/models/bed';
import { BedService } from '../../core/services/bed.service';
import { EditRoom } from 'src/app/shared/models/edit-room';
@Component({
  selector: 'app-bed',
  templateUrl: './bed.component.html',
  styleUrls: ['./bed.component.css'],
})
export class BedComponent implements OnInit {
  objectEdit: any = {};
  private beds?: any;
  constructor(
    private bedService: BedService,
    private editRoomService: EditRoomService
  ) { }

  ngOnInit(): void {
    this.editRoomService.objEditRoom$.subscribe(this.passObjectEdit.bind(this));
    this.bedService.setMarkBed(this.mark.bind(this))
  }
  private passObjectEdit(objEditRoom: EditRoom): void {
    this.objectEdit = objEditRoom;
  }
  setBeds(ward: any) {
    this.beds = this.bedService.extractOfWard(ward);
  }
  getBeds(): Bed[] {
    return this.beds;
  }
  mark(marked: any): void {
    if (!this.editRoomService.posibleBed.exist(marked)) return;
    this.objectEdit.marked = marked; console.log(marked);
    this.editRoomService.modify(this.objectEdit);
  }
  modalPatient(element: any) {
    console.log('modalPatient');
  }
}
