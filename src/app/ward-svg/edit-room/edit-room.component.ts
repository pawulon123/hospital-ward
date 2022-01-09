import { WardService } from './../../core/services/ward.service';
import { EditRoom } from './../../shared/models/edit-room';
import { Room } from '../../shared/models/room';
import { Bed } from '../../shared/models/bed';
import { EditRoomService } from './../../core/services/edit-room.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BedRotate } from './bed-rotate';
import { findById, logError } from '../../shared/useful/useful';
import { ModeWardSvgService } from 'src/app/core/services/mode-ward-svg.service';


@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css'],
})
export class EditRoomComponent implements OnInit, OnDestroy {

  constructor(
    private editRoomService: EditRoomService,
    private modeWardSvgService: ModeWardSvgService,
    ) { }
  private markedRoom: Room | undefined;
  private endEditingRoom: Function = () => { };
  private subscribeEditRoomService: any;
  private objectEdit: EditRoom | { marked: string } = { marked: '' };
  bedRotate = new BedRotate();

  ngOnInit() {
    this.editRoomService.roomNotModify = this.markedRoom;
    this.editRoomService.posibleBeds = this.markedRoom ? this.markedRoom?.beds.map((bed: Bed) => bed.id) : [];
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
    if (!id || !this.editRoomService.isPosibleBed(id)) return;
    const bed = this.editRoomService.getOutputBed(id);
    const polygon = bed && 'polygon' in bed ? bed.polygon : this.markedBed?.polygon;
    this.bedRotate.rotate({ id, polygon });
    if (this.editRoomService.bedIsInRoom(this.bedRotate.coordinatesAsArrays)) {
      this.editRoomService.addOrUpdate({ id, polygon: this.bedRotate.points });
      this.markedBed.polygon = this.bedRotate.points;
      this.editRoomService.modify(this.objectEdit);
    }
  }
  cancel(): void {
    this.editRoomService.deleteNew();
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
    if (!id || !this.editRoomService.isPosibleBed(id)) return;
  }
  confirm() {
  }
  ngOnDestroy(): void {
    this.subscribeEditRoomService.unsubscribe();
  }

}
