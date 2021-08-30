import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BedComponent } from './bed/bed.component';
import { WardComponent } from './ward/ward.component';
import { RoomComponent } from './room/room.component';
import { WindowInfoComponent } from './window-info/widow-info.component';

@NgModule({
  declarations: [
    BedComponent,
    WardComponent,
    RoomComponent,
    WindowInfoComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    WardComponent
  ]

})
export class SvgModule { }
