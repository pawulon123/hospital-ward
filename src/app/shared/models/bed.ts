export interface Bed {

  id?:  number;
  isNew?:boolean;
  // x_svg: string;
  // y_svg: string;
  // rotate: string;
  type?: string;
  polygon: string;
  patient?:any|null;
  room?:string;
}
