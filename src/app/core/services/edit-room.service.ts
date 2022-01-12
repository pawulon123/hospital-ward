import { EditRoom } from './../../shared/models/edit-room';
import { Bed } from 'src/app/shared/models/bed';
import { findById, polygonInPolygon, arraysOfPolygon, logError } from '../../shared/useful/useful';
import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Room } from 'src/app/shared/models/room';
import { BedService } from './bed.service';
import { WardService } from './ward.service';
@Injectable({ providedIn: 'root' })
export class EditRoomService  {
  objEditRoom$ = new Subject<any>()
  objEdit: EditRoom = { marked: '' };
  cordinatesRoomAsArrays: number[][] = [];
  outputBed:any;
  posibleBed:any;
  roomEntry:any;
  constructor(
    private bedService: BedService,
    private wardService: WardService,
  ) { }
  setPosibleBed(instance:any){
  this.posibleBed = instance;
  }
  setOutputBed(instance:any){
  this.outputBed = instance;
  }
  setRoomEntry(instance:any){
  this.roomEntry = instance;
  }
  modify(obj: EditRoom): void {
    if (this.objEditRoom.marked !== obj.marked) Object.assign(this.objEditRoom, obj);
    this.objEditRoom$.next(this.objEditRoom);
  }
  initialState(): void {

    this.objEdit.marked = ''
    this.modify(this.objEdit);
  }
  get objEditRoom(): EditRoom {
    return this.objEdit;
  }
  set objEditRoom(obj: EditRoom) {
    if (this.posibleBed.isPosibleBed(obj.marked)) Object.assign(this.objEdit, obj);
  }
  set roomAsArrays(polygon: any | undefined) {
    this.cordinatesRoomAsArrays = arraysOfPolygon(polygon);
  }
  get roomAsArrays(): number[][] {
    return this.cordinatesRoomAsArrays;
  }
  bedIsInRoom(bedAsArrays: number[][]): Boolean {
    return polygonInPolygon(bedAsArrays, this.roomAsArrays);
  }
  restoreBeds(beds: Bed[] | undefined): void {
    if (!beds || !this.roomEntry.roomNotModify) return;
    beds.length = 0;
    beds.push(...this.roomEntry.roomNotModify.beds);
    this.wardService.refreshSvg();
  }
  addBed(markedRoom: Room): void {
    const polygon = this.newBedPolygon(markedRoom);
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
  newBedPolygon(markedRoom: Room): string {
    return markedRoom ?
      this.bedService.newPolygonInRoom(
        markedRoom.polygon,
        this.bedIsInRoom.bind(this)
      ) : '';
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
    this.roomEntry.roomNotModifyAddBed(bed);
  }
  deleteNewBeds() {
    const ids = this.findIdsBedsByObjects([{ key: 'creatorComponent', value: 'editRoom' }])
    this.bedService.deleteMany(ids);
    this.roomEntry.roomNotModifyRemoveBeds(ids);
  }
  findIdsBedsByObjects(keysValues: any[]): number[] {
    return keysValues.reduce((arrIds: number[], keyValue: {key: string, value: string}) => {
      let { key, value } = keyValue || {};
      this.roomEntry.roomNotModify?.beds.forEach((bed: any) => {
        if (key in bed && 'id' in bed && bed[key] === value && !bed.patient) arrIds.push(bed.id);
      });
      return arrIds;
    }, [])
  }
  error(e: any): void {
    logError(e);
  }
}
