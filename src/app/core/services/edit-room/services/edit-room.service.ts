import { Bed } from '../../../../shared/models/bed';
import { logError } from '../../../../shared/useful/useful';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Room } from '../../../../shared/models/room';
import { newPolygonInRoom } from '../../../../ward-svg/bed/bed-new-polygon';
import { ConfigDIEditRoom } from '../dependency-injection-config';

@Injectable()
export class EditRoomService implements OnDestroy {
  constructor(@Inject(ConfigDIEditRoom.token) private services: any) { }

  init(markedRoom: any): void {
    this.services.start(markedRoom);
    this.services.instanceEditRoom.setOrRemoveInstance(this);
  }

  restoreBeds(beds: Bed[] | undefined): void {
    if (!beds || !this.services.roomEntry.roomNotModify) return;
    beds.length = 0;
    beds.push(...this.services.roomEntry.roomNotModify.beds);
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
      this.services.bedMarked.mark(id);
    }
  }

  addBed(markedRoom: Room): void {
    const polygon = newPolygonInRoom(markedRoom?.polygon, this.polygonInRoom.bind(this));
    const bed = { room: markedRoom.id, polygon };
    this.services.bed.createBed(bed).subscribe(
      (bed: Bed) => this.services.addedBed(bed),
      (e: any) => logError(e)
    );
  }

  deleteBed(id: number): void {
    this.services.bed.deleteBed(id).subscribe(
      (isDeleted: boolean) => isDeleted ? this.services.deletedBed(id)
      :(e: any) => logError(e)
    );
  }

  confirm(): void {
    this.services.bed.updateBed(this.services.outputBed.getOutputBeds).subscribe(
      (bedsSaved: Bed[]) => this.services.confirm(bedsSaved),
      (e: any) => logError(e)
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

  polygonInRoom(bedPolygon: string): boolean {
    return this.services.bedInRoom.check(bedPolygon);
  }

  bedHasPatient(id: any): boolean {
    const bed: Bed = this.services.roomMarked.gedBed(id);
    return (bed && 'patient' in bed && bed.patient);
  }

  ngOnDestroy(): void {
    this.services.bedMarked.mark(null);
    this.services.modeWardSvg.setMode('currentState');
    this.services.ward.refreshSvg();
    this.services.instanceEditRoom.setOrRemoveInstance(this);
  }
}
