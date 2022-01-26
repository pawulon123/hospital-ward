import { Bed } from '../../../shared/models/bed';
import { callsIfInContext, findById, logError } from '../../../shared/useful/useful';
import { Injectable, OnDestroy } from '@angular/core';
import { Room } from '../../../shared/models/room';
import { BedService } from '../bed.service';
import { WardService } from '../ward.service';
import { ModeWardSvgService } from '../mode-ward-svg.service';
import { newPolygonInRoom } from '../../../ward-svg/bed/bed-new-polygon';
import { RoomEntry, BedMarkedService, BedRotate, PosibleBed, OutputBed, BedInRoom, RoomMarked, InstanceEditRoomService } from './'
@Injectable()
export class EditRoomService implements OnDestroy {

  constructor(
    private bedService: BedService,
    private bedMarkedService: BedMarkedService,
    private wardService: WardService,
    private modeWardSvgService: ModeWardSvgService,
    private bedRotate: BedRotate,
    private posibleBed: PosibleBed,
    private outputBed: OutputBed,
    private roomEntry: RoomEntry,
    private bedInRoom: BedInRoom,
    private roomMarked: RoomMarked,
    private instanceEditRoomService: InstanceEditRoomService,
  ) { }
  services: any[] = [this.posibleBed, this.outputBed, this.roomEntry, this.bedInRoom, this.roomMarked];

  init(markedRoom: any): void {
    callsIfInContext('start', this.services, markedRoom);
    this.instanceEditRoomService.setOrRemoveInstance(this);
  }

  restoreBeds(beds: Bed[] | undefined): void {
    if (!beds || !this.roomEntry.roomNotModify) return;
    beds.length = 0;
    beds.push(...this.roomEntry.roomNotModify.beds);
    this.wardService.refreshSvg();
  }

  addBed(markedRoom: Room): void {
    const polygon = newPolygonInRoom(markedRoom?.polygon, this.polygonInRoom.bind(this));
    const bed = { room: markedRoom.id, polygon };
    this.bedService.createBed(bed).subscribe(
      (bed: Bed) => {
        callsIfInContext('addedBed', this.services, bed);
        this.wardService.refreshSvg();
      },
      (e: any) => logError(e)
    )
  }

  rotateBed(bed: any): void {
    const id: number = bed.id
    const bedInOutput: Bed = this.getOutputBed(id);
    const polygon: string = bedInOutput && 'polygon' in bedInOutput ? bedInOutput.polygon : bed?.polygon;
    this.bedRotate.rotate({ id, polygon });
    if (this.polygonInRoom(this.bedRotate.points)) {
      const polygon = this.bedRotate.points
      this.addOrUpdateToOutput({ id, polygon });
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
      },
      e => logError(e)
    );
  }

  confirm(): void {
    this.bedService.updateBed(this.outputBed.getOutputBeds).subscribe(
      bedsSaved => {
        callsIfInContext('saved', this.services, bedsSaved);
      },
      e => logError(e)
    )
  }

  outputIsEmpty(): boolean {
    return !(this.outputBed.getOutputBeds.length > 0);
  }

  markedBedExist(id: number | null): boolean {
    return this.posibleBed.exist(id);
  }

  getOutputBed(id: number): Bed {
    return this.outputBed.getOutputBed(id);
  }

  addOrUpdateToOutput(bed: { id: number, polygon: string }): void {
    return this.outputBed.addOrUpdate(bed);
  }

  polygonInRoom(bedPolygon: string): boolean {
    return this.bedInRoom.check(bedPolygon);
  }

  ngOnDestroy(): void {
    this.bedMarkedService.mark(null);
    this.modeWardSvgService.setMode('currentState');
    this.instanceEditRoomService.setOrRemoveInstance(this);
  }
}
