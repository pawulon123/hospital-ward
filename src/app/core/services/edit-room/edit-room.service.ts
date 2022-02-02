import { Bed } from '../../../shared/models/bed';
import { callOnObj as callServices,  logError, partial as setServices } from '../../../shared/useful/useful';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Room } from '../../../shared/models/room';
import { newPolygonInRoom } from '../../../ward-svg/bed/bed-new-polygon';
import { OutsideEditRoomService } from './outside-services';
@Injectable()
export class EditRoomService implements OnDestroy {

  private callServices: Function = () => { }
  constructor(
    @Inject('Services') private services: any,
    @Inject(OutsideEditRoomService) private outsideEditRoomService: any,
  ) {
    this.callServices = setServices(callServices, this.services);
  }
    init(markedRoom: any): void {
    this.callServices('start', ['posibleBed', 'roomEntry', 'bedInRoom', 'roomMarked'], markedRoom);
    this.outsideEditRoomService.instanceEditRoom.setOrRemoveInstance(this);
  }

  restoreBeds(beds: Bed[] | undefined): void {
    if (!beds || !this.services.roomEntry.roomNotModify) return;
    beds.length = 0;
    beds.push(...this.services.roomEntry.roomNotModify.beds);
    this.outsideEditRoomService.ward.refreshSvg();
  }

  rotateBed(bed: Bed): void {
    if (!bed.id) return
    const id = bed.id;
    const bedInOutput: Bed = this.getOutputBed(id);
    const polygon: string = bedInOutput && 'polygon' in bedInOutput ? bedInOutput.polygon : bed?.polygon;
    this.services.bedRotate.rotate({ id, polygon });
    if (this.polygonInRoom(this.services.bedRotate.points)) {
      const polygon = this.services.bedRotate.points
      this.addOrUpdateToOutput({ id, polygon });
      bed.polygon = polygon;
      this.outsideEditRoomService.bedMarked.mark(id);
    }
  }

  addBed(markedRoom: Room): void {
    const polygon = newPolygonInRoom(markedRoom?.polygon, this.polygonInRoom.bind(this));
    const bed = { room: markedRoom.id, polygon };
    this.outsideEditRoomService.bed.createBed(bed).subscribe(
      (bed: Bed) => this.callServices('addedBed', ['posibleBed', 'roomEntry', 'outputBed', 'roomMarked'], bed),
      (e:any) => logError(e)
    );
  }

  deleteBed(id: number): void {
    this.outsideEditRoomService.bed.deleteBed(id).subscribe(
      (isDeleted: boolean) => isDeleted ? this.callServices('deletedBed', ['posibleBed', 'roomEntry', 'outputBed', 'roomMarked'], id)
        : logError('the bed cannot be removed'),
        (e:any) => logError(e)
    );
  }

  confirm(): void {
    this.outsideEditRoomService.bed.updateBed(this.services.outputBed.getOutputBeds).subscribe(
      (bedsSaved: Bed[]) => this.callServices('saved', ['roomMarked'], bedsSaved),
      (e:any) => logError(e)
    );
  }

  outputIsNotEmpty(): boolean {
    return this.services.outputBed.getOutputBeds.length > 0;
  }

  markedBedExist(id: number | null): boolean {
    return this.services.posibleBed.exist(id);
  }

  getOutputBed(id: number): Bed {
    return this.services.outputBed.getOutputBed(id);
  }

  addOrUpdateToOutput(bed: { id: number, polygon: string }): void {
    return this.services.outputBed.addOrUpdate(bed);
  }

  polygonInRoom(bedPolygon: string) {
    return this.services.bedInRoom.check(bedPolygon);
  }

  bedHasPatient(id: any) {
    const bed: Bed = this.services.roomMarked.gedBed(id);
    return (bed && 'patient' in bed && bed.patient);
  }

  ngOnDestroy(): void {
    this.outsideEditRoomService.instanceEditRoom.setOrRemoveInstance(this);
  }
}
