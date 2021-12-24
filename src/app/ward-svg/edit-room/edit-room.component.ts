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

  markedRoom: Room | undefined;
  private objectEdit: EditRoom | { marked: string } = { marked: '' };
  bedRotate = new BedRotate();

  ngOnInit() {
    this.editRoomService.posibleBeds = this.markedRoom?.beds.map((bed: Bed) => bed.id);
    this.editRoomService.objEditRoom$.subscribe(this.passObjectEdit.bind(this));
  }
  private passObjectEdit(objEditRoom: EditRoom): void {
    this.objectEdit = objEditRoom;
  }
  get markedBed(): Bed {
    return this.objectEdit?.marked && this.markedRoom ? findById(this.markedRoom.beds, this.objectEdit?.marked) : null;
  }
  rotate(): void {
    const id = this.objectEdit.marked;
    if (!id) return;
    const bed = this.editRoomService.getOutputBed(id);
    const polygon = bed && 'polygon' in bed ? bed.polygon : this.markedBed?.polygon;
    this.bedRotate.rotate({ id, polygon });
    this.editRoomService.addOrUpdate({ id, polygon: this.bedRotate.points });
    this.markedBed.polygon = this.bedRotate.points;
    this.editRoomService.modify(this.objectEdit);
  }
}
