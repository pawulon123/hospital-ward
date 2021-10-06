import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgModule } from './svg/svg.module';
import { BaseWindowComponent } from './base-window/base-window.component';
import { RoomService } from './services/room.service';
import { BedService } from './services/bed.service';

@NgModule({
  declarations: [
    BaseWindowComponent
  ],
  imports: [
    CommonModule,
    SvgModule
  ],
  exports: [
    SvgModule,
    BaseWindowComponent],
  providers:[
    RoomService,
    BedService
  ]
})
export class CurrentStateModule { }
