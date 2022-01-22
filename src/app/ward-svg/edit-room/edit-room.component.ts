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
import { ModeWardSvgService } from 'src/app/core/services/mode-ward-svg.service';
import { RoomEntry } from 'src/app/core/services/edit-room/room-entry';
@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css'],
  providers: [EditRoomService, RoomEntry, BedInRoom, PosibleBed, OutputBed, BedRotate]
})
export class EditRoomComponent implements OnInit, OnDestroy {

  constructor(
    private editRoomService: EditRoomService,
    private modeWardSvgService: ModeWardSvgService,
    private bedMarkedService: BedMarkedService,
  ) { }
  private markedRoom: Room | undefined;
  private endEditingRoom: Function = () => { };
  private subscribeEditRoomService: any;
  private objectEdit: EditRoom | { marked: number | null } = { marked: null };

  ngOnInit() {

    this.editRoomService.init(this.markedRoom, this.endEditingRoom);
    this.subscribeEditRoomService = this.bedMarkedService.objEditRoom$.subscribe(this.passObjectEdit.bind(this));
  }
  private passObjectEdit(objEditRoom: EditRoom): void {
    this.objectEdit = objEditRoom;
  }
  get markedBed(): Bed {
    return this.objectEdit?.marked && this.markedRoom ? findById(this.markedRoom.beds, this.objectEdit?.marked) : null;
  }
  rotateBed(): void {
    const id: number | null = this.objectEdit.marked;
    if (id === null || !this.editRoomService.posibleBed.exist(id)) {
      return;
    } else {
      this.editRoomService.rotateBed(this.markedBed, id);
    };
  }
  cancel(): void {
    if (this.editRoomService.outputIsEmpty()){
      this.editRoomService.deleteNewBeds(this.markedRoom?.beds);
      this.editRoomService.restoreBeds(this.markedRoom?.beds);
    }
    this.bedMarkedService.modify({ marked: null });
    this.modeWardSvgService.setMode('currentState');
    this.editRoomService.roomEntry.roomNotModify = ''
    this.endEditingRoom();

  }
  addBed(): void {
    if (!this.markedRoom) return;
    this.editRoomService.addBed(this.markedRoom);
  }
  deleteBed(): void {
    const id = this.objectEdit.marked;
    if (!id || !this.editRoomService.posibleBed.exist(id)) return;
    this.editRoomService.deleteBed(id, this.markedRoom?.beds);
  }
  confirm() {
    this.editRoomService.confirm();
  }
  ngOnDestroy(): void {
    this.subscribeEditRoomService.unsubscribe();
  }

}
