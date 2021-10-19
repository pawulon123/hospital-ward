import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BedComponent } from './bed/bed.component';
import { RoomComponent } from './room/room.component';
import { WardComponent } from './ward/ward.component';
import { SharedModule } from '../shared/shared.module';




@NgModule({
  declarations: [
    BedComponent,
    RoomComponent,
    WardComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[WardComponent],
  providers:[

  ]
})
export class WardSvgModule { }
