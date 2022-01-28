import { Bed } from '../../../shared/models/bed';
import { callOnObj, callsIfInContext, logError, partial } from '../../../shared/useful/useful';
import { Injectable, OnDestroy } from '@angular/core';
import { Room } from '../../../shared/models/room';
import { newPolygonInRoom } from '../../../ward-svg/bed/bed-new-polygon';
import { RoomEntry, BedRotate, PosibleBed, OutputBed, BedInRoom, RoomMarked } from './'
import { OutsideEditRoomService } from './outside-services';
@Injectable()
export class EditRoomService implements OnDestroy {

  constructor(
    private bedRotate: BedRotate,
    private posibleBed: PosibleBed,
    private outputBed: OutputBed,
    private roomEntry: RoomEntry,
    private bedInRoom: BedInRoom,
    private roomMarked: RoomMarked,
    private outsideEditRoomService: OutsideEditRoomService,
  ) {
    const servicesAsObject = this.services.reduce((obj: any, serviceName: any) => {
      obj[serviceName] = (this as Record<string, any>)[serviceName];
      return obj;
    }, {})
    this.callServices = partial(callOnObj, servicesAsObject);
  }

  private callServices: Function = () => { }
  private services: string[] = ['posibleBed', 'outputBed', 'roomEntry', 'bedInRoom', 'roomMarked', 'outsideEditRoomService'];


  init(markedRoom: any): void {
    this.callServices('start', ['posibleBed', 'roomEntry', 'bedInRoom', 'roomMarked'], markedRoom);
    this.outsideEditRoomService.instanceEditRoom.setOrRemoveInstance(this);
  }

  restoreBeds(beds: Bed[] | undefined): void {
    if (!beds || !this.roomEntry.roomNotModify) return;
    beds.length = 0;
    beds.push(...this.roomEntry.roomNotModify.beds);
    this.outsideEditRoomService.ward.refreshSvg();
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
      this.outsideEditRoomService.bedMarked.mark(id);
    }
  }

  addBed(markedRoom: Room): void {
    const polygon = newPolygonInRoom(markedRoom?.polygon, this.polygonInRoom.bind(this));
    const bed = { room: markedRoom.id, polygon };
    this.outsideEditRoomService.bed.createBed(bed).subscribe(
      (bed: Bed) => this.callServices('addedBed', ['posibleBed', 'roomEntry', 'outputBed', 'roomMarked', 'outsideEditRoomService'], bed),
      e => logError(e)
    );
  }

  deleteBed(id: number): void {
    this.outsideEditRoomService.bed.deleteBed(id).subscribe(
      (isDeleted: boolean) => isDeleted ? this.callServices('deletedBed', ['posibleBed', 'roomEntry', 'outputBed', 'roomMarked', 'outsideEditRoomService'], id)
        : logError('the bed cannot be removed'),
      e => logError(e)
    );
  }

  confirm(): void {
    this.outsideEditRoomService.bed.updateBed(this.outputBed.getOutputBeds).subscribe(
      (bedsSaved: Bed[]) => this.callServices('saved', ['roomMarked'], bedsSaved),
      e => logError(e)
    );
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

  bedHasPatient(id: any) {
    const bed: Bed = this.roomMarked.gedBed(id);
    return (bed && 'patient' in bed && bed.patient);
  }

  ngOnDestroy(): void {
    this.outsideEditRoomService.instanceEditRoom.setOrRemoveInstance(this);
  }
}
