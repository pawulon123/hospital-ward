import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BedComponent } from './bed/bed.component';
import { RoomComponent } from './room/room.component';
import { WardComponent } from './ward/ward.component';
import { SharedModule } from '../shared/shared.module';
import { EditRoomComponent } from './edit-room/edit-room.component';
import { MaterialModule } from '../material/material.module';
//
@NgModule({
  declarations: [
    BedComponent,
    RoomComponent,
    WardComponent,
    EditRoomComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ],
  exports:[
    WardComponent,
    // RoomComponent
  ],
  entryComponents:[EditRoomComponent],
  providers:[

  ]
})
export class WardSvgModule {}
