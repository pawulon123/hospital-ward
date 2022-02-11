import { Room } from './../../../../shared/models/room';
import { Injectable } from '@angular/core';
import { arraysOfPolygon, polygonInPolygon } from '../../../../shared/useful/coordinate-system';
import { EditRoomStart } from '../../../../shared/models/edit-room-events';
@Injectable()
export class BedInRoom implements EditRoomStart {

  roomArrays: number[][] =[];

  set roomPolygon(polygon: string ) {
    this.roomArrays = polygon ? arraysOfPolygon(polygon) : [];
  }

  check(bedPolygon: string): boolean {
    const bedArrays: number[][] = arraysOfPolygon(bedPolygon);
    return polygonInPolygon(bedArrays, this.roomArrays);
  }

  start(markedRoom: Room): void {
    this.roomPolygon = markedRoom?.polygon;
  }
}
