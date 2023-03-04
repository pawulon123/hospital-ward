import { InstanceEditRoomService } from '../../core/services/edit-room/services/instance-edit-room-service';
import { EditRoomService } from '../../core/services/edit-room/services/edit-room.service';
import { Component, OnInit } from '@angular/core';
import { Bed } from 'src/app/shared/models/bed';
import { BedService } from '../../core/services/bed.service';
import { BedMarkedService } from 'src/app/core/services/edit-room/services/bed-marked';
@Component({
  selector: 'app-bed',
  templateUrl: './bed.component.html',
  styleUrls: ['./bed.component.css'],
})
export class BedComponent implements OnInit {
  private idBedMarked: number | null = null;
  private editRoomService: EditRoomService | null = null;
  constructor(
    private bedService: BedService,
    private instanceEditRoomService: InstanceEditRoomService,
    private bedMarkedService: BedMarkedService,
  ) { }

  ngOnInit(): void {
    this.bedMarkedService.markingRoom$.subscribe(idBedMarked => idBedMarked = this.idBedMarked );
    this.instanceEditRoomService.instance$.subscribe( editRoomService => this.editRoomService = editRoomService);
  }
  
  mark(idBedMarked: number): void {
    if(!this.editRoomService || !this.editRoomService.markedBedExist(idBedMarked)) return;
    this.idBedMarked = idBedMarked;
    this.bedMarkedService.mark(idBedMarked);
  }
  modalPatient(element: any) {
    console.log('modalPatient');
  }
}
