import { EditRoom } from './../../shared/models/edit-room';
import { Room } from '../../shared/models/room';
import { Bed } from '../../shared/models/bed';
import { EditRoomService } from './../../core/services/edit-room.service';
import { Component, OnInit } from '@angular/core';
import { BedRotate } from './bed-rotate';
import { cloneDeep, findById, logError } from '../../shared/useful/useful';
@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent implements OnInit {

  constructor(
    private editRoomService: EditRoomService
  ) { }

  room: Room | undefined;
  private objectEdit: EditRoom | {marked: string} = {marked: ''};
  polygonBed: string | undefined = '';
  bedRotate = new BedRotate();

  ngOnInit() {
    this.editRoomService.objEditRoom$.subscribe(this.passObjectEdit.bind(this));
  }
  private passObjectEdit(objEditRoom: EditRoom): void {
    this.objectEdit = objEditRoom;
    // this.getMarkedBed ? this.objectEdit.addOrUpdate({ id: this.getMarkedBed.id }) : logError(`this bed don't exist in room`);
    // if (!this.objectEdit.roomNotModified) this.objectEdit.roomNotModified = cloneDeep(this.room);

  }
  get getMarkedBed(): Bed  {
   return this.objectEdit?.marked && this.room ? findById(this.room.beds, this.objectEdit?.marked): null;
  }
  rotate(): void {
    if (!this.objectEdit.marked) return;
    this.polygonBed = this.editRoomService.getOutputBed(this.objectEdit.marked).polygon;
    const polygon = !this.polygonBed ? this.getMarkedBed?.polygon : this.polygonBed;
    this.bedRotate.rotate({
       id: this.getMarkedBed?.id,
      polygon
    });
    console.log("rotate", this.bedRotate.points);

    this.editRoomService.addOrUpdate(
      {
        id: this.getMarkedBed?.id ,
        polygon: this.bedRotate.points
      }
    )
    if (this.getMarkedBed) {
      this.getMarkedBed.polygon = this.bedRotate.points;
      this.editRoomService.modify(this.objectEdit);
    }


  }

}
