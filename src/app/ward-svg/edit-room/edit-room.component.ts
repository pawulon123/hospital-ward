import { WardService } from './../../core/services/ward.service';
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


@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css'],
  providers: [BedRotate, PosibleBed, OutputBed]
})
export class EditRoomComponent implements OnInit, OnDestroy {

  constructor(
    private editRoomService: EditRoomService,
    private modeWardSvgService: ModeWardSvgService,
    private bedRotate: BedRotate,
    private posibleBed: PosibleBed,
    private outputBed: OutputBed
    ) { }
  private markedRoom: Room | undefined;
  private endEditingRoom: Function = () => { };
  private subscribeEditRoomService: any;
  private objectEdit: EditRoom | { marked: string } = { marked: '' };

  ngOnInit() {
    this.editRoomService.setPosibleBed(this.posibleBed);
    this.editRoomService.setOutputBed(this.outputBed);
    this.editRoomService.roomNotModify = this.markedRoom;
    this.posibleBed.beds = this.markedRoom?.beds;
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
    const bed = this.outputBed.getOutputBed(id);
    const polygon = bed && 'polygon' in bed ? bed.polygon : this.markedBed?.polygon;
    this.bedRotate.rotate({ id, polygon });
    if (this.editRoomService.bedIsInRoom(this.bedRotate.coordinatesAsArrays)) {
      this.outputBed.addOrUpdate({ id, polygon: this.bedRotate.points });
      this.markedBed.polygon = this.bedRotate.points;
      this.editRoomService.modify(this.objectEdit);
    }
  }
  cancel(): void {
    this.editRoomService.deleteNewBeds();
    this.editRoomService.restoreBeds(this.markedRoom?.beds);
    this.editRoomService.initialState();
    this.modeWardSvgService.setMode();
    this.endEditingRoom();
  }
  addBed(): void {
    if (!this.markedRoom) return;
    this.editRoomService.addBed(this.markedRoom);
  }
  deleteBed() {
    const id = this.objectEdit.marked;
    if (!id || !this.posibleBed.exist(id)) return;
  }
  confirm() {
  }
  ngOnDestroy(): void {
    this.subscribeEditRoomService.unsubscribe();
  }

}
