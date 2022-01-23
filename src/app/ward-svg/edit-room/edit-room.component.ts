import { BedInRoom } from './../../core/services/edit-room/bed-in-room';
import { OutputBed } from './../../core/services/edit-room/output-bed';
import { PosibleBed } from './../../core/services/edit-room/posible-bed';
import { BedRotate } from './../../core/services/edit-room/bed-rotate';
import { BedMarkedService } from 'src/app/core/services/edit-room/bed-marked';
import { EditRoom } from './../../shared/models/edit-room';
import { Room } from '../../shared/models/room';
import { Bed } from '../../shared/models/bed';
import { EditRoomService } from '../../core/services/edit-room/edit-room.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { findById } from '../../shared/useful/useful';
import { RoomEntry } from 'src/app/core/services/edit-room/room-entry';
@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css'],
  providers: [EditRoomService, RoomEntry, BedInRoom, PosibleBed, OutputBed, BedRotate]
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
    this.editRoomService.init(this.markedRoom, this.endEditingRoom);
    this.subscribeEditRoomService = this.bedMarkedService.markingRoom$.subscribe(this.setMarkedBedId.bind(this));
  }
  private setMarkedBedId(idBedMarked: number | null): void {
    this.idBedMarked = idBedMarked;
  }
  get markedBed(): Bed {
    return this.idBedMarked && this.markedRoom ? findById(this.markedRoom.beds, this.idBedMarked) : null;
  }
  rotateBed(): void {
    if (!this.idBedMarked || !this.editRoomService.posibleBed.exist(this.idBedMarked)) {
      return;
    } else {
      this.editRoomService.rotateBed(this.markedBed, this.idBedMarked);
    };
  }
  cancel(): void {
    if (this.editRoomService.outputIsEmpty()) {
      this.editRoomService.restoreBeds(this.markedRoom?.beds);
    }
    this.bedMarkedService.mark(null);
    this.editRoomService.setMode('currentState');
    this.editRoomService.roomEntry.roomNotModify = ''
    this.endEditingRoom();

  }
  addBed(): void {
    if (!this.markedRoom) return;
    this.editRoomService.addBed(this.markedRoom);
  }
  deleteBed(): void {
    if (!this.idBedMarked || !this.editRoomService.posibleBed.exist(this.idBedMarked)) return;

    this.editRoomService.deleteBed(this.idBedMarked);
  }
  confirm() {
    this.editRoomService.confirm();
  }
  ngOnDestroy(): void {
    this.subscribeEditRoomService.unsubscribe();
  }

}
