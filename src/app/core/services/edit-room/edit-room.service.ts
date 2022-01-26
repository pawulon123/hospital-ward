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
  private services: any[] = [this.posibleBed, this.outputBed, this.roomEntry, this.bedInRoom, this.roomMarked];

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


  rotateBed(bed: Bed): void {
    if (!bed.id) return
    const id = bed.id;
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

  addBed(markedRoom: Room): void {
    const polygon = newPolygonInRoom(markedRoom?.polygon, this.polygonInRoom.bind(this));
    const bed = { room: markedRoom.id, polygon };
    this.bedService.createBed(bed).subscribe(
      (bed: Bed) => this.addedBed(bed),
      (e: any) => logError(e)
    )
  }
  private addedBed(bed: Bed) {
    callsIfInContext('addedBed', this.services, bed);
    this.wardService.refreshSvg();
  }
  deleteBed(id: number ): void {
    this.bedService.deleteBed(id).subscribe(
      isDeleted => this.deletedBed(id, isDeleted),
      e => logError(e)
    );
  }
  private deletedBed(id: number, isDeleted: boolean) {
    if (!isDeleted) {
      logError('the bed cannot be removed');
      return;
    }
    callsIfInContext('deletedBed', this.services, id);
    this.bedMarkedService.mark(null);
    this.wardService.refreshSvg();
  }

  confirm(): void {
    this.bedService.updateBed(this.outputBed.getOutputBeds).subscribe(
      bedsSaved => this.saved(bedsSaved),
      e => logError(e)
    )
  }
  private saved(bedsSaved: Bed[]) {
    callsIfInContext('saved', this.services, bedsSaved);
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

  bedHasPatient(id: any){
    const bed: Bed = this.roomMarked.gedBed(id);
    return (bed && 'patient' in bed && bed.patient);
  }

  ngOnDestroy(): void {
    this.bedMarkedService.mark(null);
    this.modeWardSvgService.setMode('currentState');
    this.instanceEditRoomService.setOrRemoveInstance(this);
  }
}
