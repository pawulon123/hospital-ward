import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseWindowComponent } from './base-window/base-window.component';
import { WardSvgModule } from '../ward-svg/ward-svg.module';
import { EditRoomComponent } from './edit-room/edit-room.component';

@NgModule({
  declarations: [
    BaseWindowComponent,
    EditRoomComponent
  ],
  imports: [
    CommonModule,
    WardSvgModule
  ],
  exports: [
    BaseWindowComponent,
    EditRoomComponent
  ],
  providers: [

  ]
})
export class CurrentStateModule { }
