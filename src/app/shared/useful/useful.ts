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
export function withoutId(arr: any[], id: number | string) {
  return arr.filter(obj => obj.id != id);
}
export function findIdsByObjects(objects:any[], keysValues:any[]): number[]{
return keysValues.reduce((arrIds: number[] , keyValue: { key: string, value: string }) => {
    let { key, value } = keyValue || {};
    objects.forEach((obj: any) => {
      if (key in obj && 'id' in obj && obj[key] === value ) arrIds.push(obj.id);
    });
    return arrIds;
  }, []);
}
export function fnIsInContext(context:any, fnName: string ){
  return  (fnName in context && (context as Record<string, any>)[fnName].constructor instanceof Function)
}
export function callsIfInContext(fnName: string, objects: any[], arg: any){
  objects.forEach(object => { if(fnIsInContext(object, fnName)) object[fnName](arg)});
}
export function callOnObj(method: string, objectNames: string[], arg:any, object: any){
  objectNames.forEach(objectName => { if(fnIsInContext(object[objectName], method)) object[objectName][method](arg) });
}


