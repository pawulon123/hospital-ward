import { EditRoom } from './../../shared/models/edit-room';
import { Room } from '../../shared/models/room';
import { Bed } from '../../shared/models/bed';
import { EditRoomService } from './../../core/services/edit-room.service';
import { Component, OnInit } from '@angular/core';
import { BedRotate } from './bed-rotate';
import { findById } from '../../shared/useful/useful';
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
  }
  get markedBed(): Bed  {
   return this.objectEdit?.marked && this.room ? findById(this.room.beds, this.objectEdit?.marked): null;
  }
  rotate(): void {
    if (!this.objectEdit.marked) return;
    this.polygonBed = this.editRoomService.getOutputBed(this.objectEdit.marked).polygon;
    const polygon = !this.polygonBed ? this.markedBed?.polygon : this.polygonBed;
    this.bedRotate.rotate({id: this.markedBed?.id, polygon});
    this.editRoomService.addOrUpdate(
      {
        id: this.markedBed?.id ,
        polygon: this.bedRotate.points
      }
    )

      this.markedBed.polygon = this.bedRotate.points;
      this.editRoomService.modify(this.objectEdit);

  }

}
