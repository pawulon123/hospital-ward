import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PositionDirective } from './directives/position.directive';
import { RoomsEvDirective } from './directives/rooms-ev.directive';
import { ModeWardSvgService } from '../core/services/mode-ward-svg.service';
import { BedsEvDirective } from './directives/beds-ev.directive';



@NgModule({
  declarations: [
    PositionDirective,
    RoomsEvDirective,
    BedsEvDirective

  ],
  imports: [
    CommonModule
  ],
  exports:[
    PositionDirective,
    RoomsEvDirective,
    BedsEvDirective
  ],
  providers:[
    ModeWardSvgService
  ]
})
export class SharedModule { }
