import { Coordinates } from '../models/coordinate';
import { strategyRound } from './strategy-round';
import { partial } from '../../shared/useful/useful';
const round: Function = strategyRound('round',2);

export function shapeProperties(coordinates: Coordinates[]): { quadrangle:any } {
  return {
    quadrangle: coordinates.length === 4 ? quadrangle(coordinates) : console.error('shape is not quadrangle')
  }
}
  function quadrangle(coordinates: Coordinates[]): {width: Function, height: Function, rect: boolean, center: Coordinates} {
    const width = partial(segmantLength, coordinates[0], coordinates[1]);
    const height = partial(segmantLength,coordinates[3], coordinates[0]);
    const rectangular = segmantLength(coordinates[3], coordinates[1]);
    const rectangularTwo = segmantLength(coordinates[0], coordinates[2]);
    const center = centerSegment(coordinates[0], coordinates[2])
    const centerTwo = centerSegment(coordinates[1], coordinates[3])
    const rect = rectangle(rectangular, rectangularTwo, centerTwo, center);

    return { width, height,  rect, center }
  }
  function rectangle(rectangular: number, rectangularTwo:number, center: Coordinates, centerTwo: Coordinates) {
    return (rectangular === rectangularTwo && center.x === centerTwo.x && center.y === centerTwo.y);
  }
  function segmantLength(a: Coordinates, b: Coordinates): number {
    return round(Math.sqrt((Math.pow((b.x - a.x), 2)) + (round(Math.pow((b.y - a.y), 2)))));
  }
  function centerSegment(a: Coordinates, b: Coordinates): Coordinates {
    return {
      x: (a.x + b.x) / 2,
      y: (a.y + b.y) / 2
    }
  }

export function cos(angle: number): number {
  return round(Math.cos(angle * (Math.PI / 180)));
}

export function sin(angle: number): number {
  return round(Math.sin(angle * (Math.PI / 180)));
}
