import { Coordinates } from '../models/coordinate';
import { strategyRound } from './strategy-round';
import { partial } from '../../shared/useful/useful';
import multiplier from './shape-config';
const round: Function = strategyRound('round', 2);

export function shapeProperties(coordinates: Coordinates[]): { quadrangle: any } {
  return {
    quadrangle: coordinates.length === 4 ? quadrangle(coordinates) : console.error('shape is not quadrangle')
  };
}
function quadrangle(coordinates: Coordinates[]): { width: Function, height: Function, rect: boolean, center: Coordinates } {

  const width: Function = partial(segmantLength, coordinates[0], coordinates[1]);
  const height: Function = partial(segmantLength, coordinates[3], coordinates[0]);
  const rectangular: number = segmantLength(coordinates[3], coordinates[1]);
  const rectangularTwo: number = segmantLength(coordinates[0], coordinates[2]);
  const center: Coordinates = centerSegment(coordinates[0], coordinates[2])
  const centerTwo: Coordinates = centerSegment(coordinates[1], coordinates[3])
  const rect: boolean = rectangle(rectangular, rectangularTwo, centerTwo, center);

  return { width, height, rect, center };
}
function rectangle(rectangular: number, rectangularTwo: number, center: Coordinates, centerTwo: Coordinates) {
  return (rectangular === rectangularTwo && center.x === centerTwo.x && center.y === centerTwo.y);
}
function segmantLength(a: Coordinates, b: Coordinates): number {
  return round(Math.sqrt((Math.pow((b.x - a.x), 2)) + (round(Math.pow((b.y - a.y), 2)))));
}
export function centerSegment(a: Coordinates, b: Coordinates): Coordinates {
  return {
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2
  };
}

export function cos(angle: number): number {
  return round(Math.cos(angle * (Math.PI / 180)));
}

export function sin(angle: number): number {
  return round(Math.sin(angle * (Math.PI / 180)));
}

export function coordinateOfPolygon(polygon: string): Coordinates[] {
  return polygon.split(/ +/).map((corner: any) => {
    return {
      x: Number.parseInt(corner.split(',')[0]),
      y: Number.parseInt(corner.split(',')[1])
    }
  });
}
export function polygonOfcoordinates(coordinates: Coordinates[]): string {
  return coordinates.map((p: any) => p.x.toFixed() + "," + p.y.toFixed()).join(' ');
}

export function pivotCoordinatesOfRect(polygon: string): { twoSymetricalSquares: { one: Coordinates, two: Coordinates } } {
  const rectCoordinates: Coordinates[] = coordinateOfPolygon(polygon);
  const centerLong = centerSegment(rectCoordinates[0], rectCoordinates[1]);
  return {
    twoSymetricalSquares: {
      one: centerSegment(centerLong, rectCoordinates[2]),
      two: centerSegment(centerLong, rectCoordinates[3])
    }
  };
}
export function sumCoordinates(coordinates: Coordinates[], coordinate: Coordinates): Coordinates[] {
  return coordinates.map((c: Coordinates) => {
    return {
      x: coordinate.x + c.x,
      y: coordinate.y + c.y
    };
  });
}
export function move(coordinates: Coordinates[], coordinate: Coordinates ): Coordinates[] {
  return coordinates.map((c: Coordinates) => {
    return {
      x: coordinate.x + c.x,
      y: coordinate.y + c.y
    };
  });
}
export function subtrack(coordinates: Coordinates[], coordinate: Coordinates ): Coordinates[] {
  return coordinates.map((c: Coordinates) => {
    return {
      x: coordinate.x - c.x,
      y: coordinate.y - c.y
    };
  });
}
export function scale(
  coordinates: Coordinates[],
  multiplierX = multiplier.scale.x,
  multiplierY = multiplier.scale.y
  ): Coordinates[] {
  return coordinates.map((c: Coordinates) => {
    return {
      x: multiplierX * c.x,
      y: multiplierY * c.y
    };
  });
}
export function polygonInPolygon(polygonOut: string, polygonIn: string ): boolean {
  // console.log(polygonIn);
  // console.log(polygonOut);

  return false;
}




