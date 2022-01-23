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
  private idBedMarked: number | null = null;
  private beds?: any;
  private editRoomService: EditRoomService | null = null;
  constructor(
    private bedService: BedService,
    private instanceEditRoomService: InstanceEditRoomService,
    private bedMarkedService: BedMarkedService,
  ) { }

  ngOnInit(): void {
    this.bedMarkedService.markingRoom$.subscribe(this.setMarkedBedId.bind(this));
    this.instanceEditRoomService.instance$.subscribe( editRoomService => this.editRoomService = editRoomService);
  }
  private setMarkedBedId(idBedMarked: number | null): void {
    this.idBedMarked = idBedMarked;
  }
  setBeds(ward: any) {
    this.beds = this.bedService.extractOfWard(ward);
  }
  getBeds(): Bed[] {
    return this.beds;
  }
  mark(idBedMarked: number): void {
    if(!this.editRoomService) return;
    if (!this.editRoomService.posibleBed.exist(idBedMarked)) return;
    this.idBedMarked = idBedMarked;
    this.bedMarkedService.mark(idBedMarked);
  }
  modalPatient(element: any) {
    console.log('modalPatient');
  }
}
