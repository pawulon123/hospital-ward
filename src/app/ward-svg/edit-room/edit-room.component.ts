import { EditRoom } from './../../shared/models/edit-room';
import { Room } from '../../shared/models/room';
import { Bed } from '../../shared/models/bed';
import { EditRoomService } from './../../core/services/edit-room.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BedRotate } from './bed-rotate';
import { findById } from '../../shared/useful/useful';
import { ModeWardSvgService } from 'src/app/core/services/mode-ward-svg.service';
import { PosibleBed } from './posible-bed';
import { OutputBed } from './output-bed';
import { RoomEntry } from './room-entry';
import { BedInRoom } from './bed-in-room';


@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css'],
  providers: [BedRotate, PosibleBed, OutputBed, RoomEntry, BedInRoom]
})
export class EditRoomComponent implements OnInit, OnDestroy {

  constructor(
    private editRoomService: EditRoomService,
    private modeWardSvgService: ModeWardSvgService,
    private bedRotate: BedRotate,
    private posibleBed: PosibleBed,
    private outputBed: OutputBed,
    private roomEntry: RoomEntry,
    private bedInRoom: BedInRoom
  ) { }
  private markedRoom: Room | undefined;
  private endEditingRoom: Function = () => { };
  private subscribeEditRoomService: any;
  private objectEdit: EditRoom | { marked: string } = { marked: '' };

  ngOnInit() {
    this.editRoomService.setServices({
      posibleBed: this.posibleBed,
      outputBed: this.outputBed,
      roomEntry: this.roomEntry,
      bedInRoom: this.bedInRoom,
      bedRotate: this.bedRotate
    })
    this.roomEntry.roomNotModify = this.markedRoom;
    this.posibleBed.beds = this.markedRoom?.beds;
    this.bedInRoom.roomPolygon = this.markedRoom?.polygon;
    this.subscribeEditRoomService = this.editRoomService.objEditRoom$.subscribe(this.passObjectEdit.bind(this));
  }
  private passObjectEdit(objEditRoom: EditRoom): void {
    this.objectEdit = objEditRoom;
  }
  get markedBed(): Bed {
    return this.objectEdit?.marked && this.markedRoom ? findById(this.markedRoom.beds, this.objectEdit?.marked) : null;
  }
  rotateBed(): void {
    const id = this.objectEdit.marked;
    if (!id || !this.posibleBed.exist(id)) return;
    this.editRoomService.rotateBed(this.markedBed, id);
  }
  cancel(): void {
    this.editRoomService.deleteNewBeds(this.markedRoom?.beds);
    this.editRoomService.modify({marked: ''});
    this.modeWardSvgService.setMode();
    this.endEditingRoom();
  }
  addBed(): void {
    if (!this.markedRoom) return;
    this.editRoomService.addBed(this.markedRoom);
  }
  deleteBed(): void {
    const id = this.objectEdit.marked;
    if (!id || !this.posibleBed.exist(id)) return;
    this.editRoomService.deleteBed(id, this.markedRoom?.beds);
  }
  confirm() {
  }
  ngOnDestroy(): void {
    this.subscribeEditRoomService.unsubscribe();
  }

}
