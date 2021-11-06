import { Room } from '../../shared/models/room';
import { Bed } from '../../shared/models/bed';
import { EditRoom } from '../../shared/models/edit-room';
import { EditRoomService } from './../../core/services/edit-room.service';
import { Component, OnInit } from '@angular/core';
import { BedRotate } from './bed-rotate';
import { cloneDeep, findById } from '../../shared/useful/useful';
@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent implements OnInit {

  constructor(
    private editRoomService: EditRoomService
  ) { }

  room: Room|undefined;
  objectEdit:any = {};
  bedRotate = new BedRotate();

  ngOnInit(): void {
    this.editRoomService.objEditRoom$.subscribe(this.assignStartObj.bind(this));
  }
  private assignStartObj(objEditRoom: EditRoom): void {
    this.objectEdit = objEditRoom;
    if (!this.objectEdit.roomNotModified) this.objectEdit.roomNotModified = cloneDeep(this.room);
    this.objectEdit.addOrUpdate(this.getMarkedBed);
  }

  get getMarkedBed(): Bed|undefined {
    return findById(this.room?.beds, this.objectEdit?.marked);
  }

  rotate(): void {
    if (!this.objectEdit.marked) return;
    this.bedRotate.rotate(this.getMarkedBed);
    this.editRoomService.modify(this.objectEdit);
  }
}
