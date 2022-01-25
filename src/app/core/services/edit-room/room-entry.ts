import { Room } from 'src/app/shared/models/room';
import { Bed } from 'src/app/shared/models/bed';
import { Injectable, OnDestroy } from "@angular/core";
import { EditRoomService } from './edit-room.service';
@Injectable()
export class RoomEntry implements OnDestroy {
  ngOnDestroy(): void {

    this.room = '';
  }

  room: string = '';
  get roomNotModify(): any {
    return this.room ? JSON.parse(this.room) : null;
  }
  set roomNotModify(room: Room | string | undefined) {
    this.room = JSON.stringify(room);
  }
  addBed(bed: Bed): void {
    if (!this.roomNotModify) return;
    const room = this.copiedRoom();
    room.beds = [...this.roomNotModify.beds, bed];
    this.roomNotModify = room;
  }
  removeBeds(ids: any[]): void {
    // if (!this.roomNotModify) return;
    // const room = this.copiedRoom();
    // room.beds = room.beds.filter((bed: any) => !ids.includes(bed.id));
    // this.roomNotModify = room;
  }
  removeBed(id: number): void {
    if (!this.roomNotModify) return;
    const room = this.copiedRoom();
    room.beds = room.beds.filter((bed: any) => bed.id != id);
    this.roomNotModify = room;
  }
  start(markedRoom:any){
    this.roomNotModify = markedRoom;
  }
  addedBed(bed:any){
    this.addBed(bed);
  }
  deletedBed(id: number){
    this.removeBed(id);
  }
  private copiedRoom () {
    return Object.assign({}, this.roomNotModify);
  }
}
