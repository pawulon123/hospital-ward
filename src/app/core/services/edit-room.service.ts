import { EditRoom } from './../../shared/models/edit-room';
import { Bed } from 'src/app/shared/models/bed';
import { findById, polygonInPolygon, arraysOfPolygon, logError } from '../../shared/useful/useful';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Room } from 'src/app/shared/models/room';
import { BedService } from './bed.service';
import { WardService } from './ward.service';
@Injectable({ providedIn: 'root' })
export class EditRoomService {
  objEditRoom$ = new Subject<any>()
  outputBeds: Bed[] = [];
  bedsIds: string[] = [];
  objEdit: EditRoom = { marked: '' };
  roomJson: string = '';
  cordinatesRoomAsArrays: number[][] = [];
  constructor(
    private bedService: BedService,
    private wardService: WardService,
  ) { }
  modify(obj: EditRoom): void {
    if (this.objEditRoom.marked !== obj.marked ) Object.assign(this.objEditRoom, obj);
    this.objEditRoom$.next(this.objEditRoom);
  }
  initialState(): void {
    this.outputBeds.length = 0;
    this.bedsIds.length = 0;
    this.roomJson = '';
    this.objEdit.marked = ''
    this.modify(this.objEdit);
  }
  get objEditRoom(): EditRoom {
    return this.objEdit;
  }
  set objEditRoom(obj: EditRoom) {
    if (this.isPosibleBed(obj.marked)) Object.assign(this.objEdit, obj);
  }
  getOutputBed(id: string | number): Bed {
    return findById(this.outputBeds, id);
  }
  get getOutputBeds(): Bed[] {
    return this.outputBeds;
  }
  addOrUpdate(bed: { id: string | number, polygon: string }): void {
    const bedFound = this.getOutputBed(bed.id);
    bedFound ? Object.assign(bedFound, bed) : this.outputBeds.push(bed);
  }
  set posibleBeds(bedsIds: any[]) {
    this.bedsIds = bedsIds.length ? bedsIds?.map(id => id.toString()) : [];
  }
  set posibleBed(bedsId: any) {
    this.bedsIds.push(bedsId);
  }
  get posibleBeds(): string[] {
    return this.bedsIds;
  }
  isPosibleBed(id: string): boolean {
    return this.posibleBeds.includes(id);
  }
  get roomNotModify(): Room {
    return JSON.parse(this.roomJson);
  }
  set roomNotModify(room: Room | undefined) {
    this.roomJson = JSON.stringify(room);
    this.roomAsArrays = room?.polygon
  }
  roomNotModifyAddBed(bed: Bed): void {
    const room = Object.assign({}, this.roomNotModify);
    room.beds = [...this.roomNotModify.beds, bed];
    this.roomNotModify = room;
  }
  set roomAsArrays(polygon: any | undefined) {
    this.cordinatesRoomAsArrays = arraysOfPolygon(polygon);
  }
  get roomAsArrays(): number[][] {
    return this.cordinatesRoomAsArrays
  }
  restoreBeds(beds: Bed[] | undefined ): void {
    if(!beds) return;
    beds.length = 0;
    beds.push(...this.roomNotModify.beds);
    this.wardService.refreshSvg();
  }
  bedIsInRoom(bedAsArrays: number[][]): Boolean {
    return polygonInPolygon(bedAsArrays, this.roomAsArrays);
  }
  addBed(markedRoom: Room): void{
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
    this.addOrUpdate({ id, polygon: bed.polygon });
    this.objEditRoom.marked = id;
    this.posibleBed = id;
    this.bedService.mark(id);
    this.roomNotModifyAddBed(bed);
  }
  error(e: any): void {
    logError(e);
  }
}
