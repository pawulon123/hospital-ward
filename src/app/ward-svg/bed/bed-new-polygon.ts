import { arraysOfPolygon, logError, rect } from '../../shared/useful/useful';
const center = require('svg-polygon-center');


export function newPolygonInRoom(roomPoints: string, bedIsInRoom: Function, type = 'bedHorizontal'): string {
  let bed: string = rect(center(roomPoints), type).polygon;
  if (typeof bedIsInRoom.constructor === 'function') {
    if (!bedIsInRoom(bed)) {
      bed = rect(center(roomPoints), 'bedVertical').polygon
      if (!bedIsInRoom(bed)) {
        logError(`cen't draw bed`);
        return '';
      }
    }
  }
  return bed;
}
