import { EditRoomService } from './../../core/services/edit-room.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent implements OnInit {

  constructor(
    private editRoomService: EditRoomService
    /** romm array with beds */
    /** mode Service */
    /** room Service */
    /** bed Service */
  ) { }
  room: any;
  objectEdit:any;
  ngOnInit(): void {
    this.editRoomService.objEditRoom$.subscribe(
      objEdit => this.objectEdit = objEdit
    );
  }
  rotate(){

    const bed = this.room.beds.find((bed:any) => bed.id == this.objectEdit.marked);
    bed.rotate = 45;
    this.editRoomService.modify(this.objectEdit);

  }
  sendObjectOutput(sendObjectOutput: any) {
    console.log('sendObjectOutput');
  }
  pickUpIncoming() {
    console.log('pickUpIncoming');
  }
}
