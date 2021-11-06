import{ Coordinates } from '../models/coordinate'

export * from './coordinate-system';

export function polygonOfcoordinates(coordinates: Coordinates[]): string {
  return coordinates.map((p: any) => p.x.toFixed() + "," + p.y.toFixed()).join(' ');
}

export function coordinateOfPolygon(polygon: string): Coordinates[] {
  return polygon.split(' ').map((corner: any) => {
    return {
      x: Number.parseInt(corner.split(',')[0]),
      y: Number.parseInt(corner.split(',')[1])
    }
  });
}

export function logError(message: string): void {
  console.error(message);
}
export function findById(arr: Object[] | undefined, id: number | string):any {
  return arr?.find((obj: any) => 'id' in obj && obj.id == id);
}
export function cloneDeep(obj: Object | undefined): Object | undefined {
  return obj ? JSON.parse(JSON.stringify(obj)) : undefined;
}
export function partial(fn: Function, ...args: any): Function {
  return (...additionalArgs: any) => fn (...additionalArgs, ...args);

}

