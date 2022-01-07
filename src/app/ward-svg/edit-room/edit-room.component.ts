import { Ward } from 'src/app/shared/models/ward';
import { WardService } from './../../core/services/ward.service';
import { EditRoom } from './../../shared/models/edit-room';
import { Room } from '../../shared/models/room';
import { Bed } from '../../shared/models/bed';
import { EditRoomService } from './../../core/services/edit-room.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BedRotate } from './bed-rotate';
import { findById } from '../../shared/useful/useful';
import { ModeWardSvgService } from 'src/app/core/services/mode-ward-svg.service';
import { BedService } from '../../core/services/bed.service';
import { WardComponent } from '../ward/ward.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css'],
})
export class EditRoomComponent implements OnInit, OnDestroy {


  constructor(
    private editRoomService: EditRoomService,
    private modeWardSvgService: ModeWardSvgService,
    private bedService: BedService,
    private wardService: WardService,
    // private route:  ActivatedRoute
    private router:  Router
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
    this.editRoomService.restoreBeds(this.markedRoom?.beds);
    this.editRoomService.initialState();
    this.modeWardSvgService.setMode();
    this.endEditingRoom();
  }
  addBed():void {
    const polygon = this.markedRoom ?
      this.bedService.newPolygonInRoom(
        this.markedRoom.polygon,
        this.editRoomService.bedIsInRoom.bind(this.editRoomService)
        ) : '';
    if (!polygon) return;
    const bed = {
      room: this.markedRoom?.id,
      polygon
    }
    this.bedService.createBed(bed).subscribe((bed) => {
      this.markedRoom?.beds.push(bed);
      this.wardService.refreshSvg();
    });
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
