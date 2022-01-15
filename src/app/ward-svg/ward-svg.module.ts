import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BedComponent } from './bed/bed.component';
import { RoomComponent } from './room/room.component';
import { WardComponent } from './ward/ward.component';
import { SharedModule } from '../shared/shared.module';
import { EditRoomComponent } from './edit-room/edit-room.component';
import { MaterialModule } from '../material/material.module';
import { EditRoomService } from '../core/services/edit-room/edit-room.service';
import { RoomEntry } from '../core/services/edit-room/room-entry';
import { PosibleBed } from '../core/services/edit-room/posible-bed';
import { OutputBed } from '../core/services/edit-room/output-bed';
import { BedRotate } from '../core/services/edit-room/bed-rotate';
import { BedInRoom } from '../core/services/edit-room/bed-in-room';
@NgModule({
  declarations: [
    BedComponent,
    RoomComponent,
    WardComponent,
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
    EditRoomService,
    RoomEntry,
    PosibleBed,
    OutputBed,
    BedRotate,
    BedInRoom
  ]
})
export class WardSvgModule {}
