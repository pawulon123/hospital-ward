import { Bed } from './bed';
import { Room } from './room';
export interface EditRoomStart {
  start(markedRoom: Room): void;
}
export interface EditRoomAddedBed {
  addedBed(bed: Bed): void;
}
export interface EditRoomDeletedBed {
  deletedBed(idBed: number): void;
}
