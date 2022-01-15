import { EditRoom } from '../../../shared/models/edit-room';
import { Bed } from 'src/app/shared/models/bed';
import { logError } from '../../../shared/useful/useful';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Room } from 'src/app/shared/models/room';
import { BedService } from '../bed.service';
import { WardService } from '../ward.service';
import { ModeWardSvgService } from '../mode-ward-svg.service';
import { PosibleBed } from './posible-bed';
import { OutputBed } from './output-bed';
import { RoomEntry } from './room-entry';
import { BedRotate } from './bed-rotate';
import { BedInRoom } from './bed-in-room';

@Injectable()
export class EditRoomService {
  objEditRoom$ = new Subject<any>()
  objEdit: EditRoom = { marked: '' };

  constructor(
    private bedService: BedService,
    private wardService: WardService,
    private modeWardSvgService: ModeWardSvgService,
    private bedRotate: BedRotate,
    public posibleBed: PosibleBed,
    public outputBed: OutputBed,
    private roomEntry: RoomEntry,
    public bedInRoom: BedInRoom
  ) { }
  init(markedRoom: any): void {
    this.roomEntry.roomNotModify = markedRoom;
    this.posibleBed.beds = markedRoom?.beds;
    this.bedInRoom.roomPolygon = markedRoom?.polygon;


  }
  setMode(mode: string): void {
    this.modeWardSvgService.setMode(mode);
  }
  modify(obj: EditRoom): void {
    if (this.objEditRoom.marked !== obj.marked) Object.assign(this.objEditRoom, obj);
    this.objEditRoom$.next(this.objEditRoom);
  }
  get objEditRoom(): EditRoom {
    return this.objEdit;
  }
  set objEditRoom(obj: EditRoom) {
    if (this.posibleBed.exist(obj.marked)) Object.assign(this.objEdit, obj);
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
    id = id.toString()
    bed.creatorComponent = 'editRoom';
    this.outputBed.addOrUpdate({ id, polygon: bed.polygon });
    this.posibleBed.addBed = bed;
    this.roomEntry.addBed(bed);
  }
  deleteNewBeds(beds: Bed[] | undefined): void {
    const ids = this.findIdsBedsByObjects([{ key: 'creatorComponent', value: 'editRoom' }]);
    this.roomEntry.removeBeds(ids);
    this.wardService.refreshSvg('currentState');
    if (!ids.length) return;
    this.bedService.deleteMany(ids).subscribe(
      d => { if (typeof d !== 'boolean') logError(d.message) },
      e => logError(e)
    );
  }
  findIdsBedsByObjects(keysValues: any[]): number[] {
    return keysValues.reduce((arrIds: number[], keyValue: { key: string, value: string }) => {
      let { key, value } = keyValue || {};
      this.roomEntry.roomNotModify?.beds.forEach((bed: any) => {
        if (key in bed && 'id' in bed && bed[key] === value && !bed.patient) arrIds.push(bed.id);
      });
      return arrIds;
    }, [])
  }
  rotateBed(bed: any, id: string): void {
    const b: Bed = this.outputBed.getOutputBed(id);
    const polygon: string = b && 'polygon' in b ? b.polygon : bed?.polygon;
    this.bedRotate.rotate({ id, polygon });
    if (this.bedInRoom.check(this.bedRotate.points)) {
      this.outputBed.addOrUpdate({ id, polygon: this.bedRotate.points });
      bed.polygon = this.bedRotate.points;
      this.modify({ marked: id });
    }
  }
  deleteBed(id: string, beds: Bed[] | undefined): void {
    if (!beds) return;
    this.roomEntry.removeBed(id);
    beds.length = 0;
    beds.push(...this.roomEntry.roomNotModify.beds);
    this.outputBed.delete(id);
    this.wardService.refreshSvg('editRoom');
    this.bedService.deleteBed(id).subscribe(
      isDeleted => {if (!isDeleted)logError('the bed cannot be removed')},
      e => logError(e)
      );
  }

}
