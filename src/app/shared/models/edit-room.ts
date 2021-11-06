import { Bed } from '../../shared/models/bed';
import { Room } from './room';
export interface EditRoom {

  marked?: string;
  outputBeds: Bed[];
  roomNotModified: Room | null;
  addOrUpdate:(element:Bed)=>void;
}
