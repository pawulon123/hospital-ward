import { Room } from '../../shared/models/room';
import { Bed } from '../../shared/models/bed';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { findById } from '../../shared/useful/useful';
import { RoomEntry, BedMarkedService, BedRotate, PosibleBed, OutputBed, BedInRoom, RoomMarked, EditRoomService } from '../../core/services/edit-room'
@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css'],
  providers: [EditRoomService, RoomEntry, BedInRoom, PosibleBed, OutputBed, BedRotate, RoomMarked]
})
export class EditRoomComponent implements OnInit, OnDestroy {

  private idBedMarked: number | null = null;
  private markedRoom: Room | undefined;
  private endEditingRoom: Function = () => { };
  private subscribeEditRoomService: any;
  constructor(
    private editRoomService: EditRoomService,
    private bedMarkedService: BedMarkedService,
  ) { }

  ngOnInit() {
    this.editRoomService.init(this.markedRoom);
    this.subscribeEditRoomService = this.bedMarkedService.markingRoom$.subscribe(idBedMarked => this.idBedMarked = idBedMarked);
  }

  get markedBed(): Bed {
    return this.idBedMarked && this.markedRoom ? findById(this.markedRoom.beds, this.idBedMarked) : null;
  }

  rotateBed(): void {
    if (!this.idBedMarked || !this.editRoomService.markedBedExist(this.idBedMarked)) return;
      this.editRoomService.rotateBed(this.markedBed);
  }

  cancel(): void {
    if (!this.editRoomService.outputIsEmpty()) this.editRoomService.restoreBeds(this.markedRoom?.beds);
    this.endEditingRoom();
  }

  addBed(): void {
    if (!this.markedRoom) return;
    this.editRoomService.addBed(this.markedRoom);
  }

  deleteBed(): void {
    if (!this.idBedMarked || !this.editRoomService.markedBedExist(this.idBedMarked)) return;
    this.editRoomService.deleteBed(this.idBedMarked);
  }

  confirm(): void {
    if (!this.editRoomService.outputIsEmpty()) this.editRoomService.confirm();
    this.endEditingRoom();
  }

  ngOnDestroy(): void {
    this.subscribeEditRoomService.unsubscribe();
  }
}
