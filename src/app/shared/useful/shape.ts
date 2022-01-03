import { Coordinates } from './../models/coordinate';
import { partial, polygonOfcoordinates, sin, sumCoordinates, move, scale, compose as drawTronsform, arraysOfPolygon, logError } from '../../shared/useful/useful';
import shape from './shape-config';



export function circle(center: Coordinates): { polygon: string, coordinates: Coordinates[] } {
  const sum: Function = partial(sumCoordinates, center);
  const c: Coordinates[] = shape.coordinates.circle.draw(shape.coordinates.circle.r)
  const circle: Coordinates[] = drawTronsform(scale, sum/*,move*/)(c);
  return returnedShape(circle);
}
export function rect(center: Coordinates, type: string): { polygon: string, coordinates: Coordinates[] } {
  const sum: Function = partial(sumCoordinates, center);
  const rec: Coordinates[] = shape.coordinates.rect.draw((shape.coordinates.rect as Record<string, any>)[type])
  const rect: Coordinates[] = drawTronsform(scale, sum/*,move*/)(rec);
  return returnedShape(rect);
}
export function triangle(center: Coordinates): { polygon: string, coordinates: Coordinates[] } {
  const sum: Function = partial(sumCoordinates, center);
  const triangle: Coordinates[] = drawTronsform(scale, sum/*,move*/)(shape.coordinates.equilateralTriangle);
  return returnedShape(triangle);
}
export function charX(center: Coordinates): any {
  const sum: Function = partial(sumCoordinates, center);
  const charX: Coordinates[] = drawTronsform(scale, /*move,*/ sum)(shape.coordinates.x);
  return returnedShape(charX);
}

function returnedShape(shape: Coordinates[]): { polygon: string, coordinates: Coordinates[] } {
  return {
    polygon: polygonOfcoordinates(shape),
    coordinates: shape
  };
}
// export function createBed(roomPoints: string, bedIsInRoom: Function, type = 'bedHorizontal') {
//   let bed = rect(center(roomPoints), type).polygon;
//   if (typeof bedIsInRoom.constructor === 'function') {
//     let bedArrays = arraysOfPolygon(bed);
//     if (!bedIsInRoom(bedArrays)) {
//       bed = rect(center(roomPoints), 'bedVertical').polygon
//       bedArrays = arraysOfPolygon(bed);
//       return (bedIsInRoom(bedArrays)) ? bed : logError(`cen't draw bed`);
//     }
//   }
//   return bed;
// }

