import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.css']
})
export class EditRoomComponent implements OnInit {

  constructor(
    /** romm array with beds */
    /** mode Service */
    /** room Service */
    /** bed Service */
  ) { }
room:any
  ngOnInit(): void {
   console.log(this.room);



  }
  sendObjectOutput(sendObjectOutput: any) {
console.log('sendObjectOutput');

}
pickUpIncoming() {
    console.log('pickUpIncoming');

  }
}
