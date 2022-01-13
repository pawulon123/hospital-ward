import { Injectable } from '@angular/core';
import { arraysOfPolygon, polygonInPolygon } from '../../shared/useful/coordinate-system';
@Injectable()
export class BedInRoom {
  roomArrays:any;
  set roomPolygon(polygon:string | undefined) {
    this.roomArrays = polygon ? arraysOfPolygon(polygon) : [];
  }
  check(bedPolygon:any) {
    const bedArrays = arraysOfPolygon(bedPolygon)
  return polygonInPolygon(bedArrays, this.roomArrays);
  }
}
