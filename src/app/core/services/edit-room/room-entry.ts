import { Room } from 'src/app/shared/models/room';
import { Bed } from 'src/app/shared/models/bed';
import { Injectable, OnDestroy, OnInit } from "@angular/core";

@Injectable()
export class RoomEntry implements OnDestroy, OnInit {
  constructor(){
    console.log('constr');
    this.room = ''
    this.roomNotModify = undefined
  }
  ngOnInit(): void {
    console.log('entry',this.room);

  }
  ngOnDestroy(): void {
    this.room = ''
console.log('destroy entry');
  }
room:string ='';
  get roomNotModify(): any {
    return this.room ? JSON.parse(this.room) : null;
  }
  set roomNotModify(room: Room | undefined) {
    this.room = JSON.stringify(room);
  }
  addBed(bed: Bed): void {
    if (!this.roomNotModify) return;
    const room = Object.assign({}, this.roomNotModify);
    room.beds = [...this.roomNotModify.beds, bed];
    this.roomNotModify = room;
  }
  removeBeds(ids: any[]): void {
    if (!this.roomNotModify) return;
    const room = Object.assign({}, this.roomNotModify);
    room.beds = room.beds.filter((bed: any) => !ids.includes(bed.id));
    this.roomNotModify = room;
  }
  removeBed(id: string): void {
    if (!this.roomNotModify) return;
    const room = Object.assign({}, this.roomNotModify);
    room.beds = room.beds.filter((bed: any) => bed.id !=  id);
    this.roomNotModify = room;
  }

}
