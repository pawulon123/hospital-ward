import { EditRoom } from './../../shared/models/edit-room';
import { Bed } from 'src/app/shared/models/bed';
import { logError } from '../../shared/useful/useful';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Room } from 'src/app/shared/models/room';
import { BedService } from './bed.service';
import { WardService } from './ward.service';

@Injectable({ providedIn: 'root' })
export class EditRoomService {
  objEditRoom$ = new Subject<any>()
  objEdit: EditRoom = { marked: '' };
  outputBed: any;
  posibleBed: any;
  roomEntry: any;
  bedInRoom: any;
  bedRotate: any

  constructor(
    private bedService: BedService,
    private wardService: WardService,
  ) { }
  setServices(services: any) {
    Object.assign(this, services);
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
    this.wardService.refreshSvg();
  }
  addBed(markedRoom: Room): void {
    const polygon = this.newBedPolygon(markedRoom?.polygon);
    const bed = { room: markedRoom.id, polygon };
    this.bedService.createBed(bed).subscribe(
      (bed: Bed) => {
        markedRoom?.beds.push(bed);
        this.addedBed(bed);
        this.wardService.refreshSvg();
      },
      (e: any) => this.error(e)
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
    this.objEditRoom.marked = id;
    this.posibleBed.addBed = bed;
    this.bedService.mark(id);
    this.roomEntry.addBed(bed);
  }
  deleteNewBeds(beds: Bed[] | undefined) {
    const ids = this.findIdsBedsByObjects([{ key: 'creatorComponent', value: 'editRoom' }])
    if (!ids.length) return;
    this.bedService.deleteMany(ids).subscribe(
      d=>{
        this.roomEntry.removeBeds(ids);
        this.restoreBeds(beds)
        this.wardService.refreshSvg();
      },
      (e)=>logError(e)
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
  rotateBed(bed: any,id:string){
    const b = this.outputBed.getOutputBed(id);
    const polygon = b && 'polygon' in b ? b.polygon : bed?.polygon;
    this.bedRotate.rotate({id, polygon });
    if (this.bedInRoom.check(this.bedRotate.points)) {
      this.outputBed.addOrUpdate({ id, polygon: this.bedRotate.points });
      bed.polygon = this.bedRotate.points;
      this.modify({marked: id});
    }
  }
  error(e: any): void {
    logError(e);
  }
}
