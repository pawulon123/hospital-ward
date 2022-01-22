import { InstanceEditRoomService } from '../../core/services/edit-room/instance-edit-room-service';
import { EditRoomService } from '../../core/services/edit-room/edit-room.service';
import { Component, OnInit } from '@angular/core';
import { Bed } from 'src/app/shared/models/bed';
import { BedService } from '../../core/services/bed.service';
import { EditRoom } from 'src/app/shared/models/edit-room';
import { BedMarkedService } from 'src/app/core/services/edit-room/bed-marked';
@Component({
  selector: 'app-bed',
  templateUrl: './bed.component.html',
  styleUrls: ['./bed.component.css'],
})
export class BedComponent implements OnInit {
  objectEdit: any = {};
  private beds?: any;
  private editRoomService: EditRoomService | null = null;
  constructor(
    private bedService: BedService,
    private instanceEditRoomService: InstanceEditRoomService,
    private bedMarkedService: BedMarkedService,
  ) { }

  ngOnInit(): void {
    this.bedMarkedService.objEditRoom$.subscribe(this.passObjectEdit.bind(this));
    this.instanceEditRoomService.instance$.subscribe( editRoomService => this.editRoomService = editRoomService);
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
  mark(marked: number): void {
    if(!this.editRoomService) return;
    if (!this.editRoomService.posibleBed.exist(marked)) return;
    this.objectEdit.marked = marked;
    this.bedMarkedService.modify(this.objectEdit);
  }
  modalPatient(element: any) {
    console.log('modalPatient');
  }
}
