import { EditRoom } from '../../../shared/models/edit-room';
import { Bed } from '../../../shared/models/bed';
import { findById, logError } from '../../../shared/useful/useful';
import { Injectable } from '@angular/core';
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

@Injectable()
export class EditRoomService {
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
    public bedInRoom: BedInRoom
  ) { }
  init(markedRoom: any, end: Function): void {
    this.markedRoom = markedRoom;
    this.end = end;
    this.roomEntry.roomNotModify = markedRoom;
    this.posibleBed.beds = markedRoom?.beds;
    this.bedInRoom.roomPolygon = markedRoom?.polygon;
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
    const polygon = this.newBedPolygon(markedRoom?.polygon);
    const bed = { room: markedRoom.id, polygon };
    this.bedService.createBed(bed).subscribe(
      (bed: Bed) => {
        markedRoom?.beds.push(bed);
        this.wardService.refreshSvg();
        this.addedBed(bed);
      },
      (e: any) => logError(e)
    )
  }
  newBedPolygon(markedRoomPolygon: string): string {
    return this.bedService.newPolygonInRoom(
      markedRoomPolygon,
      this.bedInRoom.check.bind(this.bedInRoom)
    );
  }
  addedBed(bed: Bed): void {
    let id = bed.id
    if (!id) return;
    bed.creatorComponent = 'editRoom';
    this.outputBed.addOrUpdate({ id, polygon: bed.polygon });
    this.posibleBed.addBed = bed;
    this.roomEntry.addBed(bed);
  }
  deleteNewBeds(beds: Bed[] | undefined): void {
    const ids = this.findIdsBedsByObjects([{ key: 'creatorComponent', value: 'editRoom' }]);
    this.roomEntry.removeBeds(ids);
    this.outputBed.beds = [];
    this.posibleBed.beds = [];
    this.wardService.refreshSvg('currentState');
    if (!ids.length) return;
    this.bedService.deleteMany(ids).subscribe(
      d => { if (typeof d !== 'boolean') logError(d.message) },
      e => logError(e)
    );
  }
  findIdsBedsByObjects(keysValues: any[]): number[] {
    // console.log(this.markedRoom.beds.length);

    return keysValues.reduce((arrIds: number[], keyValue: { key: string, value: string }) => {
      let { key, value } = keyValue || {};

      this.roomEntry.roomNotModify?.beds.forEach((bed: any) => {
        if (key in bed && 'id' in bed && bed[key] === value && !bed.patient) {
          bed[key] = null;
          arrIds.push(bed.id)
        };


      });
      return arrIds;
    }, [])
  }
  rotateBed(bed: any, id: number): void {
    const b: Bed = this.outputBed.getOutputBed(id);
    const polygon: string = b && 'polygon' in b ? b.polygon : bed?.polygon;
    this.bedRotate.rotate({ id, polygon });
    if (this.bedInRoom.check(this.bedRotate.points)) {
      const polygon = this.bedRotate.points
      this.outputBed.addOrUpdate({ id, polygon });
      bed.polygon = polygon;
      this.bedMarkedService.modify({ marked: id });
    }
  }
  deleteBed(id: number, beds: Bed[] | undefined): void {
    if (!beds) return;
    const bed = findById(beds, id)
    if (bed && 'patient' in bed && bed.patient) {
      logError('bed have patient cannot delete');
      return;
    }
    this.roomEntry.removeBed(id);
    this.outputBed.delete(id);
    const newBeds = beds.filter(bed => bed.id != id);
    beds.length = 0;
    beds.push(...newBeds);
    this.bedMarkedService.modify({ marked: null });
    this.wardService.refreshSvg();
    this.bedService.deleteBed(id).subscribe(
      isDeleted => { if (!isDeleted) logError('the bed cannot be removed') },
      e => logError(e)
    );
  }
  confirm() {
    this.bedService.updateBed(this.outputBed.getOutputBeds).subscribe(
      beds => {
        beds.forEach((bed: any) => {
          let r = findById(this.markedRoom?.beds, bed.id);
          if (r) {
            r = Object.assign({}, r, bed)
          }
        });
        console.log(this.markedRoom.beds);
        this.bedMarkedService.modify({ marked: null });
        this.setMode('currentState');
        this.outputBed.beds = [];
        this.posibleBed.beds = [];
        this.roomEntry.room = '';
        this.markedRoom = '';
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
