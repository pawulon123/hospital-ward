import { Bed } from '../../../shared/models/bed';
import { callsIfInContext, findById, logError } from '../../../shared/useful/useful';
import { Injectable } from '@angular/core';
import { Room } from '../../../shared/models/room';
import { BedService } from '../bed.service';
import { WardService } from '../ward.service';
import { ModeWardSvgService } from '../mode-ward-svg.service';
import { newPolygonInRoom } from '../../../ward-svg/bed/bed-new-polygon';
import { RoomEntry, BedMarkedService, BedRotate, PosibleBed, OutputBed, BedInRoom, RoomMarked, InstanceEditRoomService } from './'
@Injectable()
export class EditRoomService {

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
    public roomMarked: RoomMarked,
    private instanceEditRoomService: InstanceEditRoomService,
  ) { }
  services: any[] = [this.posibleBed, this.outputBed, this.roomEntry, this.bedInRoom, this.roomMarked];

  init(markedRoom: any): void {
    callsIfInContext('start', this.services, markedRoom);
    this.instanceEditRoomService.setOrRemoveInstance(this);
  }

  setMode(mode: string): void {
    this.modeWardSvgService.setMode(mode);
  }

  restoreBeds(beds: Bed[] | undefined): void {
    if (!beds || !this.roomEntry.roomNotModify) return;
    beds.length = 0;
    beds.push(...this.roomEntry.roomNotModify.beds);
    this.wardService.refreshSvg('currentState');
  }

  addBed(markedRoom: Room): void {
    const polygon = newPolygonInRoom(markedRoom?.polygon, this.bedInRoom.check.bind(this.bedInRoom));
    const bed = { room: markedRoom.id, polygon };
    this.bedService.createBed(bed).subscribe(
      (bed: Bed) => {
        callsIfInContext('addedBed', this.services, bed);
        this.wardService.refreshSvg();
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
    const bed = findById(this.roomMarked.beds, id);
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
        callsIfInContext('deletedBed', this.services, id);
        this.bedMarkedService.mark(null);
        this.wardService.refreshSvg();
        this.instanceEditRoomService.setOrRemoveInstance(this);
      },
      e => logError(e)
    );
  }

  confirm(): void {
    this.bedService.updateBed(this.outputBed.getOutputBeds).subscribe(
      bedsSaved => {
        callsIfInContext('saved', this.services, bedsSaved);
        this.bedMarkedService.mark(null);
        this.setMode('currentState');
        this.instanceEditRoomService.setOrRemoveInstance(this);
      },
      e => logError(e)
    )
  }

  outputIsEmpty(): boolean {
    return !(this.outputBed.getOutputBeds.length > 0);
  }
}
