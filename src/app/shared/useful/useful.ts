export * from './coordinate-system';
export * from './shape';

export function logError(message: string): void {
  console.error(message);
}
export function findById(arr: Object[], id: number | string): any {
  return arr.find((obj: any) => 'id' in obj && obj.id == id);
}
export function cloneDeep(obj: Object | undefined): Object | undefined {
  return obj ? JSON.parse(JSON.stringify(obj)) : undefined;
}
export function partial(fn: Function, ...args: any): Function {
  return (...additionalArgs: any) => fn(...additionalArgs, ...args);
}

export function compose(...args: any[]) {
  return args.length ? args.reduceRight((f: any, g: any) => (x: any) => f(g(x))) : () => { };
}



