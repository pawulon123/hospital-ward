import { Bed } from '../../../shared/models/bed';
import { callsIfInContext, cloneDeep, findById, findIdsByObjects, logError, partial, withoutId } from '../../../shared/useful/useful';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Room } from '../../../shared/models/room';
import { BedService } from '../bed.service';
import { WardService } from '../ward.service';
import { ModeWardSvgService } from '../mode-ward-svg.service';
import { PosibleBed } from './posible-bed';
import { OutputBed } from './output-bed';
import { RoomEntry } from './room-entry';
import { BedRotate } from './bed-rotate';
import { BedInRoom } from './bed-in-room';
import { BedMarkedService } from './bed-marked';
import { InstanceEditRoomService } from './instance-edit-room-service';
import { newPolygonInRoom } from '../../../ward-svg/bed/bed-new-polygon';

@Injectable()
export class EditRoomService implements OnDestroy, OnInit {
  end: Function = () => { }
  markedRoom: any
  constructor(
    private bedService: BedService,
    private bedMarkedService: BedMarkedService,
    private wardService: WardService,
    private modeWardSvgService: ModeWardSvgService,
    private bedRotate: BedRotate,
    public posibleBed: PosibleBed,
    public outputBed: OutputBed,
    public roomEntry: RoomEntry,
    public bedInRoom: BedInRoom,
    private instanceEditRoomService: InstanceEditRoomService,
  ) { }

  services: any[] = [this.posibleBed, this.outputBed, this.roomEntry, this.bedInRoom, this];
  ngOnInit() { console.log('cannot call !!'); }
  ngOnDestroy(): void {

  }
  init(markedRoom: any, end: Function): void {
    callsIfInContext('start', this.services, markedRoom);

    this.end = end;
  }
  start(markedRoom: any) {
    this.markedRoom = markedRoom;
    this.instanceEditRoomService.setInstance(this);
  }
  addedBed(bed: any) {
    this.markedRoom.beds.push(bed);
    this.wardService.refreshSvg();
  }
  deletedBed(id: number) {
    const newBeds = withoutId(this.markedRoom.beds, id);
    this.markedRoom.beds.length = 0;
    this.markedRoom.beds.push(...newBeds);
    this.bedMarkedService.mark(null);
    this.wardService.refreshSvg();
  }

  setMode(mode: string): void {
    this.modeWardSvgService.setMode(mode);
  }
  restoreBeds(beds: Bed[] | undefined): void {
    if (!beds || !this.roomEntry.roomNotModify) return;
    // const bedWithoutNew = this.roomEntry.roomNotModify.beds.
    console.log(this.roomEntry.roomNotModify);
    beds.length = 0;
    beds.push(...this.roomEntry.roomNotModify.beds);
    // this.wardService.refreshSvg('currentState');
  }
  addBed(markedRoom: Room): void {
    const polygon = newPolygonInRoom(markedRoom?.polygon, this.bedInRoom.check.bind(this.bedInRoom));
    const bed = { room: markedRoom.id, polygon };
    this.bedService.createBed(bed).subscribe(
      (bed: Bed) => {
        bed.isNew = true;
        this.services.forEach(s => s.addedBed(bed));
      },
      (e: any) => logError(e)
    )
  }

  rotateBed(bed: any, id: number): void {
    const b: Bed = this.outputBed.getOutputBed(id);
    const polygon: string = b && 'polygon' in b ? b.polygon : bed?.polygon;
    this.bedRotate.rotate({ id, polygon });
    if (this.bedInRoom.check(this.bedRotate.points)) {
      const polygon = this.bedRotate.points
      this.outputBed.addOrUpdate({ id, polygon });
      bed.polygon = polygon;
      this.bedMarkedService.mark(id);
    }
  }
  deleteBed(id: number): void {
    const bed = findById(this.markedRoom?.beds, id)
    if (bed && 'patient' in bed && bed.patient) {
      logError('bed has patient cannot delete');
      return;
    }
    this.bedService.deleteBed(id).subscribe(
      isDeleted => {
        if (!isDeleted) {
          logError('the bed cannot be removed');
          return;
        }
        this.services.forEach(s => s.deletedBed(id));
      },
      e => logError(e)
    );
  }
  confirm() {
    this.bedService.updateBed(this.outputBed.getOutputBeds).subscribe(
      beds => {
        beds.forEach((bed: any) => {
          let r = findById(this.markedRoom?.beds, bed.id);
          if (r) {
            delete r.isNew
            Object.assign(r, bed)
          }
        });
        this.bedMarkedService.mark(null);
        this.setMode('currentState');
        this.outputBed.beds = [];
        this.posibleBed.beds = [];
        this.roomEntry.room = '';
        this.wardService.refreshSvg();
        this.end();
      },
      e => logError(e)
    )
  }
  outputIsEmpty(): boolean {
    return (this.outputBed.getOutputBeds.length > 0);
  }
}
